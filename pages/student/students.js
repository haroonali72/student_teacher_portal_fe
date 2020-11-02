import React, {useEffect,useState} from 'react'
import lodash from 'lodash'
import { useRouter } from 'next/router'
import Navbar from './../portal/Navbar'
import StudentRow from './studentRow'
import StudentForm from './studentForm'
import { Provider } from 'react-redux'
import store from './../store'
import SubmitStudent from './submitStudent'

class Students extends React.Component {

    usersData 
    constructor(props) {
        super(props)
    
        this.state = {
             users : [],
             showStudentForm : false
        }
    }

    componentDidMount() {
        fetch('http://localhost:9000/user/student')
            .then(response => response.json())
            .then(obj => {
                console.log(obj.users)
                this.setState({
                    users: obj.users
                });
            }
        )
    }

    // shouldComponentUpdate() {
    //     fetch('http://localhost:9000/user/student')
    //         .then(response => response.json())
    //         .then(obj => {
    //             console.log(obj.users)
    //             this.setState({
    //                 users: obj.users,
    //                 showStudentForm : false
    //             });
    //         })
    // }

    // componentDidUpdate(prevProp, prevState) {
    //     if (prevState.showStudentForm === this.state.showStudentForm) {
    //         fetch('http://localhost:9000/user/student')
    //         .then(response => response.json())
    //         .then(obj => {
    //             console.log(obj.users)
    //             this.setState({
    //                 users: obj.users,
    //                 showStudentForm : false
    //             });
    //         }
    //     )
    //     }
    // }
       
    
    render() {
        return (
            <Navbar>
                <table>
                    <tbody>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Degree</th>
                            <th>Courses</th>
                            <th>Delete</th>
                        </tr>
                    {
                        this.state.users.map((user, index) => <StudentRow key={index} user={user}/>)
                    }
                    </tbody>
                </table><br/>
                
                <button onClick={() => this.setState({
                    showStudentForm : true
                })}>Add Student</button><br/>
                {
                    this.state.showStudentForm && 
                    <Provider store={store}>
                        <SubmitStudent />
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

export default Students
