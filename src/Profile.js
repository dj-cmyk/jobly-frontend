import React, {useContext, useState} from 'react';
import UserContext from './UserContext';
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import "./Profile.css";


const Profile = ({update}) => {
    const user = useContext(UserContext)
   // set initial values of the form to be blank/empty
   const INITIAL_STATE = {
    username: user.username,
    password: '',
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName
  }

  // initialize state for the form to fill with user data and prepare to re-route with useHistory once form is submitted
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

    // call API to update information
    update({ ...formData })
    // redirect to home page with logged in status
        history.push('/')
    // reset the form to blank
    setFormData(INITIAL_STATE)
  }

  return (
    <Form onSubmit={handleSubmit} className="Profile">
      
      <Label>username: </Label>
      <p>{user.username}</p>
      
      
      <FormGroup>
      <Label htmlFor="email">Email Address: </Label>
      <Input
        id="email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className=""
      />
      </FormGroup>
      <FormGroup>
      <Label htmlFor="firstName">First Name: </Label>
      <Input
        id="firstName"
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        className=""
      />
      </FormGroup>
      <FormGroup>
      <Label htmlFor="lastName">Last Name: </Label>
      <Input
        id="lastName"
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        className=""
      />
      </FormGroup>
      <FormGroup>
      <Label htmlFor="password">Confirm password to make changes: </Label>
      <Input
        id="password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        className=""
      />
      </FormGroup>
      <Button>Save Changes</Button>
    </Form>
  )
}

export default Profile;