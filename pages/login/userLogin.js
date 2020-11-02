import { values } from 'lodash'
import React from 'react'
import { Field, reduxForm } from 'redux-form'

function Login(props) {
    const {handleSubmit, errors, isValid} = props
    return (
      <>
        <form onSubmit={handleSubmit}>
          <Field
            name="username"
            component="input"
            type="text"
            placeholder="Username"
          /><br/>
          <Field
            name="password"
            component="input"
            type="password"
            placeholder="Password"
          /><br/>
          <button type="submit" label="submit">Submit</button>
        </form>
        {isValid ? '' : errors.error}
      </>
    )
}

export default reduxForm({
  form : 'login'
})(Login)