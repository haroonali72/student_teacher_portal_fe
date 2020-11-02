import React, { Component } from 'react'
import Navbar from '../portal/Navbar'
import CourseRow from './CourseRow'
import SubmitCourse from './SubmitCourse'
import { Provider } from 'react-redux'
import store from './../store'

export class Courses extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            courses : [],
            showCourseForm : false
        }
    }

    componentDidMount() {
        fetch('http://localhost:9000/course/courseList')
            .then(response => response.json())
            .then(obj => {
                console.log(obj.courseList)
                this.setState({
                    courses: obj.courseList
                });
            }
        )
    }
    render() {
        return (
            <Navbar>
                <table>
                    <tbody>
                        <tr>
                            <th>Degree</th>
                            <th>Course</th>
                            <th>Delete</th>
                        </tr>
                    {
                        this.state.courses.map((course, index) => <CourseRow key={index} course={course}/>)
                    }
                    </tbody>
                </table><br/>
                <button onClick={() => this.setState({
                    showCourseForm : true
                })}>Add Course</button><br/>
                {
                    this.state.showCourseForm && 
                    <Provider store={store}>
                        <SubmitCourse />
                    </Provider> 
                }
                <style jsx>{`
                table, th, td {
                    border: 1px solid black;
                  }                
                `}</style>
            </Navbar>
        )
    }
}

export default Courses
