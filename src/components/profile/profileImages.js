import React from 'react';
import { FormControl } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {useReducer} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import userReducer from '../../reducers/userReducer';
import Avatar from '@material-ui/core/Avatar';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import initState from '../../globalState';

const useStyles = makeStyles({
   jumbo:{
       height: 350,
       width: 1444,
       background: 'grey',
       position: 'relative',
       top: 0,
       left: 0
   },
    bigAvatar: {
      margin: 10,
      width: 200,
      height: 200,
      position: 'absolute',
      top: 200,
      left: 30
    },
  });

let ImageHolder = (props) =>{
    let [globalObject, dispatch] = useReducer(userReducer, initState);
    const classes = useStyles();
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
           console.log(`This is the mofo data ${Object.keys(data)}`)
             dispatch({type:'PROFILE_PIC', payload: ans[0].name})
            let fileHolder = document.getElementById("file-holder");
             //globalObject.profilePic = data.ans 
             fileHolder.innerHTML = ""

             console.log(`We got the response ${globalObject.profilePic}`)
    
         })
        
     
     }
     
     
    




    return (
        <Grid container spacing={2}>
        <Grid item xs={6} lg={3} md={4} sm={5} >
        <div >
        <div id="file-holder">
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
        </div>
        { globalObject.profilePic !== "" ? 
        <Grid container spacing={2}>
         <Grid item xs={10} lg={10} md={10} lg={10}>
         <div className={classes.jumbo}>
        <AddCircleIcon ></AddCircleIcon>
         </div>
         </Grid>
        
        <Grid item xs={6} lg={3} md={4} sm={5} >
        <Avatar src={`http://localhost:4677/images/${globalObject.profilePic}`} 
        className={classes.bigAvatar} 
        
        /> 
        </Grid>
       

        </Grid>
        
        :

        ""}
        </div>
        </Grid>
        </Grid>
        
           
            
            
       
    )


}

export default ImageHolder;