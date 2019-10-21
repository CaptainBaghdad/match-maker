import React, {useState,useEffect, useReducer  } from "react";
import userReducer from '../../reducers/userReducer';
import initState from '../../globalState';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EachUserComponent from './eachUser';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));







let UsersHolderComponent = (props) =>{

const classes = useStyles();
let [globalObject, dispatch]  =  useReducer(userReducer, initState); 

useEffect(()=>{
    let name = localStorage.getItem('name');
    let nameData = new FormData();
    //console.log(`BOY OH BOY ${name}`)
    nameData.append('name', name)
    
    fetch('http://localhost:4677/get-all-users', {
    method: 'POST',
    body: nameData
    })
    .then(res => res.json())
    .then(data =>{
        console.log(`I got all the users here ${data.length}`)
        dispatch({type: 'GET_ALL_USERS', payload: data})
    })
    
    //console.log(`BOWWWWWW, this is from the usersHolder component`)



},[])

const [expanded, setExpanded] = React.useState(false);

const handleExpandClick = () => {
  setExpanded(!expanded);
};

    return (
        <EachUserComponent allUsers={globalObject.allUsers}/>
        
      );





}


export default UsersHolderComponent;