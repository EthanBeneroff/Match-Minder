import React, { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import MatchCard from './MatchCard'

function MatchesByTeam() {
    const [teams, setTeams] = useState([])
    const [team, setTeam] = useState([])
    const [matches, setMatches] = useState([])

    //get teams
    useEffect(() => {
        fetch(`/api/teams`)
          .then((response) => response.json())
          .then((data) => setTeams(data))
          .then(console.log(teams))
          .catch((error) => {
            console.log(error);
          });
        
      }, []);

      //get matches for a given team
      useEffect(() => {
        if (team){
            console.log(team)
        fetch(`/api/team/${team}/matches`)
          .then((response) => response.json())
          .then((data) => setMatches(data))
          .then(console.log(matches))
          .catch((error) => {
            console.log(error);
          });
        }
      }, [team]);


      const handleSelect = (selectedValue) => {
        setTeam(selectedValue);
      };

      const teamOptions = teams.map((item) =>{
        return (<DropdownItem key={item.id} eventKey={item.id}>{item.shortName} </DropdownItem>
      )})

      const matchesArray = matches.map((match) => (
        <MatchCard key={match.id} match={match} favorite={false}/>
      ));


  return (
    <div>
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Team
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {teamOptions}
      </Dropdown.Menu>
    </Dropdown>
    {matchesArray}
    </div>
  )
}

export default MatchesByTeam