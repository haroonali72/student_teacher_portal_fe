import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import loginValidation from '../../validations/loginValidation'
import {userLogin} from './../../actions/userActions'
import lodash from 'lodash'
import DegreeForm from './degreeForm'

function SubmitDegree(props) {
    let subjects = []
    const [errors, setError] = useState({})
    const [isValid, setIsValid] = useState(true)
    const [isAdded, setIsAdded] = useState(false)

    const submit = (values) => {
    
        if (lodash.isEmpty(values.degreename)) {
            setError({
                error : "degree name field is empty"
            })
            setIsValid(false)
        } else {
            console.log("within degree submit")
            fetch('http://localhost:9000/degree', {
                method : 'POST',
                headers : {
                    // 'Access-Control-Allow-Origin': '*',
                    'content-type' : 'application/json'
                },
                body : JSON.stringify({
                    "degreeName" : values.degreename,
                    "courses" : []
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
          <h2>Add Degree</h2>
          <DegreeForm onSubmit={submit} isValid={isValid} errors={errors}
          isAdded={isAdded}/>
        </>
    )
    
}

export default connect()(SubmitDegree)
