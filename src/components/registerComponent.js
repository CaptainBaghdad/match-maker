import React from 'react';
import userReducer from '../reducers/userReducer';
import {useReducer} from 'react';
import {Redirect} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {Link} from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
//import LockOutlinedIcon from '@material-ui/icon/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import initState from '../globalState';






let RegisterUserComponent = (props) =>{
    const useStyles = makeStyles(theme => ({
        root: {
          height: '100vh',
        },
        image: {
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        },
        paper: {
          margin: theme.spacing(8, 4),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(1),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
      }));

    const classes = useStyles();

    const BootstrapInput = withStyles(theme => ({
      root: {
        'label + &': {
          marginTop: theme.spacing(3),
        },
      },
      input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
          borderRadius: 4,
          borderColor: '#80bdff',
          boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
      },
    }))(InputBase);


    let [stateObj, dispatch] = useReducer(userReducer, initState)

    let handleRegionChange = (e) =>{
        //stateObj.name = e.target.value
        //stateObj.email = e.target.email.value
       // console.log(e.target.id)
   
        

    }

    let renderSelect = (e) => {
      let arrOfStates = [
        "AK","AL",'AR','AZ','CA','CO','CT','DE','FL','GA',
        'HI','IA','ID','IL','IN','KS','KY','LA','MA','MD',
        'ME','MI','MN','MO','MS','MT','NC','ND','NE','NH',
         'NJ','NM','NV','NY','OH','OK','OR','PA','RI','SC',
         'SD','TN','TX','UT','VA','VT','WA',"WI","WV","WY"
      ]
      return (
        <select id="region" >
        {arrOfStates.map((ele)=>{
          return (
            <option value={ele}>{ele}</option>
          )

        })}
        </select>
      )


    }

    let getRadioValue = () =>{
      var choices = document.getElementsByName('gender');
      let ans = '';
      for(let i = 0 ; i < choices.length;i++){
        if(choices[i].checked){
          ans = choices[i].value

        }

      }

      return ans;

    }

    let handleSubmit = (e) =>{
        e.preventDefault(); 
        let gender = getRadioValue();
        fetch('http://localhost:4677/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            gender: gender,
            age: document.getElementById('age').value,
            region: document.getElementById('region').value    
        })
    
    })
    .then(res => res.json())
    .then(data =>{
        dispatch({type: 'REGISTER_USER',payload: data})
        if(stateObj.name !== ''){
            console.log(`this is the stateObj value ${stateObj.name}`);
            localStorage.setItem('name', stateObj.name);
            window.location ='/login'
          
          


        }
        //console.log(`StateObj value of name ${ans}`)

        
    })


      
       
    } 

    
          return  ( <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                
              </Avatar>
              <Typography component="h1" variant="h5">
                Register
              </Typography>
              <form className={classes.form} onSubmit={handleSubmit} noValidate>
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  
                  autoFocus
                />
                
                
                
                
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
               />
               Male <input type="radio" name="gender" value="male" />
               Female <input type="radio" name="gender" value="female" />

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="age"
                  label="Age"
                  type="number"
                  id="age"
                  autoComplete="Age"
               />

                 <FormControl className={classes.margin}>
        <InputLabel htmlFor="region"> Select State</InputLabel>
      {renderSelect()}
      </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to="/" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/login">
                      {"Already have an account? Log In"}
                    </Link>
                  </Grid>
                </Grid>
                <Box mt={5}>
                 
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>)

           

        
       


}

export default RegisterUserComponent