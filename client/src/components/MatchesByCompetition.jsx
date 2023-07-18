import React from 'react'
import { useEffect, useState } from 'react'
import MatchCard from './MatchCard'
import Form from 'react-bootstrap/Form'


function MatchesByCompetition() {
    const [competitions, setCompetitions] = useState([])
    const [competition, setCompetition] = useState('')
    const [matches, setMatches] = useState([])



    //get leagues
    useEffect(() => {
        fetch(`/api/leagues`)
          .then((response) => response.json())
          .then((data) => setCompetitions(data))
          .catch((error) => {
            console.log(error);
          });
      }, []);

      


    //get matches for a given league
    useEffect(() => {
        if (competition){
            console.log(competition)
        fetch(`/api/league/${competition}/matches`)
          .then((response) => response.json())
          .then((data) => setMatches(data))
        //   .then(console.log(matches))
          .catch((error) => {
            console.log(error);
          });
        }
      }, [competition]);


      const handleSelect = (event) => {
        console.log(event.target.value)
        const selectedValue = event.target.value;
        setCompetition(selectedValue);
      };


      const leagueOptions = competitions.map((item) =>{
        return (<option key={item.id} value={item.id}>{item.name} </option>
      )})


      const matchesArray = matches.map((match) => (
        <MatchCard key={match.id} match={match} favorite={false}/>
      ));


  return (
    <div className="matches-container">
        
    <Form.Select onChange={handleSelect} aria-label="Default select example">
    <option disabled selected>
          Select Competition
        </option>
      {leagueOptions}
    </Form.Select>
    {matchesArray}
    </div>
  )
}

export default MatchesByCompetition