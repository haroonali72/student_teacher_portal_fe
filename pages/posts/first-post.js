import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Layout from '../../components/PracticeNextjs/layout'

function FirstPost() {
    return (
        <Layout>
            <Head>
                <title>First Post</title>
            </Head>
            <h1>First Post</h1>
            <Link href="/">
                <a><h2>Back To Home</h2></a>
            </Link>
        </Layout>
    )
}

export default FirstPost
