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
        marginTop: 30
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

class Issue extends React.Component {
    state = {
        ctx: null,
        issuer: null,
        accountNumber: null,
        checkNumber: null,
        checkStatus: null,
        issueDate: null,
        checkAmount: null,
        paidDate: null,
        reissueCheckNumber: null,
        reissueCheckDate: null,
        payeeId: null,
        payeeName: null,
        newOwner: null
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    createHandler = () => {
        //Check form validity
        if(!(this.state.accountNumber && this.state.checkNumber)){
            alert('All fields must contain values');
        } else {
            this.props.switchFeedHandler(1)
            this.props.socket.emit('REQUEST', {action: "ISSUE", data: this.state})
        }
    }

    render () {
        const { classes } = this.props;

        return (
            <ThemeProvider theme = {theme}>
            <form className='Main-inside' noValidate autoComplete="off">
                <Typography variant='body1'>
                    ISSUING A PAPER CONTRACT
                </Typography>
            <TextField
                label='Issue'
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('ctx')}
                margin="normal"
            />
            <TextField
                label='Issuer'
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('issuer')}
                margin="normal"
            />
            <TextField
                label='accountNumber'
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('accountNumber')}
                margin="normal"
            />
            <TextField
                label='checkNumber'
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('checkNumber')}
                margin="normal"
            />
            <TextField
                label='checkStatus'
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('checkStatus')}
                margin="normal"
            />
            <TextField
                label='issueDate'
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('issueDate')}
                margin="normal"
            />
            <TextField
                label='checkAmount'
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('checkAmount')}
                margin="normal"
            />
            <TextField
                label='paidDate'
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('paidDate')}
                margin="normal"
            />
            <TextField
                label='reissue'
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('reissueCheckNumber')}
                margin="normal"
            />
            <TextField
                label='reissue date'
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('reissueCheckDate')}
                margin="normal"
            />
            <TextField
                label='payeeId'
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('payeeId')}
                margin="normal"
            />
            <TextField
                label='payeeName'
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('payeeName')}
                margin="normal"
            />
            <TextField
                label='newOwner'
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('newOwner')}
                margin="normal"
            />
            <Button variant="contained"
                    color="primary"
                    disabled={!this.props.connected}
                    className={classes.Button}
                    onClick={this.createHandler}>
                {this.props.connected ? "ISSUE" : "DISCONNECTED"}
            </Button>
            <p>Please provide the inputs for issuing the check</p>
            </form>
            </ThemeProvider>
        );
    }
}

export default withStyles(styles)(Issue);
