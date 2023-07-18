import React, {useState, useEffect, useContext} from 'react'
import Modal from 'react-bootstrap/Modal'
import {useNavigate} from 'react-router-dom';
import AuthContext from './AuthContext';
import Form from 'react-bootstrap/Form'

function Profile() {
const [teams, setTeams] = useState([])
const [showDeleteModal, setShowDeleteModal] = useState(false);
const navigate = useNavigate()
const { isAuthenticated, login, logout } = useContext(AuthContext)

const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

useEffect(() => {
    fetch(`/api/teams`)
      .then((response) => response.json())
      .then((data) => setTeams(data))
      .then(console.log(teams))
      .catch((error) => {
        console.log(error);
      });
    
  }, []);

  let teamOptions=null
  if(teams.length > 0){teamOptions = teams.map((item) =>{
    return (<option key={item.id} value={item.id}>{item.shortName} </option>
  )})}
  

  const handleSelect = (event) => {
    console.log(event.target.value)
    const selectedValue = event.target.value
    fetch('/api/myTeam',{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"favTeam": selectedValue})
    })
    .then((resp) => resp.json())
  };


  function handleDelete(){
    logout()
    fetch('/api/deleteaccount',{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((resp) => resp.json())
    .then(() => {
        navigate('/')
    })
  };


return (
    <div>
    <Form.Select onChange={handleSelect} aria-label="Default select example">
    <option disabled selected>
          Select Favorite Team
        </option>
        
        {teamOptions}
        </Form.Select>

    <button onClick = {handleDeleteClick}>DELETE MY PROFILE (why?)</button>
    <Modal
          show = {showDeleteModal}
          className="modal show"
          style={{ display: 'block', position: 'initial' }}
          onHide={handleCloseDeleteModal}
        >
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Delete Profile</Modal.Title>
            </Modal.Header>
    
            <Modal.Body>
            <p>Are you sure you want to delete your profile?</p>
            <button type="button" onClick={handleDelete}>
              Yes, Delete
            </button>
            <button type="button" onClick={handleCloseDeleteModal}> Cancel </button>
            </Modal.Body>
    
            <Modal.Footer>
              
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
    </div>
  )
}


  

export default Profile