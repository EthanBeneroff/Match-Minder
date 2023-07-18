import React, {useState, useEffect, useContext} from 'react'
import MatchCard from './MatchCard'

function Home() {

    const [matches, setMatches] = useState([])


    useEffect(() => {
        fetch(`/api/mymatches`)
          .then((response) => response.json())
          .then((data) => {const sortedMatches = data.sort(
            (a, b) => new Date(a.utcDate) - new Date(b.utcDate))
            setMatches(sortedMatches)})
          .catch((error) => {
            console.log(error);
          });
      }, []);

      useEffect(() => {
        fetch(`/api/myTeamsMatches`)
          .then((response) => response.json())
          .then((data) => {
            setMatches((prevMatches) => {
                // Filter out duplicates before adding new matches
                const newMatches = data.filter(
                  (match) => !prevMatches.some((prevMatch) => prevMatch.id === match.id)
                );
                // Combine existing matches and new matches, and sort by date
                const updatedMatches = [...prevMatches, ...newMatches].sort(
                  (a, b) => new Date(a.utcDate) - new Date(b.utcDate)
                );
                return updatedMatches;
              });
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

      const handleMatchRemove = (matchId) => {
        setMatches(prevMatches => prevMatches.filter(match => match.id !== matchId));
      };

      let matchesArray=null
      if (matches.length>0){matchesArray = matches.map((match) => (
        <MatchCard key={match.id} match={match} favorite={true} onMatchRemove={handleMatchRemove}/>
      ));}


  return (
    <div>{matchesArray}</div>
  )
}

export default Home