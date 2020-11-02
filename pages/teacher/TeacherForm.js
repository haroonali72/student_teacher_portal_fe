import React, {useEffect, useState} from 'react'
import { Field, reduxForm } from 'redux-form'
import Multiselect from 'react-widgets/lib/Multiselect'

const renderMultiselect = ({ input, ...rest }) =>
  <Multiselect {...input}
    onBlur={() => input.onBlur()}
    value={input.value || []} // requires value to be an array
    {...rest}/>

function TeacherForm(props) {
    const {handleSubmit, errors, isValid, isAdded} = props
    const [courseList, setCourseList] = useState([])

    useEffect(() => {
        fetch('http://localhost:9000/course/courseList')
            .then(response => response.json())
            .then(obj => {
                let courseNames = [] 
                for (let i = 0 ; i < obj.courseList.length ; i++) {
                    courseNames.push(obj.courseList[i].courseName)
                }
                setCourseList(courseNames)
            }
        )
    }, [])

    return (
        <>
          <form onSubmit={handleSubmit}>
            <Field
              name="username"
              component="input"
              type="text"
              placeholder="Username"
            /><br/>
            <Field
              name="password"
              component="input"
              type="password"
              placeholder="Password"
            /><br/>
            <Field
              name="email"
              component="input"
              type="email"
              placeholder="Email"
            /><br/>
            <div>
            <Field
                        name="courses"
                        component={renderMultiselect}
                        defaultValue={[]}
                        data={courseList}
                        placeholder="Courses"/>
            </div><br/>

            <button type="submit" label="submit">Submit</button>
          </form>
          {isValid ? '' : errors.error}
        </>
    )
}

export default reduxForm({
    form : 'teacherForm'
})(TeacherForm)
