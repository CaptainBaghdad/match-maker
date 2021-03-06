import React, { useReducer} from 'react';
import userReducer from '../reducers/userReducer';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
//import LockOutlinedIcon from '@material-ui/icon/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import initState from '../globalState';
  
let LoginComponent  = () =>{
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
    
    let initState = {
        isLoading: true,
        isLoggedIn: false,
        name: '',
        email: '',
        password: '',
        token:''
    
    }

    

    let [userObj, dispatch] = useReducer(userReducer, initState)

    let handleSubmit = (e) =>{
        e.preventDefault();
        
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
      console.log(`THE FUCCCCKKKK ${email}`)
        if(email !== undefined || email !== ''){
          let loginData = new FormData();
          loginData.append('email', email);
          loginData.append('password', password);
            fetch('http://localhost:4677/login', {
                method: 'POST',
                
                body:loginData
            })
            .then(res => res.json())
            .then(data =>{
                if(data.error){
                    //alert('Please try again')
                    console.log(data.error)
                    window.location = "/register"
    
                }
                if(!data.error){
                  console.log(`OBEJCT BIOOTCH ${Object.keys(data)}`)
                    dispatch({type:'LOGIN_USER', payload: data})
                   localStorage.setItem('token', data.token)
                   localStorage.setItem('name', data.foundUser.name)
                   window.location = '/profile';
                }

                
                   
                
                
            })

           

        }
        

           
            
     
        //console.log(`WE got it all hooked up`)
     

    }

    return (
        <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
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
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
             
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
    )




}


export default LoginComponent;