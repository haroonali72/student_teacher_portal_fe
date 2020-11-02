import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from '../store'
import Navbar from '../portal/Navbar'
import TeacherRow from './TeacherRow'
import SubmitTeacher from './SubmitTeacher'

export class Teachers extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            users : [],
            showTeacherForm : false
        }
    }

    componentDidMount() {
        fetch('http://localhost:9000/user/teacher')
            .then(response => response.json())
            .then(obj => {
                console.log(obj.users)
                this.setState({
                    users: obj.users
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
                            <th>Username</th>
                            <th>Email</th>
                            <th>Courses</th>
                            <th>Delete</th>
                        </tr>
                    {
                        this.state.users.map((user, index) => <TeacherRow key={index} user={user}/>)
                    }
                    </tbody>
                </table><br/>
                
                <button onClick={() => this.setState({
                    showTeacherForm : true
                })}>Add Teacher</button><br/>
                {
                    this.state.showTeacherForm && 
                    <Provider store={store}>
                        <SubmitTeacher />
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

export default Teachers
