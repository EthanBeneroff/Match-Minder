import React from 'react'
import { useContext } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthContext from './AuthContext';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


function Signup({show, onClose}) {
    const { isAuthenticated, login, logout } = useContext(AuthContext)
    // console.log(show)
    // console.log(onClose)
    // console.log(login)


    const initialValues = {
        email: "",
        password: "",
        confirmPassword: ""
      };
    
      const validationSchema = Yup.object({
        email: Yup.string().required("Email is required"),
        password: Yup.string().required("Password is required"),
        confirmPassword: Yup.string().required("Please confirm your password")
      });

      const handleSubmit = (values) => {
        if (values.password !== values.confirmPassword){
            return
        }
        console.log("logging in")
        // const userData = {
        //   ...values,
        // };
        const {confirmPassword, ...userData} = values
        console.log(values)
        console.log(userData)

        fetch('/api/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          })
            .then((response) => {
              if (response.ok) {
                login(userData)
                return response.json();
              }
              throw new Error('Signup failed');
            })
            .then((data) => {
              // Handle successful signup
              console.log('New user created:', data);
              // Perform additional actions if needed
            })
            .catch((error) => {
              // Handle signup error
              console.error('Signup error:', error);
            });
        };


    return (
        <>
        
        <Modal
          show = {show}
          className="modal show"
          style={{ display: 'block', position: 'initial' }}
          onHide={onClose}
        >
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
    
            <Modal.Body>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <Field
                      type="text"
                      name="email"
                      id="email"
                      className="form-control form-field"
                    />
                    <ErrorMessage name="email" component="div" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      className="form-control form-field"
                    />
                    <ErrorMessage name="password" component="div" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password: </label>
                    <Field
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      className="form-control form-field"
                    />
                    <ErrorMessage name="confirmPassword" component="div" />
                  </div>
                  <button type="button" onClick ={onClose}>Close</button>
                    <button  type="submit">SignUp</button>
                </Form>
              </Formik>
            </Modal.Body>
    
            <Modal.Footer>
              
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
        
        </>
      );
    }

export default Signup