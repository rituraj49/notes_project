import React from 'react'
import Layout from '../../layout/Layout'
import { Link } from 'react-router-dom'

function Logout() {
  return (
    <Layout>
      <h4>You have been logged out. <Link to="/login">Click here</Link> to login again</h4>
    </Layout>
  )
}

export default Logout