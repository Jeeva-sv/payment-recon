import React from 'react';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
});

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    }
});

class querycheck extends React.Component {
    state = {
        ctx: null,
        accountNumber: null,
        checkNumber: null
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    createHandler = () => {
        //Check form validity
        if(!(this.state.ctx && this.state.accountNumber && this.state.checkNumber)){
            alert('All fields must contain values');
        } else {
            this.props.switchFeedHandler(1)
            this.props.socket.emit('REQUEST', {action: "QUERY", data: this.state})
        }
    }

    render () {
        const { classes } = this.props;

        return (
            <ThemeProvider theme = {theme}>
            <form className='Main-inside' noValidate autoComplete="off">
                <Typography variant='body1'>
                    Query Check
                </Typography>
            <TextField
                label='Action'
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('ctx')}
                margin="normal"
            />
            <TextField
                label='Account'
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('accountNumber')}
                margin="normal"
            />
            <TextField
                label='Check'
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('checkNumber')}
                margin="normal"
            />
            <Button variant="contained"
                    paddingTop={3}
                    color="primary"
                    disabled={!this.props.connected}
                    className={classes.Button}
                    onClick={this.createHandler}>
                {this.props.connected ? "QUERY" : "DISCONNECTED"}
            </Button>
            <p>Please provide the inputs for querying the check</p>
            </form>
            </ThemeProvider>
        );
    }
}

export default withStyles(styles)(querycheck);
