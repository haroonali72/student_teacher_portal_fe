import React from 'react'
import styles from './layout.module.css'

//for coping same component in multiple pages. like headers and footers that might be same in all pages.
function Layout({children}) {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}

export default Layout
