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
    # db.session.query(Team).delete()
    # db.session.query(Match).delete()
    # db.session.query(Competition).delete()
    # db.session.query(SavedMatch).delete()
    db.session.query(CompetitionByTeam).delete()
    db.session.commit()


def getLeagues():
    url = 'https://api.football-data.org/v4/competitions/'
    response = requests.get(url, headers=xAuthHeader)
    response_json = response.json()
    leagues = [league['code'] for league in response_json['competitions']]

    for league in leagues:
        time.sleep(3)
        print(league)
        populateMatchesByLeague(league)
        time.sleep(3)
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

def getOnlyCompetitions():
    url = 'https://api.football-data.org/v4/competitions/'
    response = requests.get(url, headers=xAuthHeader)
    response_json = response.json()
    # [print(league['code']) for league in response_json['competitions']]
    for competition in response_json['competitions']:
        if not Competition.query.filter_by(id=competition['id']).first():
            new_competition = Competition(id=competition['id'],
                                          name=competition['name'],
                                          code=competition['code'],
                                          emblem=competition['emblem']
                                          )
            db.session.add(new_competition)
            db.session.commit()

def populateCompetitionByTeam():        #error with CLI league team name grabbing
    url = 'https://api.football-data.org/v4/competitions/'
    response = requests.get(url, headers=xAuthHeader)
    response_json = response.json()
    for competition in response_json['competitions']:
        time.sleep(5)
        print(competition['code'])
        url = 'https://api.football-data.org/v4/competitions/{}/teams' .format(competition['code'])
        response = requests.get(url, headers=xAuthHeader)
        response_json = response.json()
        # if competition['code']=='CLI':
        #     teams = response_json['response']['teams']
        # else:
        teams = response_json['teams']
        for team in teams:
            print(team['shortName'])
            teamQuery = Team.query.filter_by(id=team['id']).first()
            competitionQuery=Competition.query.filter_by(code=competition['code']).first()
            if teamQuery and competitionQuery:
                teamQuery.competitions.append(competitionQuery)
                db.session.add(teamQuery)
                db.session.commit()

    
def populateMatchesByLeague(leagueCode):
    url = 'https://api.football-data.org/v4/competitions/{}/matches' .format(leagueCode)
    response = requests.get(url, headers=xAuthHeader)
    response_json=response.json()
    for match in response_json['matches']:
        matchQuery = Match.query.filter_by(id=match['id']).first()
        if not matchQuery:
            new_match = Match(id=match['id'],
                              matchDay=match['matchday'],
                              homeTeamID=match['homeTeam']['id'],
                              awayTeamID=match['awayTeam']['id'],
                              areaId = match['area']['id'],
                              areaName=match['area']['name'],
                              utcDate=match['utcDate'],
                              competition=match['competition']['id'],
                              winner=match['score']['winner']
                              )
            db.session.add(new_match)
            db.session.commit()


if __name__ == "__main__":
    with app.app_context():
        clear_tables()
        #getLeagues()
        #time.sleep(3)
        #print('Getting Competitions Now')
        #getOnlyCompetitions()
        #time.sleep(3)
        [print('Populating CompetitionByTeam Now')]
        populateCompetitionByTeam()
        pass