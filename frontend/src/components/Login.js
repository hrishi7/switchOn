//import required react and other hook methods
import React,{useState,useEffect} from 'react'

//import react-redux hook methods
import {useDispatch,useSelector} from 'react-redux'

import endpoint from '../endpoint'


//import redux action from redux file
import {loginUserAction} from '../redux';

// import axios for hhtp api call to interact with server side
import axios from 'axios'

// functional component login which is used for login
const Login = (props) => {

  //getting redux state
    let state = useSelector((state)=> state);

    //backend api server url
    // const endpoint = "http://127.0.0.1:8081";

    //use to dispatch a redux action to perform some task
    const dispatch = useDispatch();

    //use to initailize the required state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //use to change to form data along with typing
    const handleChange = (event) =>{
        event.target.name === 'email'?setEmail(event.target.value) :setPassword(event.target.value)
    }

    // lifecycle method equivalent to componentDidMount of calss component
    useEffect(()=>{
      //checking if the token is present in localStorage or not
      if(localStorage.getItem('token')){
        //if token is present then go to Dashbiard
        props.history.push('/');
      }
    },[state.user,props.history])

    //calling redux action using dispatch hook
    const loginUser = (data) => dispatch(loginUserAction(data))

    //use to submit the form data and call backend server with the data
    const handleSubmit = async(event) =>{
      event.preventDefault();
      let user = {email, password};
      let result = await axios.post(`${endpoint}/api/auth/login`, user);
      if(!result.data.success){
        return alert(result.data.message);
      }
      let data = result.data.token;

      // if successfull login then set the token which got from server to localStorage
      if(data){
        await localStorage.setItem('token', data);
        loginUser(data);
      }
    }
  return (
    <div className="form">
      <center><h2>Login</h2></center>
       <form onSubmit={handleSubmit} className="card" >
    <input type="text" name="email"  placeholder="enter email" value={email} onChange={handleChange}/>
    <input type="text" name="password" placeholder="enter password" value={password}  onChange={handleChange}/>
    <input type="submit" value="Login" onClick={handleSubmit}/>
      </form>
    </div>
  )
}

export default Login
