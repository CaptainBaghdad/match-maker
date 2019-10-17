import React, {useState, useEffect, useReducer} from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
         width: '100%',
         top: 5
       }
   });


let DefaultBackgroundComponent = () =>{
    const classes = useStyles();
    return (
        <div > 
        <img 
        src={`http://localhost:4677/images/backgroundImages/defaultBackgroundProfile.jpg`} 
        alt="there is a problem"
        className={classes.jumboImage}
        />
        
        </div>
    )

}

export default DefaultBackgroundComponent;