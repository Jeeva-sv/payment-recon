import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

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
        localStorage.clear();
        super(props);
        this.state = { username: "", password: "", loginType: "wayneHealth", authflag: 1 };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event, field) {
        if (field === "username") {
            this.setState({ username: event.target.value });
        } else if (field === "password") {
            this.setState({ password: event.target.value });
        } else if (field === "loginType") {
            this.setState({ loginType: event.target.value });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.username === 'admin' && this.state.password === 'admin') {
            localStorage.setItem('USER_DTS', JSON.stringify(this.state));
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
                    <Card variant="outlined">
                        <CardHeader style={{ textAlign: 'center' }}
                            title="Sign In"
                            subheader="Payment Recon"
                        />
                        <CardContent>
                            <form style={{ width: '100%' }} onSubmit={this.handleSubmit} noValidate>
                                <TextField
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
                                <div style={{ paddingTop: "15px" }}></div>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Choose login type</FormLabel>
                                    {/* <RadioGroup aria-label="gender" name="loginType" value={this.state.loginType} onChange={(event) => this.handleChange(event, "loginType")}>
                                        <FormControlLabel value="wayneHealth" control={<Radio />} label="Wayne Health" />
                                        <FormControlLabel value="bankOfGotham" control={<Radio />} label="Bank of Gotham" />
                                        <FormControlLabel value="gothamGH" control={<Radio />} label="Gotham General" />
                                    </RadioGroup> */}
                                    <div className="row" style={{justifyContent:'space-around'}}>
                                        {
                                            this.state.loginType === 'wayneHealth' ?
                                                <div className="col-md-3">
                                                    <div className="row">
                                                        <img src={require('../assets/wayne.png')}
                                                            onClick={() => { this.setState({ loginType: "wayneHealth" }) }}
                                                            style={{ borderRadius: 20, width: "100%", height: "100%", border: "3px solid #3f51b5" }} />
                                                        <img src={require('../assets/tickimg.png')} style={{position: 'absolute',width: "25%", height: "25%",left:'80px', top: '80px', zIndex: 10}} />
                                                    </div>
                                                </div>
                                                :
                                                <div className="col-md-3">
                                                    <div className="row">
                                                        <img src={require('../assets/wayne.png')}
                                                            onClick={() => { this.setState({ loginType: "wayneHealth" }) }}
                                                            style={{ borderRadius: 20, width: "100%", height: "100%" }} />
                                                    </div>
                                                </div>
                                        }
                                        {this.state.loginType === 'bankOfGotham' ?
                                            <div className="col-md-3">
                                                <div className="row">
                                                    <img src={require('../assets/gotham.png')}
                                                        onClick={() => { this.setState({ loginType: "bankOfGotham" }) }}
                                                        style={{ borderRadius: 20, width: "100%", height: "100%", border: "3px solid #3f51b5",position: 'relative' }} />
                                                    <img src={require('../assets/tickimg.png')} style={{position: 'absolute',width: "25%", height: "25%",left:'80px', top: '80px', zIndex: 10}} />
                                                </div>
                                            </div>
                                            :
                                            <div className="col-md-3">
                                                <div className="row">
                                                    <img src={require('../assets/gotham.png')}
                                                        onClick={() => { this.setState({ loginType: "bankOfGotham" }) }}
                                                        style={{ borderRadius: 20, width: "100%", height: "100%" }} />
                                                </div>
                                            </div>
                                        }
                                        {this.state.loginType === 'gothamGH' ?
                                            <div className="col-md-3">
                                                <div className="row">
                                                    <img src={require('../assets/images1.png')}
                                                        onClick={() => { this.setState({ loginType: "gothamGH" }) }}
                                                        style={{ borderRadius: 20, width: "100%", height: "100%", border: "3px solid #3f51b5",position: 'relative' }} />
                                                    <img src={require('../assets/tickimg.png')} style={{position: 'absolute',width: "25%", height: "25%",left:'80px', top: '80px', zIndex: 10}} />
                                                </div>
                                            </div>
                                            :
                                            <div className="col-md-3">
                                                <div className="row">
                                                    <img src={require('../assets/images1.png')}
                                                        onClick={() => { this.setState({ loginType: "gothamGH" }) }}
                                                        style={{ borderRadius: 20, width: "100%", height: "100%" }} />
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </FormControl>
                                <div style={{ paddingTop: "15px" }}></div>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                >
                                    Sign In
                                </Button>
                                <div style={{ paddingTop: "15px" }}></div>
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
                            </form>
                        </CardContent>
                    </Card>
                </div>
                {/*<Box mt={8}>
                    <Copyright />
                </Box>*/}
            </Container>
        );
    }
}
export default Login;