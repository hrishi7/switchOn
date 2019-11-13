//import react from react
import React from 'react'

// import react-redux hook method
  import {useSelector,useDispatch} from 'react-redux'

  import {logoutUserAction} from '../redux'

const Navbar = (props) => {

  const dispatch = useDispatch();

  const logoutUser = () =>dispatch(logoutUserAction())
  //getting redux state from store using useSelector hook
  const state = useSelector((state) =>state);
  //clear localStorage Token and redirect to login as user choose to logout
  const handleLogout = async () =>{
    // await localStorage.removeItem('token');
    logoutUser();
    window.location.href = '/login';
  }
  return (
    <div class="navbar">
        {!state.user ?(
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
