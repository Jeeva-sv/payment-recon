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
    Button: {
        marginTop: 30,
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

class Reissue extends React.Component {
    state = {
        ctx: null,
        issuer: null,
        accountNumber: null,
        checkNumber: null,
        checkStatus: null,
        reissCheckNumber: null,
        reissCheckDate: null,
        checkAmount: null
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    createHandler = () => {
        //Check form validity
        if(!(this.state.ctx && this.state.issuer && this.state.accountNumber && this.state.checkNumber && this.state.checkStatus && this.state.reissCheckNumber && this.state.reissCheckDate && this.state.checkAmount)){
            alert('All fields must contain values');
        } else {
            this.props.switchFeedHandler(1)
            this.props.socket.emit('REQUEST', {action: "REISSUE", data: this.state})
        }
    }

    render () {
        const { classes } = this.props;

        return (
            <ThemeProvider theme = {theme}>
            <form className='Main-inside' noValidate autoComplete="off">
                <Typography variant='body1'>
                    REISSUE
                </Typography>
            <TextField
                label='pay'
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('ctx')}
                margin="normal"
            />
            <TextField
                label='Payer'
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('issuer')}
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
            <TextField
                label='Status'
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('checkStatus')}
                margin="normal"
            />
            <TextField
                label='Reissue Check'
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('reissCheckNumber')}
                margin="normal"
            />
            <TextField
                label='Reiss Date'
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('reissCheckDate')}
                margin="normal"
            />
            <TextField
                label='Amount'
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('checkAmount')}
                margin="normal"
            />
            <Button variant="contained"
                    color="primary"
                    disabled={!this.props.connected}
                    className={classes.Button}
                    onClick={this.createHandler}>
                {this.props.connected ? "REISSUE" : "DISCONNECTED"}
            </Button>
            <p>Reissue Check Payment</p>
            </form>
            </ThemeProvider>
        );
    }
}

export default withStyles(styles)(Reissue);
