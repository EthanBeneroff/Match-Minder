import React, { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import MatchCard from './MatchCard'
import Form from 'react-bootstrap/Form'

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
          .then((data) => {
            const sortedMatches = data.sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate));
            setMatches(sortedMatches)
        })
          .then(console.log(matches))
          .catch((error) => {
            console.log(error);
          });
        }
      }, [team]);


    //   const handleSelect = (selectedValue) => {
    //     setTeam(selectedValue);
    //   };

      const handleSelect = (event) => {
        console.log(event.target.value)
        const selectedValue = event.target.value;
        setTeam(selectedValue);
      };

      const teamOptions = teams.map((item) =>{
        return (<option key={item.id} value={item.id}>{item.shortName} </option>
      )})

      const matchesArray = matches.map((match) => (
        <MatchCard key={match.id} match={match} favorite={false}/>
      ));

      


  return (
    <div>
    <Form.Select onChange={handleSelect} aria-label="Default select example">
    <option disabled selected>
          Select Team
        </option>
      {teamOptions}
    </Form.Select>
    {matchesArray}
    </div>
  )
}

export default MatchesByTeam