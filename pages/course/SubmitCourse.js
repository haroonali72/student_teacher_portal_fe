import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import CourseForm from './CourseForm'
import lodash from 'lodash'

function SubmitCourse() {
    const [errors, setError] = useState({})
    const [isValid, setIsValid] = useState(true)
    const [isAdded, setIsAdded] = useState(false)

    const submit = (values) => {
    
        if (lodash.isEmpty(values.degreeName)) {
            setError({
                error : "degree name field is empty"
            })
            setIsValid(false)
        } else if (lodash.isEmpty(values.courseName)) {
            setError({
                error : "course name field is empty"
            })
            setIsValid(false)
        } else {
            fetch('http://localhost:9000/course', {
                method : 'POST',
                headers : {
                    // 'Access-Control-Allow-Origin': '*',
                    'content-type' : 'application/json'
                },
                body : JSON.stringify({
                    "degreeName" : values.degreeName,
                    "courseName" : values.courseName
                })
            })
            .then(response => response.json())
            .then(loginResponse => {
                console.log("response is : ", loginResponse)
                if (lodash.isEmpty(loginResponse.error)) {
                    setError({})
                    setIsValid(true)
                    setIsAdded(true)
                } else {
                    setError({
                        error : loginResponse.error
                    })
                    setIsValid(false)
                    setIsAdded(false)
                }}
            )
        }
    }
    return (
        <>
          <h2>Add Course</h2>
          <CourseForm onSubmit={submit} isValid={isValid} errors={errors}
          isAdded={isAdded}/>
        </>
    )
}

export default connect()(SubmitCourse)
