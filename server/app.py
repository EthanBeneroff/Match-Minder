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
    
api.add_resource(MatchesByTeam, '/<int:teamID>/matches')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
