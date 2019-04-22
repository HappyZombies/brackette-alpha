import React, { Component } from "react";
import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Input,
  FormControlLabel,
  Checkbox,
  Button,
  FormHelperText
} from "@material-ui/core";
import { mdiAccount, mdiLoading } from "@mdi/js";
import Icon from "@mdi/react";
import { Link, Redirect } from "react-router-dom";
import axios, { AxiosError } from "axios";
import store from "store";

interface RegisterData {
  message: string;
  accessToken: string;
}

import "./styles.css";
import { TOKEN } from "../../utils/Constants";

class Register extends Component {
  state = {
    email: "",
    username: "",
    name: "",
    password: "",
    passwordConfirm: "",
    token: "",
    errorHidden: true,
    errorMessage: "",
    registerPending: false
  };

  isDisabled = () => {
    const {
      email,
      username,
      password,
      passwordConfirm,
      name,
      registerPending,
      token
    } = this.state;
    return (
      registerPending ||
      !email ||
      !username ||
      !password ||
      !passwordConfirm ||
      !name ||
      !token
    );
  };

  onButtonClick = () => {
    const {
      email,
      username,
      password,
      passwordConfirm,
      name,
      token
    } = this.state;
    this.setState({ error: false, errorMessage: "", registerPending: true });

    if (password !== passwordConfirm) {
      this.setState({
        errorHidden: false,
        errorMessage: "Passwords do not match."
      });
      return;
    }

    axios
      .post<RegisterData>("api/users/register", {
        email,
        username,
        password,
        displayName: name,
        token
      })
      .then(res => {
        store.set(TOKEN, res.data.accessToken);
        this.setState({ registerPending: false });
      })
      .catch((e: AxiosError) => {
        if (e.response) {
          this.setState({
            errorHidden: false,
            errorMessage: e.response.data.message,
            registerPending: false
          });
        }
      });
  };

  render() {
    const {
      email,
      username,
      password,
      name,
      passwordConfirm,
      token,
      errorHidden,
      errorMessage,
      registerPending
    } = this.state;
    if (store.get(TOKEN)) {
      return <Redirect to="/" />;
    }
    return (
      <div className="register-wrapper">
        <Paper className="register-paper">
          <Icon path={mdiAccount} size={1.2} />
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form onSubmit={e => e.preventDefault()}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                id="name"
                name="name"
                value={name}
                autoFocus
                onChange={e => this.setState({ name: e.target.value })}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                type="email"
                value={email}
                onChange={e => this.setState({ email: e.target.value })}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                id="username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={e => this.setState({ username: e.target.value })}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={e => this.setState({ password: e.target.value })}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Confirm Password</InputLabel>
              <Input
                name="confirm-password"
                type="password"
                id="confirm-password"
                autoComplete="current-password"
                value={passwordConfirm}
                onChange={e =>
                  this.setState({ passwordConfirm: e.target.value })
                }
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="token">Token</InputLabel>
              <Input
                id="token"
                name="token"
                autoComplete="token"
                value={token}
                onChange={e => this.setState({ token: e.target.value })}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <FormHelperText
              hidden={errorHidden}
              component="h1"
              className="form-error"
              error
            >
              {errorMessage}
            </FormHelperText>
            <Button
              type="submit"
              fullWidth
              disabled={this.isDisabled()}
              variant="contained"
              color="primary"
              onClick={this.onButtonClick}
            >
              {!registerPending ? (
                "Register"
              ) : (
                <Icon path={mdiLoading} size={1.5} spin={0.8} />
              )}
            </Button>
          </form>
          <br />
          <Typography component="i" paragraph>
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </Paper>
      </div>
    );
  }
}

export default Register;
