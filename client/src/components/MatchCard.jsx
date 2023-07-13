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

    

  return (
    <Card>
        <Card.Img src = {match.awayTeam.crestImg}/>
        <Card.Img src = {match.homeTeam.crestImg}/>
        <Card.Body>
        <Card.Title>MatchDay: {match.matchDay}</Card.Title>
        <Card.Text> {match.awayTeamName} at {match.homeTeamName}</Card.Text>
        <Card.Text>{match.utcDate}</Card.Text>
        {isAuthenticated &&(
         <Button onClick = {() => handleClick(match.id)}>{fave ? 'Remove' : 'Save'}</Button>
          )}
        
        </Card.Body>
    </Card>
  )
}

MatchCard.defaultProps = {
            onMatchRemove: null
          };

export default MatchCard