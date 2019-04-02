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
import { Link, Redirect } from "react-router-dom";
import { mdiLock, mdiLoading } from "@mdi/js";
import Icon from "@mdi/react";
import axios, { AxiosError } from "axios";

import store from "store";

import { TOKEN } from "../../utils/Constants";

import "./styles.css";

interface LoginData {
  accessToken: string;
}
class Login extends Component {
  state = {
    username: "",
    password: "",
    errorHidden: true,
    errorMessage: "",
    loginPending: false
  };
  isDisabled = () => {
    const { username, password, loginPending } = this.state;
    return loginPending || !username || !password;
  };

  onButtonClick = () => {
    const { username, password } = this.state;
    this.setState({ error: false, errorMessage: "", loginPending: true });

    axios
      .post<LoginData>("/users/login", { username, password })
      .then(res => {
        store.set(TOKEN, res.data.accessToken);
        this.setState({ loginPending: false });
      })
      .catch((e: AxiosError) => {
        if (e.response) {
          this.setState({
            errorHidden: false,
            errorMessage: e.response.data.message,
            loginPending: false
          });
        }
      });
  };

  render() {
    const {
      errorHidden,
      errorMessage,
      username,
      password,
      loginPending
    } = this.state;
    if (store.get(TOKEN)) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="login-wrapper">
        <Paper className="login-paper">
          <Icon path={mdiLock} size={1.2} />
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <form onSubmit={e => e.preventDefault()}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                id="username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={e => this.setState({ username: e.target.value })}
                autoFocus
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
              {!loginPending ? (
                "Log In"
              ) : (
                <Icon path={mdiLoading} size={1.5} spin={0.8} />
              )}
            </Button>
          </form>
          <br />
          <Typography component="i" paragraph>
            Don't have an account? <Link to="/register">Register</Link>
          </Typography>
        </Paper>
      </div>
    );
  }
}

export default Login;
