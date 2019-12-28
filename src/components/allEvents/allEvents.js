import React, {Fragment} from 'react';
import MaterialTable from 'material-table';
import NavBar from "../nav-bar/navigationBar";
import {Paper} from "@material-ui/core";
import Logo from  "./avatar.png"
import axios from "axios";
import config from "../../config";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Email from "@material-ui/icons/Email";
import Message from "@material-ui/icons/Message";
import { forwardRef } from 'react';
import Button from "@material-ui/core/Button";

const tableIcons = {
    Message: forwardRef((props, ref) => <Message {...props} ref={ref} />),
    Email: forwardRef((props, ref) => <Email {...props} ref={ref}/>)
};

class AllEvents extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            sms: false,
            email: false,
            columns: [
                {title: 'Event Organizer', field: 'creator'},
                {title: 'Venue Name', field: 'venue'},
                {title: 'Event Name', field: 'title'},
                {title: 'Time', field: 'time'},
                {title: 'Date', field: 'date'},
                {title: 'Invited People', field: 'invitedPeople'}
            ],
            rowData:[]
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: config.USER_URL + localStorage.getItem("username"),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("userToken")
            }
        }).
        then((res) => {
            console.log(res.data.data);
            let eventsData = [];

            for(let i = 0; i < res.data.data.length; i++){
                let first = {};

                first.creator = res.data.data[i].creator;
                first.title = res.data.data[i].title;
                first.date = res.data.data[i].date;
                first.time = res.data.data[i].time;
                first.venue = res.data.data[i].venue;
                first.invitedPeople = res.data.data[i].invitedPeople[0];
                console.log("first", first);

                eventsData.push(first);
            }
            console.log("eventsData", eventsData);

            this.setState({data: eventsData});
            console.log(this.state);
        }).
        catch((err) => {
            console.log("err", err);
        });
    }

    handleSmsOpen = () => {
        this.setState({sms: true})
    };

    handleSmsClose = () => {
        this.setState({sms: false})
    };

    handleEmailOpen = () => {
        this.setState({email: true})
    };

    handleEmailClose = () => {
        this.setState({email: false})
    };

    handleSmsSend = () => {
        console.log(this.state.rowData);

        axios({
            method: 'post',
            url: config.SEND_SMS,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("userToken")
            },
            data: this.state.rowData
        }).
        then((res) => {
            if (res.data.success) {
                alert("Successfully sent sms")
            }}).
        catch((err) => {
            console.log("err", err);
        });

        this.setState({sms: false})
    };

    handleEmailSend = () => {
        console.log(this.state.rowData);

        axios({
            method: 'post',
            url: config.SEND_EMAIL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("userToken")
            },
            data: this.state.rowData
        }).
        then((res) => {
            console.log(res);
            if (res.data.data.success) {
                alert("Successfully sent email")
            }}).
        catch((err) => {
            console.log("err", err);
        });

        this.setState({email: false})
    };

    render() {
        return (
            <Fragment>
                <NavBar history={this.props.history}/>
                <Dialog
                    open={this.state.sms}
                    onClose={this.handleSmsClose}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                        Send SMS Invitation
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                           Are you sure that you want to send an SMS invitation?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={this.handleSmsClose} color="primary">
                            No
                        </Button>
                        <Button onClick={this.handleSmsSend} color="primary">
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.email}
                    onClose={this.handleEmailClose}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                        Send Email Invitation
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure that you want to send an Email invitation?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={this.handleEmailClose} color="primary">
                            No
                        </Button>
                        <Button onClick={this.handleEmailSend} color="primary">
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>

                <Paper variant="outlined" style={{
                    backgroundColor: "#b3e5fc",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: 40,
                    width: 900,
                    height: 700,
                    padding: 16
                }}>
                    <img src={Logo} alt="Example" width="64" height="64"/>
                    <MaterialTable
                        title="Events"
                        columns={this.state.columns}
                        data={this.state.data}
                        icons={tableIcons}
                        actions={
                            [
                                {
                                    icon: tableIcons.Message,
                                    tooltip: "Send SMS",
                                    isFreeAction: false,
                                    onClick: (event, rowData) => {
                                        {
                                            this.handleSmsOpen();
                                            this.setState({rowData: rowData})
                                        }
                                    }
                                },
                                {
                                    icon: tableIcons.Email,
                                    tooltip: "Send Email",
                                    isFreeAction: false,
                                    onClick: (event, rowData) => {
                                        {
                                            this.handleEmailOpen();
                                            this.setState({rowData: rowData})
                                        }
                                    }
                                }
                            ]
                        }
                    />
                </Paper></Fragment>)
    }
}
export default AllEvents;
