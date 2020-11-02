import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import loginValidation from '../../validations/loginValidation'
import Students from '../student/students'
import Login from './userLogin'
import {userLogin} from './../../actions/userActions'
import lodash from 'lodash'

function LoginHandler(props) {
    const [errors, setError] = useState({})
    const [isValid, setIsValid] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)
    const [loginResponse, setLoginResponse] = useState({})
    const router = useRouter()

    const [userData, setUserData] = useState({})
    const submit = (values) => {
        
        const {errors, isValid} = loginValidation(values)
        if (!isValid) {
            setError(errors)
            setIsValid(isValid)
        } else {
            fetch('http://localhost:9000/login', {
                method : 'POST',
                headers : {
                    // 'Access-Control-Allow-Origin': '*',
                    'content-type' : 'application/json'
                },
                body : JSON.stringify({
                    "username" : values.username,
                    "password" : values.password
                })
            })
            .then(response => response.json())
            .then(loginResponse => {
                console.log("response is : ", loginResponse)
                if (lodash.isEmpty(loginResponse.error)) {
                    localStorage.setItem('user', values.username)
                    setError({})
                    setIsValid(true)
                    setLoggedIn(true)
                    setLoginResponse(loginResponse)
                    setUserData(values)
                } else {
                    setError({
                        error : loginResponse.error
                    })
                    setIsValid(false)
                    setLoggedIn(false)
                }}
            )
        }
    }

    useEffect(() => {
        if (loggedIn) {
            if (loginResponse.isAdmin) {
                router.push("/student/students")
            } else if (loginResponse.isTeacher) {
                console.log("is teacher")
                router.push({
                    pathname: '/student/StudentDashboard',
                    query: { name: userData.username }
                })
            } else {
                //router.push("/student/StudentDashboard")
                console.log("from login : ", userData)
                router.push({
                    pathname: '/student/StudentDashboard',
                    query: { name: userData.username }
                })
            }
        }
        
    }, [loggedIn, loginResponse, userData])

    return (
        <>
          <h1>Login</h1>
          <Login onSubmit={submit} isValid={isValid} errors={errors}/>
        </>
    )
    
}

export default connect()(LoginHandler)

//export default LoginHandler
