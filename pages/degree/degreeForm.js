import React, {useEffect, useState} from 'react'
import { Field, reduxForm } from 'redux-form'

function DegreeForm(props) {
    const {handleSubmit, errors, isValid, isAdded} = props

    return (
        <>
          <form onSubmit={handleSubmit}>
            <Field
              name="degreename"
              component="input"
              type="text"
              placeholder="Degree Name"
            /><br/>
            <button type="submit" label="submit">Submit</button>
          </form>
          {isValid ? '' : errors.error}
        </>
    )
}

export default reduxForm({
    form : 'DegreeForm'
})(DegreeForm)