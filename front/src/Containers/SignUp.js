import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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

class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = { firstName: "", lastName: "", username: "", email: "", password: "", authflag: 1 };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, field) {
    if (field == "firstName") {
      this.setState({ firstName: event.target.value });
    } else if (field == "lastName") {
      this.setState({ lastName: event.target.value });
    } else if (field == "username") {
      this.setState({ username: event.target.value });
    } else if (field == "email") {
      this.setState({ email: event.target.value });
    } else if (field == "password") {
      this.setState({ password: event.target.value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    alert('Account created successfully..! Login to continue...');
    this.props.history.push("/login");
  }

  navigateToLogin(event) {
    event.preventDefault();
    this.props.history.push("/login");
  }

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div style={{ paddingTop: "100px" }}>
          <Typography style={{ textAlign: "center", paddingBottom: "20px" }} component="h1" variant="h5">
            Sign up
            </Typography>
          <form style={{ width: "100%" }} onSubmit={this.handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(event) => this.handleChange(event, "firstName")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={(event) => this.handleChange(event, "lastName")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="username"
                  onChange={(event) => this.handleChange(event, "username")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(event) => this.handleChange(event, "email")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(event) => this.handleChange(event, "password")}
                />
              </Grid>
            </Grid>
            <br></br>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign Up
              </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" onClick={(event) => this.navigateToLogin(event)} variant="body2">
                  Already have an account? Sign in
                  </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}
export default Signup;