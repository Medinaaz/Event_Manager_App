import React, { useState, Fragment } from "react";
import "./Login.css";
import axios from "axios";
import withContext from "../../withContext";
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { useStyles } from "./styles";
import config from "../../config";
import AccountCircle from '@material-ui/icons/AccountCircle';

const Login = (props) => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [errorDialog, setErrorDialog] = useState(false);

    const classes = useStyles();

    const handleChange = (prop) => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await axios({
                method: 'post',
                url: config.LOGIN_URL,
                headers: { 'Content-Type': 'application/json','X-Requested-With': 'XMLHttpRequest'},
                data: {
                    email: values.email,
                    password: values.password
                }
            });

            console.log(res);

            if (res.data.success) {
                localStorage.setItem("userToken", res.data.data.token);
                localStorage.setItem("username", res.data.data.username);
                props.history.push("/create-meeting");
            }

            else {
                setErrorDialog(true);
            }
        } catch (err) {
            setErrorDialog(true);
        }

    };

    const keyPressed = async (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event)
        }
    };

    return (
        <Fragment>
            <div style={{ position: 'absolute',top: 0, right: 0, left: 0, bottom: 0, paddingTop: '100px' }} align="center">

                <Paper
                    className={classes.paproot}
                >
                    <Typography>
                        <Paper
                            className={classes.root}>

                            <Typography variant="h5" component="h3">
                                <div className="login-input">
                                    <TextField
                                        id="outlined-email-input"
                                        className={classes.textField}
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        margin="normal"
                                        vagriant="outlined"
                                        value={values.email}
                                        onChange={handleChange('email')}
                                        placeholder="Email address"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AccountCircle />
                                                </InputAdornment>
                                            ),
                                        }}

                                    />
                                </div>

                                <div className="pass">
                                    <TextField
                                        id="outlined-password-input"
                                        className={classes.textField}
                                        type={values.showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        margin="normal"
                                        name="password"
                                        variant="outlined"
                                        value={values.password}
                                        onChange={handleChange('password')}
                                        onKeyPress={keyPressed}
                                        placeholder="Password"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        edge="end"
                                                        aria-label="Toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                    >
                                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>

                                <div style={{ display: 'flex' }}>
                                    <Button variant="outlined" color="primary" onClick={handleSubmit}
                                        className={classes.signIn}
                                    >
                                        Login
                                    </Button>
                                </div>

                                <br />
                            </Typography>
                        </Paper>
                    </Typography>
                </Paper>

            </div>

            <div>
                <Dialog borderRadius={15} clone
                    className={classes.dialog}
                    open={errorDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle className={classes.diogTit} id="alert-dialog-title" >{"You write wrong e-mail or password."} <br/> {"Please enter correctly."}</DialogTitle>
                    <DialogActions>
                        <Button className={classes.button} onClick={() => setErrorDialog(false)} color="silver" autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>


        </Fragment>
    );
}


export default withContext(Login);
