import React from 'react';




let userReducer  = (state, action) =>{
    //let res = sendToBackend(action.payload);
    switch(action.type){
        case 'REGISTER_USER':
        //console.log(`THIS IS THE STATE`)
        return {
            ...state,
            name: action.payload.name,
            email: action.payload.email,
            password: action.payload.password,
            gender: action.payload.gender,
            age: action.payload.age,
            region: action.payload.region
        }

        case 'LOGIN_USER':
        console.log('this is the dispatch ffrom the login')
        return {
            ...state,
            isLoggedIn: true,
            token: action.payload.token
        }

        case 'PROFILE_PIC':
        console.log(`This is from the reducer ${action.payload}`)
        return {
            ...state,
            profilePic: action.payload
        }

        case 'BACKGROUND_IMAGE':
        return {
            ...state,
            backgroundPic: action.payload
        }
       
        //console.log(`ANS ANS ANS ${Object.keys(ans)}`)
     
        default:
        return state 
    }

}

export default userReducer