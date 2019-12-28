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

class CreateEvent extends React.Component {
    constructor(){
        super();
        this.state = {
            date: "",
            time: "",
            venueName: "",
            eventName: "",
            contacts: [],
            selectedContacts: [],
            username: localStorage.getItem("username")
        };
        this.submit_data = this.submit_data.bind(this)

    }

    componentDidMount() {
        let userId = localStorage.getItem("userId");

        if (userId === null) {
            this.props.history.push("/login");
        }

        axios({
            method: 'post',
            url: config.GET_CONTACTS,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("userToken")
            },
            data: {
                "username": localStorage.getItem("username")
            }
        }).
        then((res) => {
            console.log(localStorage.getItem("username"));
            console.log(res);
            this.setState({contacts: res.data.data});
        }).
        catch((err) => {
            console.log("err", err);
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleCheckboxListChange = (values) => {
        // values is array of selected item. e.g. ['apple', 'banana']
    };

    submit_data(e) {
        e.preventDefault();
        console.log(this.state);

        axios({
            method: 'post',
            url: config.MEETING_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("userToken")
                },
            data: this.state
        }).
        then((res) => {
            if (res.data.success) {
                alert("Meeting created successfully")
            }}).
        catch((err) => {
            console.log("err", err);
        })
    }

    render(){
        return(
        <Fragment>
            <NavBar history={this.props.history}/>
            <Paper variant="outlined" style={{backgroundColor:"#b3e5fc", marginLeft: "auto", marginRight: "auto", marginTop: 40, width: 600, height:500, padding: 16 }}>
                <Typography variant="h4" align='center' gutterBottom>
                    Create a Meeting
                </Typography>
                <Form
                    onSubmit={this.submit_data}
                    render={({handleSubmit, form, submitting, pristine, values}) => (
                        <form onSubmit={this.submit_data}>
                            <Grid container>
                                <Grid item xs={6} style={{marginLeft: 50}}>
                                    <TextField
                                        id="event"
                                        name="eventName"
                                        label="Event Name"
                                        onChange={this.handleChange}
                                        value={this.state.eventName}
                                    />
                                </Grid>
                                <Grid item xs={6} style={{marginRight: -50}}>
                                    <TextField
                                        id="venue"
                                        name="venueName"
                                        onChange={this.handleChange}
                                        label="Venue Name"
                                        value={this.state.venueName}
                                    />
                                </Grid>
                                <Grid item xs={6} style={{marginTop: 40, marginLeft: 50}}>
                                    <TextField
                                        id="date"
                                        label="Event Date"
                                        name="date"
                                        onChange={this.handleChange}
                                        style={{width:170}}
                                        type="date"
                                        value={this.state.date}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6} style={{marginTop: 40, marginRight: -50}}>
                                    <TextField
                                        id="time"
                                        label="Event Time"
                                        type="time"
                                        name="time"
                                        onChange={this.handleChange}
                                        value={this.state.time}
                                        style={{width:170}}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 300, // 5 min
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6} style={{marginTop:20, marginLeft: 50}}>
                                    <Typography variant="h6" align='center' gutterBottom>
                                        Select participiants
                                    </Typography>
                                    <List>
                                        {this.state.contacts.map(data => {
                                            const labelId = `checkbox-list-label-${data.key}`;
                                            return (
                                                <ListItem key={data.key} role={undefined} dense button>
                                                    <ListItemIcon>
                                                        <Checkbox
                                                            edge="start"
                                                            onChange={() => {
                                                                if (this.state.selectedContacts.indexOf(data.data) === -1) {
                                                                    this.state.selectedContacts.push(data.data)
                                                                }
                                                                else {
                                                                    let index = this.state.selectedContacts.indexOf(data.data);
                                                                    this.state.selectedContacts.splice(index, 1);
                                                                }
                                                            }}
                                                            tabIndex={-1}
                                                            disableRipple
                                                            inputProps={{ 'aria-labelledby': labelId }}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText id={labelId} primary={`${data.data}`} />
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        style={{marginLeft: 500}}
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

export default CreateEvent;
