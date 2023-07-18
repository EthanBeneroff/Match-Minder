import React, {useState, useEffect} from 'react'
import MatchCard from './MatchCard';

function MyMatches() {
    const [matches, setMatches] = useState([])

    useEffect(() => {
        fetch(`/api/mymatches`)
          .then((response) => response.json())
          .then((data) => {const sortedMatches = data.sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate));
            setMatches(sortedMatches)})
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
    


      if (matchesArray==null) {
        return <p>You have no saved matches.</p>
      }
    
      return <div>{matchesArray}</div>;
    }
    

export default MyMatches