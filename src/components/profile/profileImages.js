import React from 'react';
import { FormControl } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {useReducer} from 'react';
import userReducer from '../../reducers/userReducer';
import initState from '../../globalState';



let ImageHolder = (props) =>{
    let [globalObject, dispatch] = useReducer(userReducer, initState)
    let handleSubmit = (e) =>{
        e.preventDefault();
        let fileData = new FormData();
         let file = document.getElementById('profile-file').files[0];
         
        fileData.append('profile-file', file)
        let ans = fileData.getAll('profile-file');
        console.log(ans[0].name)
       // console.log(`BLUE FACED ${fileData.get('profile-file').filename}`)
    
         //console.log(`This is from the handle Submit ${file.name}`)
         //console.log(`This is the event ${e.target}`)
         fetch('http://localhost:4677/main-profile',{
             method: 'POST',
             
             
             body: fileData
         })
         .then((data)=>{
           // console.log(`TF TF TF ${data}`)
           //globalObject.profilePic = 
             dispatch({type:'PROFILE_PIC', payload: ans[0].name})
            
             //globalObject.profilePic = data.ans 

             console.log(`We got the response ${globalObject.profilePic}`)
    
         })
        
     
     }
     
     
    




    return (
        <div>
        <h2>select a profile picture</h2> name {globalObject.name}
        <form onSubmit={handleSubmit}
        
        >
        <input type="file" name="profile-file" id="profile-file" />
        <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            
            >Submit
            </Button>

        </form>

        
            <img src={`http://localhost:4677/images/${globalObject.profilePic}`} 
            alt={`${globalObject.profilePic}`}
            crossOrigin="anonymous"
            /> 
        

        </div>
    )


}

export default ImageHolder;