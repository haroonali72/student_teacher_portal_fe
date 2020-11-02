import React, {useEffect} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import lodash from 'lodash'
import styles from './../../components/PracticeNextjs/layout.module.css'

function Navbar({children}) {
    const router = useRouter()
    const clearSession = () => {
        router.push("/")
    }


    return (
            <>
            <div className={styles.topnav}>
                <Link href="/student/students"><a>Student</a></Link>
                <Link href="/teacher/Teachers"><a>Teacher</a></Link>
                <Link href="/degree/degrees"><a>Degree</a></Link>
                <Link href="/course/Courses"><a>Course</a></Link>
                <a onClick={clearSession}>Log Out</a>
            </div><br/>
            <div>
                {children}
            </div>
            </>
        ) 
    
}

export default Navbar
