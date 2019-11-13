//import required react and other hook methods
import React, { useEffect,useState } from "react";

//import react-redux hook methods
import {useSelector, useDispatch} from 'react-redux';

//import redux action from redux file
import { getDatasAction, getDatasSocketAction } from "../redux";

import endpoint from '../endpoint'

// import axios for http api call to interact with server side
//import socket.io-client which listen to a io server which isin api server and this client lsiten to that io server
import socketIOClient from "socket.io-client";
import axios from "axios";

const Testing  = (props) => {

  //getting redux state
  let state = useSelector((state)=> state);

  //backend api server url
  // const endpoint = "http://127.0.0.1:8081";

  //use to dispatch a redux action to perform some task
  const dispatch = useDispatch();

  //use to call redux action when the socket is receiving any change is database
  const getDatasSocket = (data) =>  dispatch(getDatasSocketAction(data))

  //use to call redux action when the component load initially
  const getDatas = (obj) => dispatch(getDatasAction(obj))

  // console.log('redux state', state);

  // lifecycle method equivalent to componentDidMount of calss component
  useEffect(async()=>{
    //checking if not authenticated and localStorage also do not have any token then it redirect to login as this is a private dashboard page
    if(!state.isAuthenticated && !localStorage.getItem('token')){
      window.location.href = '/login';
    }


  //calling backend api to get last inserted data in the database and make timeelapsed using current time and then attack value  and
  //pass to the redux action
    let result = await axios.get(`${endpoint}/api/timestamp`);
    let pastTime = new Date(result.data.timestampObj[0].timestamp);
    let pastValue = result.data.timestampObj[0].value;
    let presentTime = new Date();
    let diff = presentTime - pastTime;

    //making payload object
    let obj = {};

    if (diff > 60e3){
        obj.timeelapsed = Math.floor(diff / 60e3)+ ' minutes ago';
        obj.value = pastValue
    }
    else{
      let x = Math.floor(diff / 1e3);
      if(x < 0)
        x = '0 seconds ago';
      else
        x = x + ' seconds ago'
      obj.timeelapsed =x;
        obj.value = pastValue
    }
    if(result.data){
      getDatas(obj);
    }

  //set up client side socket.io to listening continouslly the backend server socket.io
  const socket = socketIOClient(endpoint);

  //if any message conatining key "FromServer" is recieved then this callbacke function will triggered
  socket.on("FromServer", data => {

    //after getting the data which is latest updated to database
    //making the appropiate timeelapsed object with value and pass it to redux action
      let pastTime = new Date(data.timestamp);
      let pastValue = data.value;
      let presentime = new Date();
      let diff = presentime - pastTime;
      let obj = {};
      if (diff > 60e3){
        obj.timeelapsed = Math.floor(diff / 60e3) + ' minutes ago';
        obj.value = pastValue
      }
      else{
        let x = Math.floor(diff / 1e3);
      if(x < 0)
        x = '0 seconds ago';
      else
        x = x + ' seconds ago'
      obj.timeelapsed =x;
      obj.value = pastValue
      }
      if(data){
        getDatasSocket(obj);
      }
  });

 },[state.user])

    return (
        <div style={{ textAlign: "center", marginTop:'50px' }}>
                <div>
                  Time elapsed
                  <p>{state.timestamp? state.timestamp.timeelapsed + " document gets insereted":'loading'}</p>
                  <p> {state.timestamp ? "Random Value: "+state.timestamp.value:'' } </p>
                  </div>
        </div>
    );

}
export default Testing;