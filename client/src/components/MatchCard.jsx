import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import {useState} from 'react'


function MatchCard({match}) {
    const [fave, setFave] = useState(false)


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
                }
                return response.json();
            })
            .then((data => console.log(data)))
            .catch((error) => {console.error("Error saving match", error)
        })
    }

  return (
    <Card>
        <Card.Img src = ""/>
        <Card.Body>
        <Card.Title>MatchDay: {match.matchDay}</Card.Title>
        <Card.Text> {match.awayTeamID} at {match.homeTeamID}</Card.Text>
        <Card.Text>{match.utcDate}</Card.Text>
        <Button onClick = {() => handleClick(match.id)}>{fave ? 'Remove' : 'Save'}</Button>
        </Card.Body>
    </Card>
  )
}

export default MatchCard