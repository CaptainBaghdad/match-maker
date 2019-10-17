import React from 'react';
import ImageHolder from './profileImages';
import DefaultProfileComponent from './default/defaultProfile';
import DefaultBackgroundComponent from './default/defaultBackground';

import LeftSideComponent from './leftSide/leftsideComponent';


import { FormControl } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {useReducer, useState,useEffect} from 'react';
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
import axios  from 'axios';

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }




const useStyles = makeStyles({
   jumbo:{
       height: 350,
       width: '100%',
       background: 'grey',
       position: 'relative',
       top: 0,
       left: 0
   },
    bigAvatar: {
      margin: 10,
      width: 130,
      height: 160,
      position: 'relative',
      top: 100,
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
        width: '100%',
        top: 5
      }
  });


let DashBoardComponent = () =>{
    let [globalObject, dispatch] = useReducer(userReducer, initState);
    let [open, setOpen] = useState(false);
    let [foundPic, setFoundPic] = useState(false);
    let [backgroundPic, setBackgroundPic] = useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [modalStyle] = React.useState(getModalStyle);
    const classes = useStyles();
   // let [open, setOpen] = useState(false);
    
        

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
     
    
    let handleOpen = () =>{
        setOpen(true)
    }

    let handleClose = () =>{
        setOpen(false)
    }
    let handleProfilePicUpload = (e) =>{

    }

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
      };
    
    
    let handleSubmit = (e) =>{
        e.preventDefault();
        handleClose()
        let fileData = new FormData();
        let file = document.getElementById('profile-file').files[0];
        let name = localStorage.getItem('name');
         
        fileData.append('profile-file', file);
        fileData.append('name', name);
        let ans = fileData.getAll('profile-file');
        console.log(ans[0].name)
      
       
         fetch('http://localhost:4677/main-profile',{
            method: 'POST',    
            body: fileData
        })
         //.then(res => res.json())
        
         
         .then((data)=>{
             //console.log(`TF TF TF ${data}`)
           //globalObject.profilePic = 
           console.log(`This is the mofo data ${Object.keys(data)}`)
             dispatch({type:'PROFILE_PIC', payload: data.profilePic})
            //let fileHolder = document.getElementById("file-holder");
             //globalObject.profilePic = data.ans 
             //fileHolder.innerHTML = ""

             console.log(`We got the response ${globalObject.profilePic}`)
    
         })
         
        
     
     }
    
   
    useEffect(() =>{
        console.log('USE EFFECT FIRED')
        let name = localStorage.getItem('name');
        let findName = new FormData();
        findName.append('name', name)
        fetch('http://localhost:4677/get-user', {
            method: "POST",
            body: findName      
        })
        .then(res => res.json())
        .then(data =>{
            //console.log(`!!!!!!!!!!!!! ${Object.keys(data)}`)
           
           if(data.profilePic != "" || data.profilePic != null || data.profilePic.length != 0){
                console.log(`There is no pic returned`)
            setFoundPic(true)
                dispatch({type:'PROFILE_PIC', payload: data.profilePic})
            }

            if(data.backgroundPic !== "" || data.backgroundPic !== null){
                console.log(`MOFO THIS IS THE BACKGROUND ${data.backgroundPic}`)
                setBackgroundPic(true);
                dispatch({type:'BACKGROUND_IMAGE', payload: data.backgroundPic})
            }
            console.log(`The fucking return from the hook is ${foundPic}`);
            //return foundPic     
        })
       
        return foundPic
       
    },[])
    

    return (
        <div>
            
        {globalObject.profilePic !== "" ? (
                   
            
                    <Avatar src={`http://localhost:4677/images/${globalObject.profilePic}`} 
                    className={classes.bigAvatar} alt="no pic"
                     
                    /> 
                  
                   
                   ) : 
                   
                   ( <DefaultProfileComponent />)
                  
                   
                   
                   }

                   { globalObject.backgroundPic !== "" ?
                   ( <div >
                    <img 
                    src={`http://localhost:4677/images/backgroundImages/${globalObject.backgroundPic}`} 
                    alt="there is a problem" 
                    className={classes.jumboImage}
                    />
                
                    </div>)
                   :

                   (<DefaultBackgroundComponent />)

                   }

                   

               
        
        
       
        </div>
    )
}


export default DashBoardComponent