import React, {userReducer, useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
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
         width: 1444
       }
   });

let DefaultProfileComponent = () => {
const classes = useStyles();
let [hasProfile, setProfile] = useState(false);
return (
    <div>
    <Avatar src={`http://localhost:4677/images/defaultProfile.jpg`}
     alt="there is a problem"
     className={classes.bigAvatar}
     />

    </div>
)

}

export default DefaultProfileComponent;