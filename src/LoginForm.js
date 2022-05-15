import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import "./Form.css";



const LoginForm = ({login}) => {
  // set initial values of the form to be blank/empty
    const INITIAL_STATE = {
    username: '',
    password: ''
  }

  // initialize state for the form (blank) and prepare to re-route with useHistory once form is submitted
  const [formData, setFormData] = useState(INITIAL_STATE);
  const history = useHistory()

  // this makes it so react is controlling the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }))
  }

  
  const handleSubmit = (e) => {
    e.preventDefault();

    // call API to authenticate/validate login
    login({ ...formData })
    
    // redirect to home page with logged in status
        history.push('/')
    
    // reset the form to blank
    setFormData(INITIAL_STATE)
  }

  return (
    <Form onSubmit={handleSubmit} className="Form">
      <FormGroup>
      <Label htmlFor="username">username: </Label>
      <Input
        id="username"
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        className=""
      />
      </FormGroup>
      <FormGroup>
      <Label htmlFor="password">Password: </Label>
      <Input
        id="password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        className=""
      />
      </FormGroup>
      <Button>Log In </Button>
    </Form>
  )

}

export default LoginForm;