import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/features/authslice'
import {useNavigate} from 'react-router-dom'

function LogoutBtn() {
  const dispatch = useDispatch()
  const navigate=useNavigate();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout())
      navigate("/");

    })
  }

  return (
    <button
      onClick={logoutHandler}
      className='px-4 py-2 text-sm font-medium text-red-600 rounded-full transition-colors duration-200 hover:bg-red-50'
    >
      Logout
    </button>
  )
}

export default LogoutBtn