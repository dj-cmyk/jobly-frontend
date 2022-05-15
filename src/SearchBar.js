import React, { useState } from "react";
import { Button, Form, FormGroup, Input } from 'reactstrap';
import "./SearchBar.css";




const SearchBar = ({filterItems}) => {
  // set initial values of the form to be blank/empty
    const INITIAL_STATE = {
    search: ''
  }

  // initialize state for the form (blank) and prepare to re-route with useHistory once form is submitted
  const [formData, setFormData] = useState(INITIAL_STATE);
  

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
    
    // call the function to search the API based on form data
        filterItems(formData.search)

    // reset the form to blank
        setFormData(INITIAL_STATE)
  }

  return (
    <Form onSubmit={handleSubmit} className="SearchBar">
      <FormGroup>
      <Input
        id="search"
        type="text"
        name="search"
        value={formData.search}
        onChange={handleChange}
        className="SearchBar-input"
      />
      </FormGroup>

      <Button>Search</Button>
    </Form>
  )

}

export default SearchBar;