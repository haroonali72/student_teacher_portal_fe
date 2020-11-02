import Head from 'next/head'
import Link from 'next/link'
import { Provider } from 'react-redux'
import LoginHandler from './login/loginHandler'
import store from './store'

export default function Home() {
  return (
    <Provider store={store}>
      <div className="container">
        <LoginHandler />   
      </div>
    </Provider>
  )
}
