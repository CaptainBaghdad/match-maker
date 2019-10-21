import React, {useState,useReducer, useEffect} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
//import { makeStyles } from '@material-ui/core/styles';
//import Button from '@material-ui/core/Button';
//import Modal from '@material-ui/core/Modal';
import userReducer from '../../reducers/userReducer';
import initState from '../../globalState';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

let rand = () => {
    return Math.round(Math.random() * 20) - 10;
  }
  
 let getModalStyle = () => {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

const useStyles = makeStyles(theme => ({
   
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    
  }));


let EditBioComponent = (props) =>{
    
const classes = useStyles();
//const [selectedIndex, setSelectedIndex] = React.useState(1);
const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    };

//const classes = useStyles();   
const [selectedIndex, setSelectedIndex] = React.useState(1);
const [modalStyle] = React.useState(getModalStyle);
const [open, setOpen] = React.useState(false);
const [bioChanged, setBioChanged] = useState("");
let [globalState, dispatch] = useReducer(userReducer, initState);

useEffect((props)=>{
    

}, [props.bio])


const handleOpen = () => {
    setOpen(true);
  };

const handleClose = () => {
    setOpen(false);
  };


  const handleSubmit = (e) =>{
    e.preventDefault();
    let bioInfo = document.getElementById('bioInfo').value;
    console.log(`this ist the BIO VAL ${bioInfo}`);
    let name = localStorage.getItem('name');
    console.log(name)
    let bioData = new FormData();
    bioData.append('bioInfo', bioInfo)
    bioData.append('name', name)
   console.log(bioData.get(`bioInfo`))
   fetch('http://localhost:4677/set-bio', {
     method: 'POST',
    
     body: bioData
 
 
     })
   .then(res => res.json())
   .then(data => {
     //console.log(`this is the response from the promise ${data.name}`)
     dispatch({type: 'SET_BIO', payload: data.bio})
     setOpen(false)
     setBioChanged(globalState.bio)
   })

  }

  

return (
    <div>
    {props.bio}
    <ListItem
          button
          selected={selectedIndex === 0}
          onClick={event => handleListItemClick(event, 0)}
        >
        <ListItemText primary="Edit Bio" />
          <ListItemIcon>
          <Fab color="primary" >
          <EditIcon onClick={handleOpen}  />
        </Fab>
          </ListItemIcon>
          
        </ListItem>

        <Modal
aria-labelledby="simple-modal-title"
aria-describedby="simple-modal-description"
open={open}
onClose={handleClose}
>
<div style={modalStyle} className={classes.paper}>
<h2 id="simple-modal-title">Add a Short Bio</h2>

<form onSubmit={handleSubmit}>
<textarea rows="5" cols="50" id="bioInfo">
</textarea>
<Button
     type="submit"
     fullWidth
     variant="contained"
     color="primary"
     >Submit
     </Button>

</form>
<p id="simple-modal-description">
 Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
</p>

</div>
     </Modal>
    </div>

    
)
}

export default EditBioComponent;