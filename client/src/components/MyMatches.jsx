import React, {useState, useEffect} from 'react'
import MatchCard from './MatchCard';

function MyMatches() {
    const [matches, setMatches] = useState([])

    useEffect(() => {
        fetch(`/api/mymatches`)
          .then((response) => response.json())
          .then((data) => setMatches(data))
          .catch((error) => {
            console.log(error);
          });
      }, []);

      let matchesArray=null
      if (matches.length>0){matchesArray = matches.map((match) => (
        <MatchCard key={match.id} match={match} favorite={true}/>
      ));}
    


  return (
    <div>
        {matchesArray}
    </div>
  )
}

export default MyMatches