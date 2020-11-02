import React, {useState, useEffect} from 'react'
import { Field, reduxForm } from 'redux-form'

function CourseForm(props) {
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
              name="courseName"
              component="input"
              type="text"
              placeholder="Course Name"
            /><br/>
            <div>
            {degreeList && degreeList.length > 0 && (
                <div>
                    <Field name="degreeName" component="select">
                        {degreeList.map((degree, index) => {
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
    form : 'courseForm'
})(CourseForm)
