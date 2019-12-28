import React, {Fragment} from 'react'
import axios from 'axios'
import config from "../../config"
import NavBar from "../nav-bar/navigationBar";
import Typography from '@material-ui/core/Typography';
import {Paper, MenuItem, Button, FormControlLabel, Grid, TextField} from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { Form} from 'react-final-form'

class AddContact extends React.Component {
    constructor(){
        super();
        this.state = {
            email: "",
            phoneNumber: "",
            fullname: ""
        };

        this.submit_data = this.submit_data.bind(this)

    }

    componentDidMount() {
        let userId = localStorage.getItem("userId");

        if (userId === null) {
            this.props.history.push("/login");
        }

        //use user id to **get** contacts and change state
        this.setState({contacts: [{key: 1, data: "first"}]});
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    submit_data(e) {
        e.preventDefault();
        console.log(this.state);

        axios({
            method: 'post',
            url: config.CONTACT_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("userToken")
            },
            data: {
                "email": [this.state.email],
                "fullname": [this.state.fullname],
                "phoneNumber": [this.state.phoneNumber],
                "username": localStorage.getItem("username")
            }
        }).
        then((res) => {
            if (res.data.success) {
                alert("Successfully added new contact")
            }}).
        catch((err) => {
            console.log("err", err);
        })
    }

    render(){
        return(
            <Fragment>
                <NavBar history={this.props.history}/>
                <Paper variant="outlined" style={{backgroundColor:"#b3e5fc", marginLeft: "auto", marginRight: "auto", marginTop: 40, width: 350, height:400, padding: 16 }}>
                    <Typography variant="h4" align='center' gutterBottom>
                        Add New Contact
                    </Typography>
                    <Form
                        onSubmit={this.submit_data}
                        render={({handleSubmit, form, submitting, pristine, values}) => (
                            <form onSubmit={this.submit_data}>
                                <Grid container>
                                    <Grid item xs={12} style={{marginLeft: 70}}>
                                        <TextField
                                            id="fullname"
                                            name="fullname"
                                            onChange={this.handleChange}
                                            label="Fullname"
                                            value={this.state.fullname}
                                            style={{width: 200}}
                                        />
                                    </Grid>
                                    <Grid item xs={12} style={{marginLeft: 70, marginTop: 20}}>
                                        <TextField
                                            id="email"
                                            name="email"
                                            label="Email Address"
                                            onChange={this.handleChange}
                                            value={this.state.email}
                                            style={{width: 200}}
                                        />
                                    </Grid>
                                    <Grid item xs={12} style={{marginLeft: 70, marginTop: 20}}>
                                        <TextField
                                            id="phone"
                                            name="phoneNumber"
                                            onChange={this.handleChange}
                                            label="Phone Number"
                                            value={this.state.phoneNumber}
                                            style={{width: 200}}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            style={{marginLeft: 250, marginTop: 120}}
                                            variant="contained"
                                            color="primary"
                                            onClick={this.submit_data}
                                        >
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>

                            </form>

                        )}
                    />
                </Paper>
            </Fragment>

        )


    }

}

export default AddContact;

