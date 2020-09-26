import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = { username: "", password: "", authflag: 1 };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event, field) {
        if (field == "username") {
            this.setState({ username: event.target.value });
        } else if (field == "password") {
            this.setState({ password: event.target.value });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.username == 'admin' && this.state.password == 'admin') {
            this.props.history.push("/landing");
        } else {
            alert('Incorrect Credentials!');
        }
    }

    navigateToSignUp(event) {
        event.preventDefault();
        this.props.history.push("/signup");
    }

    render() {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div style={{ paddingTop: "100px" }}>
                    <Typography style={{ textAlign: "center" }} component="h1" variant="h5">
                        Sign In
                    </Typography>
                    <form style={{ width: '100%' }} onSubmit={this.handleSubmit} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={(event) => this.handleChange(event, "username")}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(event) => this.handleChange(event, "password")}
                        />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                >
                                    Wayne Health
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                >
                                    Bank of Gotham
                                </Button>
                            </Grid><Grid item xs={12} sm={4}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                >
                                    Gotham General
                                </Button>
                            </Grid>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" onClick={(event) => this.navigateToSignUp(event)} variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        );
    }
}
export default Login;