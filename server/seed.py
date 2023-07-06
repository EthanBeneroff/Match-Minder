from app import app
from models import db, User, Team, Match, Competition, SavedMatch, CompetitionByTeam
import os
import ipdb
import json
import time
from keys import xAuthHeader
import requests


def clear_tables():
    # db.session.query(User).delete()
    db.session.query(Team).delete()
    # db.session.query(Match).delete()
    # db.session.query(Competition).delete()
    # db.session.query(SavedMatch).delete()
    # db.session.query(CompetitionByTeam).delete()
    db.session.commit()


def getLeagues():
    url = 'https://api.football-data.org/v4/competitions/'
    response = requests.get(url, headers=xAuthHeader)
    response_json = response.json()
    leagues = [league['code'] for league in response_json['competitions']]

    for league in leagues:
        time.sleep(5)
        getTeamsFromLeague(league)


def getTeamsFromLeague(league):
    url = 'https://api.football-data.org/v4/competitions/{}/teams'.format(league)
    # ipdb.set_trace()
    response = requests.get(url, headers=xAuthHeader)
    response_json = response.json()
    teams = response_json['teams']
    for team in teams:
        if not Team.query.filter_by(id=team['id']).first() and not Team.query.filter_by(name=team['name']).first():
            new_team = Team(id = team['id'],
                            name = team['name'], 
                            shortName = team['shortName'], 
                            crestImg = team['crest'],
                            venue = team['venue'],
                            clubColors = team['clubColors'])
            db.session.add(new_team)
            db.session.commit()


if __name__ == "__main__":
    with app.app_context():
        clear_tables()
        # getPL()
        # time.sleep(5)
        # getCL()
        getLeagues()
        
        pass