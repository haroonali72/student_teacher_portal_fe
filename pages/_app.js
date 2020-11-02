import React from 'react'
import '../styles/global.css'
import 'react-widgets/dist/css/react-widgets.css'

function App({ Component, pageProps }) {
    return <Component {...pageProps} />
}

export default App
