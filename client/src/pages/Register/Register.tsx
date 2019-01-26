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

class Register extends Component {
    render() {
        return (
            <div className="register-wrapper">
                <Paper className="register-paper">
                    <Avatar>
                        <Icon>person</Icon>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
          </Typography>
                    <form>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input id="email" name="email" autoComplete="email" autoFocus />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input id="username" name="username" autoComplete="username" />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="current-password" />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Confirm Password</InputLabel>
                            <Input name="confirm-password" type="password" id="confirm-password" autoComplete="current-password" />
                        </FormControl>
                        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            Register
                        </Button>
                    </form>
                    <br />
                    <Typography component="i" paragraph>Already have an account? <Link to="/login">Login</Link></Typography>
                </Paper>
            </div>
        );
    }
}

export default Register;
