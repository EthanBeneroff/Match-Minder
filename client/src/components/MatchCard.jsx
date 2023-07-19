import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import {useState, useContext} from 'react'
import AuthContext from './AuthContext';



function MatchCard({match, favorite, onMatchRemove}) {
    const { isAuthenticated, login, logout } = useContext(AuthContext)
    const [fave, setFave] = useState(favorite)



    function handleClick(matchId){
        if(fave){removeMatch(matchId)}
        else{saveMatch(matchId)}
    }


    function saveMatch(matchId){
        fetch('/api/mymatches', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
                body: JSON.stringify({id: matchId}),
            })
            .then((response) => {
                if (response.ok) {
                  setFave((prev) => !prev)
                  console.log("Saved Match")
                }
                return response.json();
            })
            .then((data => console.log(data)))
            .catch((error) => {console.error("Error saving match", error)
        })
    }

    function removeMatch(matchId){
        fetch('/api/mymatches', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
              },
                body: JSON.stringify({id: matchId}),
            })
            .then((response) => {
                if (response.ok) {
                  setFave((prev) => !prev)
                  console.log("Removed Match")
                  if (onMatchRemove) {
                    onMatchRemove(matchId);
                  }
                }
                return response.json();
            })
            .then((data => console.log(data)))
            .catch((error) => {console.error("Error saving match", error)
        })
        
    }

    const isMatchElapsed = new Date(match.utcDate) < new Date();

    const formattedDate = new Date(match.utcDate).toLocaleDateString();
    const formattedTime = new Date(match.utcDate).toLocaleTimeString(undefined, {
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
      });

    let homeMatchResult = ""
    let awayMatchResult =""
  if (isMatchElapsed && match.winner) {
    if (match.winner === "HOME_TEAM") {
      homeMatchResult = "(W) "
      awayMatchResult ="(L)"
    } else if (match.winner === "AWAY_TEAM") {
      homeMatchResult = "(L)"
      awayMatchResult = "(W)"
    } else if (match.winner === "DRAW") {
      homeMatchResult = "(D)"
      awayMatchResult = "(D)"
    }
  }

  return (
    <Card >
        

      {match.awayTeam?.crestImg && (
        <Card.Img src={match.awayTeam.crestImg} className="crestImg" />
      )}

        {match.competitions && match.competitions.emblem && (
        <Card.Img src={match.competitions.emblem} className="competitionImg" />
      )}

      {match.homeTeam?.crestImg && (
        <Card.Img src={match.homeTeam.crestImg} className="crestImg" />
      )}
        <Card.Body>
        <Card.Title>MatchDay: {match.matchDay}</Card.Title>
        {match.homeTeamName && match.awayTeamName ? (
          <Card.Text>
            {match.awayTeamName} {awayMatchResult} at {match.homeTeamName} {homeMatchResult}
          </Card.Text>
        ) : match.homeTeamName ? (
          <Card.Text>
            {match.homeTeamName} at TBD
          </Card.Text>
        ) : match.awayTeamName ? (
          <Card.Text>
            TBD at {match.awayTeamName}
          </Card.Text>
        ) : (
          <Card.Text>TBD at TBD</Card.Text>
        )}

        <Card.Text>{formattedTime}</Card.Text>
        <Card.Text>{formattedDate}</Card.Text>
        {isAuthenticated && (
          <Button onClick={() => handleClick(match.id)}>
            {fave ? "Remove" : "Save"}
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}

MatchCard.defaultProps = {
            onMatchRemove: null
          };

export default MatchCard