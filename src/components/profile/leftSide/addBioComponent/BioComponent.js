import React, {useState,useReducer} from 'react';
import userReducer from '../../../../reducers/userReducer';
import initState from '../../../../globalState';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { exportNamedDeclaration } from '@babel/types';

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
    bio: {
        height: 12,
        width: 12
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    
  }));



let BioComponent = () =>{

const classes = useStyles();   
const [selectedIndex, setSelectedIndex] = React.useState(1);
const [modalStyle] = React.useState(getModalStyle);
const [open, setOpen] = React.useState(false);
let [globalState, dispatch] = useReducer(userReducer, initState);

let handleSubmit = (e) =>{
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
    headers: {
      'content-type': 'application/json',
      'Accept': 'application/json'
    }, 
    body: JSON.stringify({bioData: bioInfo, name: name})


    })
  .then(res => res.json())
  .then(data => {
    //console.log(`this is the response from the promise ${data.name}`)
    dispatch({type: 'SET_BIO', payload: data.bio})
    setOpen(false)
  })

}

const handleOpen = () => {
    setOpen(true);
  };

const handleClose = () => {
    setOpen(false);
  };

const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleEdit = (e) =>{
    e.preventDefault();
    let editBioValue = document.getElementById('editBio').value;
    if(editBioValue == ""){
      alert();

    }
    
    let name = localStorage.getItem('name')
    handleClose();
    fetch('http://localhost:4677/set-bio', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Accept': 'application/json'
    }, 
    body: JSON.stringify({bioData: editBioValue, name: name})


    })
  .then(res => res.json())
  .then(data =>{
    dispatch({type: 'SET_BIO', payload: data.bio})
  })


  }

  let handleEditChange = (e) => {
    dispatch({type: 'SET_BIO', payload: e.target.value})
    // e.target.value

  }


    


 return (
   <div>

     
      {globalState.bio == '' ? (<div> 
  <ListItem
       button
       selected={selectedIndex === 0}
       onClick={event => handleListItemClick(event, 0)}
     >
     <ListItemText primary="Bio" />
       <ListItemIcon>
       <Fab color="primary" >
       <AddIcon onClick={handleOpen}  />
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
     </div>) : (<div>
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
aria-labelledby="edit-bio-title"
aria-describedby="edit-bio-description"
open={open}
onClose={handleClose}
>
<div style={modalStyle} className={classes.paper}>
  <h2 id="edit-bio-title">Edit Bio</h2>

  <form onSubmit={handleEdit}>
  <textarea rows="5" 
  cols="50"
   id="editBio"
    name="editBio" 
    value={globalState.bio} 
    onChange={handleEditChange}
    >
  </textarea>
  <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        >Edit Button
        </Button>

  </form>
  <p id="edit-bio-description">
    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
  </p>
  
</div>
        </Modal> </div>)
}

</div>)
    


}

export default BioComponent;