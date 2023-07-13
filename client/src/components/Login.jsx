import React from 'react'
import { useContext } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthContext from './AuthContext';


function Login({show, onClose}) {
    const { isAuthenticated, login, logout } = useContext(AuthContext)
    // console.log(show)
    // console.log(onClose)
    // console.log(login)


    const initialValues = {
        email: "",
        password: "",
      };
    
      const validationSchema = Yup.object({
        email: Yup.string().required("Email is required"),
        password: Yup.string().required("Password is required"),
      });

      const handleSubmit = (values) => {
        console.log("logging in")
        const userData = {
          ...values,
        };
        console.log(userData)
        console.log(values)
        login(values)
    }

    return (
        <Modal
          show = {show}
          className="modal show"
          style={{ display: 'block', position: 'initial' }}
          onHide={onClose}
        >
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Login</Modal.Title>
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
                  <button type="button" onClick ={onClose}>Close</button>
                    <button  type="submit">Log In</button>
                </Form>
              </Formik>
            </Modal.Body>
    
            <Modal.Footer>
              
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      );
    }

export default Login