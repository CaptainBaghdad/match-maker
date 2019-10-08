import React from 'react';
import userReducer from '../reducers/userReducer';
import {useReducer} from 'react';
import {Redirect} from 'react-router-dom';

let initState = {
    isLoading: true,
    isLoggedIn: false,
    name: '',
    email: '',
    password: ''

}




let RegisterUserComponent = (props) =>{
    let [stateObj, dispatch] = useReducer(userReducer, initState)

    let handleChange = (e) =>{
        //stateObj.name = e.target.value
        //stateObj.email = e.target.email.value
       // console.log(e.target.id)
        

    }

    let handleSubmit = (e) =>{
        e.preventDefault(); 
        fetch('http://localhost:4677/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        })
    
    })
    .then(res => res.json())
    .then(data =>{
        dispatch({type: 'REGISTER_USER',payload: data})
        if(stateObj.name !== ''){
            console.log(`this is the stateObj value ${stateObj.name}`);
            localStorage.setItem('name', stateObj.name);
            window.location ='/login'
          
          


        }
        //console.log(`StateObj value of name ${ans}`)

        
    })


      
       
    } 

    
          return  ( <div>
                <h2>Register Please</h2>
                <form onSubmit={handleSubmit}>
                <input type="text" name="name" id="name"  />
                <input type="text" name="email" id="email" />
                <input type="text" name="password" id="password" />
                <input type="submit"  />
                
    
                </form>
    
                {stateObj.name}
            </div>)

           

        
       


}

export default RegisterUserComponent