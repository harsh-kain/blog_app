/* eslint-disable no-unused-vars */
import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/AuthSlice'

const LogoutBtn = () => {

  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout())
    })
  }
  return (
    <button className='inline-block px- duration-200 hover:bg-blue-100 rounded-full'>LogoutBtn</button>
  )
}

export default LogoutBtn