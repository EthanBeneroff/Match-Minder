import React, {useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form'
import { Container, Row, Col } from 'react-bootstrap';

function Standings() {
    // console.log('Standings data type:', typeof standings)
    // console.log('Standings data:', standings);
    const [competitions, setCompetitions] = useState([])
    const [competition, setCompetition] = useState('')
    const [standings, setStandings] = useState([]);
    const [year, setYear] = useState([])

    useEffect(() => {
        fetch(`/api/leagues`)
          .then((response) => response.json())
          .then((data) => setCompetitions(data))
          .catch((error) => {
            console.log(error);
          });
      }, []);

      useEffect(() => {
        if(competition && year){
            console.log(competition, year)
            fetch(`/api/${competition}/standings/${year}`)
            .then((response) => response.json())
            .then((data) => setStandings(data.standings))
            .catch((error) => console.log(error));}
      }, [competition, year]);

      console.log(standings)


      const handleCompetitionChange = (event) => {
        const selectedValue = event.target.value;
        setCompetition(selectedValue);
      };

      const handleYearChange = (event) => {
        const selectedValue = event.target.value;
        setYear(selectedValue);
      };

      const leagueOptions = competitions.map((item) =>{
        return (<option key={item.id} value={item.id}>{item.name} </option>
      )})


      const currentYear = new Date().getFullYear();
      const lastTenYears = Array.from({ length: 4 }, (_, index) => currentYear - index);

      const yearOptions = lastTenYears.map((year) => (
        <option key={year} value={year}>
        {year}
        </option>
    ));

    return (
        <>
      <Form.Select
        onChange={handleCompetitionChange}
        value={competition}
        aria-label="Default select example"
      >
        <option disabled value="">
          Select Competition
        </option>
        {leagueOptions}
      </Form.Select>
      <Form.Select
        onChange={handleYearChange}
        value={year}
        aria-label="Default select example"
      >
        <option disabled value="">
          Select Year
        </option>
        {yearOptions}
      </Form.Select>
      {standings && standings[0]?.table && standings[0].table.length > 0 ? (
        <Container className="standings-container d-flex justify-content-center">
        <Row>
          <Col>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Team Name</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {standings[0].table.map((team, index) => (
              <tr key={team.team.id}>
                <td>{index + 1}</td>
                <td>{team.team.name}</td>
                <td>{team.points}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        </Col>
      </Row>
    </Container>
      ) : (
        <div>No standings data available.</div>
      )}
    </>
      );
}

export default Standings