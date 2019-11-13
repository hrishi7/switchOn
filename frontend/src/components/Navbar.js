//import react from react
import React from 'react'

// import react-redux hook method
  import {useSelector} from 'react-redux'

const Navbar = (props) => {

  //getting redux state from store using useSelector hook
  const state = useSelector((state) =>state);
  //clear localStorage Token and redirect to login as user choose to logout
  const handleLogout = () =>{
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
  return (
    <div class="navbar">
        {!state.user && !localStorage.getItem('token') ?(
          <div>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
        </div>
        ):(<a onClick={handleLogout}>Logout</a>)
        }
    </div>
  )
}

export default Navbar
