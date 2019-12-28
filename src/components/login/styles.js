import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    textField: {
        width: '400px',
        margin: '20px auto',
        borderRadius: '20px',
    },

    signIn: {
        width: '230px',
        margin: '20px auto',
        borderRadius: '15px',
    },
    root: {
        backgroundColor: 'white',

        width: '400px',
        margin: '20px auto',
        borderRadius: '15px',
        position: 'absulute 5px 10px',
        opacity: '0.7'

    },
    paproot: {
        paddingTop: '50px',
        backgroundColor: 'white',
        width: '400px',
        margin: '20px auto',
        borderRadius: '15px',
        position: 'absulute 5px 10px',
        opacity: '0.7',
        align: 'center'
    },
    button: {
        position: 'relative',
        marginRight: '150px',
        borderRadius: '15px'
    },
    dialog: {
    },
    diogTit: {
        textAlign: 'center'
    }
}));

