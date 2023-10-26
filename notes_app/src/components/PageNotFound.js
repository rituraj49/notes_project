import React from 'react'
import Layout from '../layout/Layout'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <Layout>
      <h4>Undefined route. <Link to="/">Click here</Link> to go to home page.</h4>
    </Layout>
  )
}

export default PageNotFound