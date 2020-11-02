import React, {useEffect, useState} from 'react'
import { Field, reduxForm } from 'redux-form'

function StudentForm(props) {
    const {handleSubmit, errors, isValid, isAdded} = props
    const [degreeList, setDegreeList] = useState([])

    useEffect(() => {
        fetch('http://localhost:9000/degree/degreeList')
            .then(response => response.json())
            .then(obj => {
                console.log(obj.degreeList)
                setDegreeList(obj.degreeList)
            }
        )
    }, [])

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
            <Field
              name="email"
              component="input"
              type="email"
              placeholder="Email"
            /><br/>
            <div>
            {degreeList && degreeList.length > 0 && (
                <div>
                    <Field name="degree" component="select">
                        {degreeList.map((degree, index) => {
                        props.getCourses(degree.courses)
                        return <option key={index}>{degree.degreeName}</option>;
                    })}
                    </Field>
                 </div>
            )}
            </div>

            <button type="submit" label="submit">Submit</button>
          </form>
          {isValid ? '' : errors.error}
        </>
    )
}

export default reduxForm({
    form : 'studentForm'
})(StudentForm)
