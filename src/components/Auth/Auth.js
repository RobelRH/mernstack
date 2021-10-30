import React, { useState } from 'react'
import useStyles from './styles.js'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input'
import { GoogleLogin } from 'react-google-login';
import Icon from './icon'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { signup, signin } from '../../actions/auth'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()

    const [showpassword, setShowPassword] = useState(false)
    const [isSignUp, setisSignUp] = useState(false)
    const [formData, setFormData] = useState(initialState)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)

        if(isSignUp) {
            dispatch(signup(formData, history))
        }
        else {
            dispatch(signin(formData, history))
        }

    }

    const handleChange = (e) => {
        e.preventDefault()
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const switchMode = () => {
        setisSignUp(!isSignUp)
        handleShowPassword(false)
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: {result, token} })
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }
    
    const googleError = (error) => {
        console.log(error)
        console.log('Google sign in failed, Try Again')
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{ isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit} >
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showpassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {
                            isSignUp &&
                            <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />
                        }
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            { isSignUp ? 'Sign Up' : 'Sign In' }
                        </Button>
                        <GoogleLogin
                            clientId="489852077045-snb36f6mu02mtluvbl8rnnm601me7t9l.apps.googleusercontent.com"
                            render={(renderProps) => (
                              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                Google Sign In
                              </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleError}
                            cookiePolicy="single_host_origin"
                        />
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    { isSignUp ? 'Already have an account' : 'Create new account' }
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
