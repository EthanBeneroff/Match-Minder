from flask_migrate import Migrate
from flask import Flask, request, session, make_response, jsonify, redirect, Response
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from config import app, db, api, Resource
from models import User, Team, Match, Competition, SavedMatch, CompetitionByTeam
import ipdb
import requests
from keys import xAuthHeader
import json

migrate = Migrate(app, db)
login_manager = LoginManager()
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)



class Teams(Resource):
    def get(self):
        try:
            teams = Team.query.all()
            teams_list = [team.to_dict() for team in teams]
            # ipdb.set_trace()
            response = Response(json.dumps(teams_list, ensure_ascii = False), content_type='application/json')
            return response
        except:
            return {'error:' 'team not found'}, 404

api.add_resource(Teams, '/teams')

class OneTeam(Resource):
    def get(self, teamId):
        try:
            team = Team.query.filter_by(id=teamId).first().to_dict()
            response = Response(json.dumps(team, ensure_ascii = False), content_type='application/json')
            return response
        except:
            return 


api.add_resource(OneTeam, '/teams/<int:teamId>')

class TeamsByLeague(Resource):
    def get(self, leagueID):
        league = Competition.query.filter_by(id=leagueID).first()
        leagueName= league.name
        print(leagueName)
        teams_list = CompetitionByTeam.query.filter_by(competitionId=leagueID).all()
        print(teams_list)
        teams_dict = []
        for team in teams_list:
            team_query = Team.query.filter_by(id=team.teamId).first()
            print(team_query)
            if team_query:
                teams_dict.append(team_query.to_dict())
        #teams_dict = [team.to_dict() for team in teams_list]
        response = jsonify(teams_dict)
        return response

api.add_resource(TeamsByLeague, '/<int:leagueID>/teams')

class MatchesByTeam(Resource):
    def get(self, teamID):
        #team = Team.query.filter_by(id=teamID).first()
        matches_list = Match.query.filter((Match.homeTeamID == teamID) | (Match.awayTeamID==teamID)).all()
        matches_dict = [match.to_dict() for match in matches_list]
        return jsonify(matches_dict)
    
api.add_resource(MatchesByTeam, '/team/<int:teamID>/matches')

class OneMatch(Resource):
    def get(self, matchId):
        match = Match.query.filter_by(id=matchId).first().to_dict()
        return jsonify(match)


api.add_resource(OneMatch, '/matches/<int:matchId>')

class AllLeagues(Resource):
    def get(self):
        leagues_list = Competition.query.all()
        leagues_dict = [league.to_dict() for league in leagues_list]
        return jsonify(leagues_dict)

api.add_resource(AllLeagues, '/leagues')

class MatchesByLeague(Resource):
    def get(self, leagueID):
        matches_list = Match.query.filter(Match.competition==leagueID).all()
        matches_dict = [match.to_dict() for match in matches_list]
        return jsonify(matches_dict)
    
api.add_resource(MatchesByLeague, '/league/<int:leagueID>/matches')

class Login(Resource):

    def post(self):
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        #ipdb.set_trace()
        user = User.query.filter(User.email == email).first()

        if user:
            if user.authenticate(password):
                login_user(user, remember=True)
                return {'message': 'Login successful'}, 200
        return {'error': '401 Unauthorized'}, 401


api.add_resource(Login, '/login')


@app.route("/logout", methods=["POST"])
@login_required
def logout():
    logout_user()
    return f'You have logged out. Goodbye'

@app.route('/myTeam', methods=["PATCH"])
@login_required
def changeTeam():
    data = request.get_json()
    user = current_user
    for attr in data:
        setattr(user, attr, data.get(attr))
    db.session.add(user)
    db.session.commit()
    return {user.to_dict(), 200}



@app.route("/deleteaccount", methods=["DELETE"])
@login_required
def deleteAccount():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    user = User.query.filter(User.email == email).first()
    if user:
        if user.authenticate(password):
            db.session.delete(user)
            db.session.commit()
            return {'message': 'deleted user'}, 200


class Signup(Resource):
    def post(self):
        try:
            data = request.get_json()
            new_user = User(
                email=data['email']
            )
            new_user.password_hash = data['password']
            db.session.add(new_user)
            db.session.commit()

            login_user(new_user, remember=True)

            return new_user.to_dict(), 201
        except:
            return {'Error': 'Could not Create new User'}


api.add_resource(Signup, '/signup')


class SavedMatches(Resource):
    @login_required
    def get(self):
        user = current_user
        
        matches_list = SavedMatch.query.filter_by(userId=user.id).all()
        if matches_list:
            real_matches_list = Match.query.join(SavedMatch, Match.id == SavedMatch.matchId).filter(SavedMatch.userId == user.id).all()
            matches_dict = [match.to_dict() for match in real_matches_list]
            #ipdb.set_trace()
            return jsonify(matches_dict)
        return {'message': 'no saved matches'}
    def post(self): 
        user = current_user
        data = request.get_json()
        new_match_id = data['id']
        new_saved_match = SavedMatch(userId=user.id, matchId=new_match_id)
        db.session.add(new_saved_match)
        db.session.commit()
        return new_saved_match.to_dict(), 200
    def delete(self):
        user = current_user
        data = request.get_json()
        delete_match_id = data['id']
        match_to_delete = SavedMatch.query.filter((SavedMatch.userId==user.id) & (SavedMatch.matchId==delete_match_id)).first()
        if match_to_delete:
            db.session.delete(match_to_delete)
            db.session.commit()
            return {'message': 'match deleted successfully'}
        return {'error': 'could not delete match'}
        
api.add_resource(SavedMatches, '/mymatches')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
