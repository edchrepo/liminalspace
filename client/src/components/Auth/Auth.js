import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import useStyles from './styles'
import Input from './input'
import jwt_decode from 'jwt-decode'
import { signin, signup } from '../../actions/auth'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

  const handleSubmit = (e) => {
    e.preventDefault(); //add on submit to avoid reloads
    
    if(isSignup) {
        dispatch(signup(formData, history))
    } else {
        dispatch(signin(formData, history))       
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })    
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  }

  const createOrGetUser = async (res) => {
    const result = res?.credential;
    const decoded = jwt_decode(result);

    try {
        dispatch({ type: 'AUTH', data: decoded })
        history.push('/');
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    { 
                        isSignup && (
                        <>
                            <Input
                                name="firstName" 
                                label="First Name" 
                                handleChange={handleChange} 
                                autoFocus 
                                half
                            />
                            <Input 
                                name="lastName" 
                                label="Last Name" 
                                handleChange={handleChange}
                                half 
                            />
                        </>
                    )}
                    <Input 
                        name ="email" 
                        label="Email Address" 
                        handleChange={handleChange} 
                        type="email"
                    />  
                    <Input
                        name="password"
                        label="Password"
                        handleChange={handleChange}
                        type={showPassword ? "text" : "password"} 
                        handleShowPassword={handleShowPassword}
                    />
                    { isSignup && <Input 
                                        name="confirmPassword"
                                        label="Repeat Password"
                                        handleChange={handleChange}
                                        type="password"
                                 /> }            
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </Button>
                <GoogleLogin 
                    onSuccess={(response) => createOrGetUser(response)}
                    onError={() => console.log('Error')}
                />
                <Grid container justify="flex-end">
                    <Grid item>
                        <Button onClick={switchMode}>
                            { isSignup ? 'Already have an account? Sign In' 
                                        :
                                        "Don't have an account? Sign Up"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth