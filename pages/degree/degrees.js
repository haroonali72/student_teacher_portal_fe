import React, { Component } from 'react'
import Navbar from '../portal/Navbar'
import DegreeRow from './degreeRow'
import SubmitDegree from './submitDegree'
import { Provider } from 'react-redux'
import store from './../store'

export class Degrees extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            degrees : [],
            showDegreeForm : false
        }
    }

    componentDidMount() {
        fetch('http://localhost:9000/degree/degreeList')
            .then(response => response.json())
            .then(obj => {
                console.log(obj.degreeList)
                this.setState({
                    degrees: obj.degreeList
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
                            <th>Degrees</th>
                            <th>Delete</th>
                        </tr>
                    {
                        this.state.degrees.map((degree, index) => <DegreeRow key={index} degree={degree}/>)
                    }
                    </tbody>
                </table><br/>

                <button onClick={() => this.setState({
                    showDegreeForm : true
                })}>Add Degree</button><br/>
                {
                    this.state.showDegreeForm && 
                    <Provider store={store}>
                        <SubmitDegree />
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

export default Degrees
