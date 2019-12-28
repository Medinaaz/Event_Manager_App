import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    title: {
      flexGrow: 1
    },
    pinkAppBarRoot: {
      background:
          "linear-gradient(45deg, #F06292 10%, #CE93D8 30%, #F48FB1 70%)",
      color: "white"
    },
  
    pinkButtonRoot: {
      background: "#F8BBD0",
      borderRadius: 3,
      border: 0,
      color: "white",
      height: 48,
      padding: "0 30px",
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
    },
    pinkButtonLabel: {
      textTransform: "capitalize"
    },
  
    buttonRoot: {
      borderRadius: 3,
      border: 0,
      color: "white",
      height: 48,
      padding: "0 30px",
    },
  
    menuIconRoot: {
      color: "white"
    },
  
  }));
  