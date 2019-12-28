import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useStyles } from "./styles";

const NavBar = (props) => {
  const handleAddContact = popupState => {
    props.history.push("/add-contact");
  };
  const handleCreateMeeting = popupState => {
    props.history.push("/create-meeting");
  };
  const handleDisplayEvent = popupState => {
    props.history.push("/display-events");
  };

  const logout = () => {
    localStorage.setItem("token", "");
    props.history.replace("/", "logoutState");
  };
  const classes = useStyles();

  return (
    <div>
      <AppBar
        position="static"
          classes={{
            root: classes.root
        }}
      >
        <Toolbar>
          <PopupState variant="popover" popupId="demo-popup-menu">
            {popupState => (
              <React.Fragment>
                {
                <Button {...bindTrigger(popupState)}>
                  <MenuIcon
                    classes={{
                      root: classes.menuIconRoot
                    }}
                  />
                </Button>
                }
                {
                <Menu {...bindMenu(popupState)} >
                  <MenuItem onClick={handleAddContact}>Add New Contact</MenuItem>
                  <MenuItem onClick={handleCreateMeeting}>Create a Meeting</MenuItem>
                  <MenuItem onClick={handleDisplayEvent}>Display Events</MenuItem>
                </Menu>
                }
              </React.Fragment>
            )}
          </PopupState>

            <Typography variant="h6" className={classes.title} color="inherit">
              Event Arranger
            </Typography>
            {
            <Button
                classes={{
                  root: classes.buttonRoot,
                  label: classes.pinkButtonLabel
                }}
                onClick={logout}
            >
              LOGOUT
            </Button>
            }
          </Toolbar>
        </AppBar>
      </div>
  );
};
export default NavBar;
