import React, {useEffect, useState} from 'react'
import { withRouter } from 'next/router'
import lodash from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'

function StudentDashboard(props) {

    const [user, setUser] = useState({})
    const router = useRouter()

    fetch('http://localhost:9000/getUser',{
            method : 'POST',
            headers : {
                // 'Access-Control-Allow-Origin': '*',
                'content-type' : 'application/json'
            },
            body : JSON.stringify({
                "userName" : props.router.query.name,
            })
        })
        .then(response => response.json())
        .then(obj => {
            console.log(obj.user)
            setUser(obj.user)
        })
    useEffect(() => {
        console.log("component will be rendered")
    }, [])

    if (lodash.isEmpty(user)) {
        console.log("is empty :", user)
        return <h2>Loading ....</h2>
    } else {
        return (
            <div>
                User Name : <span>{user.userName}</span><br/>
                User Email : <span>{user.userEmail}</span>
                <ul>
                {
                    !lodash.isEmpty(user) && user.subjects.map((subject, index) => <li key={index}>{subject}</li>)
                }
                </ul><br/>
                <a onClick={() => router.push("/")}>Log Out</a>
            </div>
        )
    }
}

export default withRouter(StudentDashboard)
