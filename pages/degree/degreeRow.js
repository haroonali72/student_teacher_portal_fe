import React from 'react'

function DegreeRow(props) {
    console.log(props)
    const deleteDegree = () => {
        fetch(`http://localhost:9000/degree/${props.degree.degreeName}`, {
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
            <td>{props.degree.degreeName}</td>
            <td><button onClick={deleteDegree}>Delete</button></td>
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

export default DegreeRow
