import React, {useReducer, useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
//import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import userReducer from '../../reducers/userReducer';
import initState from '../../globalState';
import AddBioComponent from './bioComponent';
import EditBioComponent from './editBio';
import ButtonBase from '@material-ui/core/ButtonBase';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
//import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {Link} from 'react-router-dom';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles(theme => ({
    jumbo:{
        height: 350,
        width: '66%',
        background: 'grey',
        position: 'relative',
        top: 0,
        left: 0
    },
     bigAvatar: {
       margin: 10,
       width: 75,
       height: 100,
       position: 'relative',
       top: 10,
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
         width: '66%'
       },
       card: {
        maxWidth: 345,
        position: 'relative',
        top: 0
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
   }));


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


let ProfileImageComponent = (props) =>{
    let [globalObject, dispatch] = useReducer(userReducer, initState);
    const classes = useStyles();
    let [hasProfile, setProfile] = useState(false);
    const [expanded, setExpanded] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [modalStyle] = React.useState(getModalStyle);
    const handleExpandClick = () => {
        setExpanded(!expanded);
      };
    
      useEffect(() =>{
       // console.log('USE EFFECT FIRED')
        let name = localStorage.getItem('name');
        let findName = new FormData();
        findName.append('name', name)
        fetch('http://localhost:4677/get-user', {
            method: "POST",
            body: findName      
        })
        .then(res => res.json())
        .then(data =>{
           dispatch({type: 'LOAD_CARD', payload: data})
           
          
             
        })
       
       
       
    },[])

    const handleSubmit = () =>{
     // alert(`Got emm all hooked up`);
     let profileHolder = new FormData();
     let profilePic = document.getElementById('profilePic').files[0]
     if(localStorage.getItem('name') !== '' || localStorage.getItem('name') !== undefined){
      let name = localStorage.getItem('name'); 
      profileHolder.append('name', name);
       profileHolder.append('profilePic', profilePic);
       fetch('http://localhost:4677/update-profile', {method: 'POST', body:profileHolder})
      .then(res => res.json())
      .then(data =>{
        
      })
     }

     alert('There was a problem');
     //console.log(`This is the submit from the handleSubmit in the component `)




    }



    const handleOpen = () =>{
      setOpen(true)
    }

    const handleClose  = () =>{
      setOpen(false)
    }
    
    
    return (
        <div>
             <Card className={classes.card}>
          <CardHeader
            avatar={
                <Avatar src={`http://localhost:4677/images/${globalObject.profilePic}`}
                alt="there is a problem"
                className={classes.bigAvatar}
                />
            }
            action={
              <IconButton aria-label="settings" >
                <Tooltip title='Change Profile' >
            <AddIcon onClick={handleOpen} id="changePic"/>
           
            </Tooltip>   
            <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Select Picture</h2>
          <p id="simple-modal-description">
          <form onSubmit={handleSubmit}>
          <input type="file" name="profilePic" id="profilePic" />
          <input type="submit" value='submit' />

          </form>
          </p>
         
        </div>
      </Modal>
              </IconButton>
            }
            title={globalObject.name}
            subheader={globalObject.region}
          />
          <CardMedia
            className={classes.media}
            image={globalObject.backgroundPic == '' ? `http://localhost:4677/images/backgroundImages/defaultBackgroundProfile.jpg` : `http://localhost:4677/images/backgroundImages/${globalObject.backgroundPic}`}
            title="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
          {globalObject.bio == null ? (<AddBioComponent />) : (<div><EditBioComponent bio={globalObject.bio}/></div>) }
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
              <Typography paragraph>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                minutes.
              </Typography>
              <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
              </Typography>
              <Typography paragraph>
                Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
                again without stirring, until mussels have opened and rice is just tender, 5 to 7
                minutes more. (Discard any mussels that don’t open.)
              </Typography>
              <Typography>
                Set aside off of the heat to let rest for 10 minutes, and then serve.
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
       
    
        </div>
    )
    


}

export default ProfileImageComponent;