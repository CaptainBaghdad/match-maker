import React, {useState,useEffect, useReducer  } from "react";
import userReducer from '../../reducers/userReducer';
import initState from '../../globalState';

let UsersHolderComponent = (props) =>{
let [globalObject, dispatch]  =  useReducer(userReducer, initState); 

useEffect(()=>{
    let name = localStorage.getItem('name');
    let nameData = new FormData();
    console.log(`BOY OH BOY ${name}`)
    nameData.append('name', name)
    
    fetch('http://localhost:4677/get-all-users', {
    method: 'POST',
    body: nameData
    })
    .then(res => res.json())
    .then(data =>{
        console.log(`I got all the users here ${data.length}`)
    })
    
    //console.log(`BOWWWWWW, this is from the usersHolder component`)



})

return (
    <div>
        This is the users holder 
    </div>
)


}


export default UsersHolderComponent;