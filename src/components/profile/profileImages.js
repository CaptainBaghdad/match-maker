import React from 'react';
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



let ImageHolder = (props) =>{
    //console.log(`COMPOENENT DID MOUNT`)
   
    
    
    
    
 
   
    
   
     
    
    return (
        
        <div>This is the image holder</div>

            )


    


}

export default ImageHolder;