import React from 'react'
import { Typography } from '@mui/material'
import Header from './Layouts/Header';
import { Navigate, Outlet } from 'react-router-dom'

const Dashboard = () => {

  const collegeid = localStorage.getItem('collegeid')

  if (!localStorage.getItem('token')) {
    return <Navigate to="/signin" />
  }
  return (
    <div>
      <Header />
      {/* <Typography>This is Dashboard page</Typography> */}
      <Outlet />
    </div>
  )
}

export default Dashboard
