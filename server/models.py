from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from collections import OrderedDict
from flask_login import UserMixin, LoginManager

from config import db, bcrypt


class User(db.Model, SerializerMixin, UserMixin):
    __tablename__ = 'users'

    #columns
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    favTeam = db.Column(db.Integer, db.ForeignKey('teams.id'))

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())


    #relationships
    savedMatches = db.relationship('SavedMatch', back_populates = 'user')

    #serialize rules
    serialize_rules = ('-savedMatches.user',)


    #password and authentication
    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed.')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))    
    


class Match(db.Model, SerializerMixin):
    __tablename__ = 'matches'

    id = db.Column(db.Integer, primary_key=True)
    matchDay = db.Column(db.Integer)
    homeTeamID = db.Column(db.Integer, db.ForeignKey('teams.id'))
    awayTeamID = db.Column(db.Integer, db.ForeignKey('teams.id'))
    areaId = db.Column(db.Integer)
    areaName = db.Column(db.String)
    utcDate = db.Column(db.DateTime)
    competition = db.Column(db.Integer, db.ForeignKey('competitions.id'))
    winner = db.Column(db.Integer, db.ForeignKey('teams.id'))


    #relationships
    #teams = db.relationship('Team', foreign_keys='[Match.homeTeamID, Match.awayTeamID]', back_populates = 'matches')
    competitions = db.relationship('Competition', back_populates = 'matches')
    savedMatches =db.relationship('SavedMatch', back_populates = 'match')
    homeTeam = db.relationship('Team', foreign_keys=[homeTeamID], back_populates='homeMatches')
    awayTeam = db.relationship('Team', foreign_keys=[awayTeamID], back_populates='awayMatches')
    

    #serialize rules
    serialize_rules = ('-teams.matches', '-competitions.matches', '-savedMatches.match')



class Competition(db.Model, SerializerMixin):
    __tablename__ = 'competitions'

    id = db.Column(db.Integer, primary_key =True)
    name = db.Column(db.String, nullable = False, unique = True)
    code = db.Column(db.String)
    emblem = db.Column(db.String)
    
    #relationships
    teams = db.relationship('Team', secondary='competitionTeams', back_populates='competitions')
    matches = db.relationship('Match', back_populates = 'competitions')

    #serialize rules
    serialize_rules = ('-teams.competitions', '-matches.competitions')

class Team(db.Model, SerializerMixin):
    __tablename__ = 'teams'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True)
    shortName=db.Column(db.String)
    crestImg=db.Column(db.String)
    venue = db.Column(db.String)
    clubColors = db.Column(db.String)
    #competitions = db.Column(db.Integer, db.ForeignKey('competitions.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())


    #relationships
    homeMatches = db.relationship('Match', foreign_keys=[Match.homeTeamID], back_populates='homeTeam')
    awayMatches = db.relationship('Match', foreign_keys=[Match.awayTeamID], back_populates='awayTeam')
    competitions = db.relationship('Competition', secondary='competitionTeams', back_populates='teams')

    #serialize rules
    serialize_rules = ('-matches.teams', '-competitions.teams')

class SavedMatch(db.Model, SerializerMixin):
    __tablename__ = 'savedMatches'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    matchId = db.Column(db.Integer, db.ForeignKey('matches.id'))

    #relationships
    user = db.relationship('User', back_populates = 'savedMatches')
    match = db.relationship('Match', back_populates = 'savedMatches')

    #serialize rules
    serialize_rules = ('-user.savedMatches', '-match.savedMatches')

class CompetitionByTeam(db.Model, SerializerMixin):
    __tablename__ = 'competitionTeams'

    id = db.Column(db.Integer, primary_key=True)
    teamId = db.Column(db.Integer, db.ForeignKey('teams.id'))
    competitionId = db.Column(db.Integer, db.ForeignKey('competitions.id'))