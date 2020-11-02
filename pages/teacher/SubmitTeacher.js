import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import lodash from 'lodash'
import studentFormValidation from '../../validations/studentFormValidation'
import TeacherForm from './TeacherForm'

function SubmitTeacher(props) {
    const [errors, setError] = useState({})
    const [isValid, setIsValid] = useState(true)
    const [isAdded, setIsAdded] = useState(false)

    const submit = (values) => {
    
        const {errors, isValid} = studentFormValidation(values)
        console.log("teacher :", values)
        if (!isValid) {
            setError(errors)
            setIsValid(isValid)
        } else {
            fetch('http://localhost:9000/user', {
                method : 'POST',
                headers : {
                    // 'Access-Control-Allow-Origin': '*',
                    'content-type' : 'application/json'
                },
                body : JSON.stringify({
                    "userName" : values.username,
                    "userPassword" : values.password,
                    "userRole" : "teacher",
                    "userEmail" : values.email,
                    "subjects" : values.courses
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
          <h2>Add Teacher</h2>
          <TeacherForm onSubmit={submit} isValid={isValid} errors={errors}
          isAdded={isAdded}/>
        </>
    )
}

export default connect()(SubmitTeacher)
