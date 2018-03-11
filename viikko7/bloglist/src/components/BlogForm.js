import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

const submitButtonStyle = {
  marginTop:5
}

const BlogForm = ({ handleChange, handleSubmit }) => {
  return (
    <div>
      <h2>Luo uusi blogi</h2>

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <ControlLabel> title </ControlLabel>
          <FormControl
            type="text"
            name="title"
            onChange={handleChange}
          />

          <ControlLabel> author </ControlLabel>
          <FormControl
            type="text"
            name="author"
            onChange={handleChange}
          />

          <ControlLabel> url </ControlLabel>
          <FormControl
            type="text"
            name="url"
            onChange={handleChange}
          />
          <Button style={submitButtonStyle} bsStyle="success" type="submit">create</Button>
        </FormGroup>

      </form>
    </div>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  author: PropTypes.string,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}


export default BlogForm