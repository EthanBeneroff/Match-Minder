import React from 'react'
import { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import MatchCard from './MatchCard'

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
          .then(console.log(matches))
          .catch((error) => {
            console.log(error);
          });
        }
      }, [competition]);

      const handleSelect = (selectedValue) => {
        setCompetition(selectedValue);
      };

      const leagueOptions = competitions.map((item) =>{
        return (<DropdownItem key={item.id} eventKey={item.id}>{item.name} </DropdownItem>
      )})

      const matchesArray = matches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ));


  return (
    <div>
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Competition
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {leagueOptions}
      </Dropdown.Menu>
    </Dropdown>
    {matchesArray}
    </div>
  )
}

export default MatchesByCompetition