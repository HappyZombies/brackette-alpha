import React, { Component } from "react";
import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Input,
  Icon,
  FormControlLabel,
  Checkbox,
  Avatar,
  Button
} from "@material-ui/core";
import { Link } from 'react-router-dom';

import "./styles.css";

class Login extends Component {
  render() {
    return (
      <div className="login-wrapper">
        <Paper className="login-paper">
          <Avatar>
            <Icon className="fa fa-lock" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <form>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" />
            </FormControl>
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Sign in
            </Button>
          </form>
          <br />
          <Typography component="i" paragraph>Don't have an account? <Link to="/register">Register</Link></Typography>
        </Paper>
      </div>
    );
  }
}

export default Login;
