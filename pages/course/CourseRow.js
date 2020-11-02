import React from 'react'

function CourseRow(props) {
    console.log(props)
    const deleteCourse = () => {
        fetch(`http://localhost:9000/course/${props.course.degreeName}/${props.course.courseName}`, {
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
            <td>{props.course.degreeName}</td>
            <td>{props.course.courseName}</td>
            <td><button onClick={deleteCourse}>Delete</button></td>
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

export default CourseRow
