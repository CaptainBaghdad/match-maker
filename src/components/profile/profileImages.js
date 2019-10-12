import React from 'react';
import { FormControl } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {useReducer, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import userReducer from '../../reducers/userReducer';
import Avatar from '@material-ui/core/Avatar';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ButtonBase from '@material-ui/core/ButtonBase';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {Link} from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
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
    circle: {
       
        top: 70
       
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: 'white',
        border: '2px solid #000',
        left: 35,
        height: 200
        
      },
      submit: {
          width: 30,
          height: 30

      },
      jumboImage: {
        height: 350,
        width: 1444
      }
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
     let [open, setOpen] = useState(false);
    
        

     let handleJumboImage = (e) =>{
        setOpen(true)
        console.log(`FIRED FROM THE JUMBO!!`)


     }

     let sendBackgroundImage = (e) =>{
         e.preventDefault();
         let image = document.getElementById('main-background-image').files[0];
         //console.log(`This is the background function ${image}`)
         let backgroundData = new FormData();
         let userName = localStorage.getItem('name');
         backgroundData.append('main-background-image', image);
         backgroundData.append('userName', userName);

         fetch('http://localhost:4677/main-background-image',{
             method: 'POST',
             body: backgroundData
         })
         .then(res => res.json())

         .then((data)=>{
            setOpen(false)
     

             console.log(`I HAVE IT>>> ${data.backgroundPic}`)
             dispatch({type:'BACKGROUND_IMAGE', payload: data.backgroundPic})
             let backgroundHolder = document.getElementById('backgroundHolder')
             backgroundHolder.innerHTML = "";

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
         <div id="backgroundHolder">
         <Tooltip title="Add Background Photo" aria-label="add">
        <Fab color="primary" className={classes.circle}>
          <AddIcon onClick={handleJumboImage}  />
        </Fab>
      </Tooltip>
       <Modal
       aria-labelledby="simple-modal-title"
       aria-describedby="simple-modal-description"
       open={open}
      
       
       >

        <div className={classes.paper}>
          <h2 id="simple-modal-title">Choose File</h2>
          <form onSubmit={sendBackgroundImage}>
          <input type="file" name="main-background-image" id="main-background-image" />
            <Button 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            
            />
          </form>
         
        </div>
           
           </Modal>
           </div>
           <img src={`http://localhost:4677/images/backgroundImages/${globalObject.backgroundPic}`} 
           className={classes.jumboImage}
           alt="             "
           />
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