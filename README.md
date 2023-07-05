# Match-Minder

DESCRIPTION: Match-Minder is an online tool for tracking upcoming soccer games/league tables/scores across a variety of leagues and competitions (both domestic leagues such as the English Premier League and also International competitions like the World Cup). Users can view this data without an account or signup to track the teams or competitions they care about.

### User Stories

1. User will be able to view upcoming soccer games in chronological order in a given league or involving a certain team chosen by the user
2. User will be able to view the standings of a chosen league
3. User will be able to create an account
4. If a user has created an account, they can save matches. Saved matches will be displayed in chronological order so the user can easily see the time and date of the next match they want to watch
5. If a user has created an account, they can also select a favorite team. Upon doing so, their home page will now display the upcoming matches of their favorite team
6. Users can click on teams or competitions anywhere on the website to display the upcoming matches in that league or of that team


### Models

| USERS        |                   |
|--------------|-------------------|
| ID           | int (primary_key) |
| email        | string (unique)   |
| password     | string            |
| favoriteTeam | int (foreignKey)  |
| created_at   | dateTime          |
| updated_at   | dateTime          |


| Match       |                   |
|-------------|-------------------|
| ID          | int (primary_key) |
| matchDay    | int               |
| HomeTeamID  | int (foreignKey)  |
| AwayTeamID  | int (foreignKey)  |
| AreaID      | int               |
| AreaName    | string            |
| utcDate     | string            |
| competition | string            |
| winner      | string            |


| Team         |                   |
|--------------|-------------------|
| ID           | int (primary_key) |
| Name         | string            |
| shortName    | string            |
| crestImg     | string            |
| venue        | string            |
| clubColors   | string            |
| competitions | int (foreignKey)  |


| SavedMatch |                   |
|------------|-------------------|
| ID         | int (primary_key) |
| USerID     | int(foreignKey)   |
| MatchID    | int(foreignKey)   |

| Competition |                   |
|-------------|-------------------|
| ID          | int (primary_key) |
| Name        | string            |



### API-ROUTES

| API Route                   | Request Method    |
|-----------------------------|-------------------|
| /api/users                  | GET, POST, PATCH  |
| /api/teams/<int:id>         | GET               |
| /api/teams/<int:id>/matches | GET               |
| /api/competitions           | GET               |
| /api/competitions/teams     | GET               |
| /api/savedmatch/<int:id>    | GET, POST, DELETE |
| /api/match/<int:id>         | GET               |

### CLIENT-ROUTES

| Client Route | Component                |
|--------------|--------------------------|
| /            | Home.jsx                 |
| /signup      | Signup.jsx               |
| /login       | Login.jsx                |
| /team        | MatchesByTeam.jsx        |
| /competition | MatchesByCompetition.jsx |
| /mymatches   | MyMatches.jsx            |

### WireFrames

![Alt WireFrame Home](READMEImages/MatchMinderHome.png)
![Alt WireFrame My Matches](READMEImages/MatchMinderMyMatches.png)
![Alt WireFrame Matches By Team](READMEImages/MatchMinderTeamPage.png)