import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import loginValidation from '../../validations/loginValidation'
import {userLogin} from './../../actions/userActions'
import lodash from 'lodash'
import StudentForm from './studentForm'
import studentFormValidation from '../../validations/studentFormValidation'

function SubmitStudent(props) {
    let subjects = []
    const [errors, setError] = useState({})
    const [isValid, setIsValid] = useState(true)
    const [isAdded, setIsAdded] = useState(false)

    const getCourses = (subs) => {
        subjects = subs
    }
    const submit = (values) => {
    
        const {errors, isValid} = studentFormValidation(values)
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
                    "userRole" : "student",
                    "userEmail" : values.email,
                    "degreeName" : values.degree,
                    "subjects" : subjects
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
          <h2>Add Student</h2>
          <StudentForm onSubmit={submit} getCourses={getCourses} isValid={isValid} errors={errors}
          isAdded={isAdded}/>
        </>
    )
    
}

export default connect()(SubmitStudent)

