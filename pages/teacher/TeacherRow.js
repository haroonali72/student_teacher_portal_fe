import React from 'react'
import lodash from 'lodash'

function TeacherRow(props) {
    const deleteUser = () => {
        fetch(`http://localhost:9000/user/${props.user.userName}`, {
            method : 'DELETE',
            headers : {
                // 'Access-Control-Allow-Origin': '*',
                'content-type' : 'application/json'
            },
        })
        .then(response => response.json())
        .then(obj => {
                console.log(obj)
            })
    }
    return (
        <>
        <tr>
            <td>{props.user.userName}</td>
            <td>{props.user.userEmail}</td>
            <td>{lodash.join(props.user.subjects, ' | ')}</td>
            <td><button onClick={deleteUser}>Delete</button></td>
        </tr>
        <style jsx>{`
                table, th, td {
                    border: 1px solid black;
                  }                
                `}
        </style>
        </>
    )
}

export default TeacherRow
