import React, { Component } from "react";
import { Dispatch } from "redux";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Grid,
  FormHelperText
} from "@material-ui/core";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import Snackbar from "@material-ui/core/Snackbar";
import { connect } from "react-redux";
import { User, UserState } from "../../reducers/userReducers";
import PreferencesContainer from "../PreferencesContainer";
import { UpdateUser, QuickValidateUser } from "../../actions/userActions";
import { authAxios } from "../../utils";
import { AxiosResponse } from "axios";
import { UserUpdateState } from "../../reducers/userUpdateReducers";

type Props = {
  user: User;
  userStates: UserState;
  updateStates: UserUpdateState;
  updateUser: (body: any) => any;
  validateUser: (jwt: string) => any;
};

type State = {
  username: string;
  displayName: string;
  usernameError: boolean;
  openSnack: boolean;
};

class Settings extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: props.user ? props.user.username : "",
      displayName: props.user ? props.user.displayName : "",
      usernameError: false,
      openSnack: false
    };
  }
  onSave = () => {
    const { username, displayName } = this.state;
    const { user, updateUser, validateUser } = this.props;
    this.setState({ usernameError: false });
    // username is same, simply update displayname.
    if (username === user.username) {
      updateUser({ displayName }).then((data: any) => {
        validateUser(data.value.token);
        this.setState({ openSnack: true });
      });
      return;
    }
    authAxios
      .get(`/users/${username}/taken`)
      .then(() => {
        updateUser({ username, displayName }).then((data: any) => {
          validateUser(data.value.token);
          this.setState({ openSnack: true });
        });
      })
      .catch((err: AxiosResponse) => {
        this.setState({ usernameError: true });
      });
  };
  render() {
    const { username, displayName, usernameError, openSnack } = this.state;
    const { user, updateStates } = this.props;
    return (
      <PreferencesContainer>
        <Grid>
          <form onSubmit={e => e.preventDefault()}>
            <Grid item xs={12} className="form-group-item">
              <FormControl margin="dense">
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={user.email}
                  disabled
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} className="form-group-item">
              <FormControl margin="dense">
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  onChange={e => this.setState({ username: e.target.value })}
                  value={username}
                />
                <FormHelperText
                  hidden={!usernameError}
                  component="h1"
                  className="form-error"
                  error
                >
                  This username is already taken.
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} className="form-group-item">
              <FormControl margin="dense">
                <InputLabel htmlFor="name">Display Name</InputLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  onChange={e => this.setState({ displayName: e.target.value })}
                  value={displayName}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={this.onSave}
                disabled={updateStates.pending}
                type="submit"
                variant="contained"
                color="primary"
              >
                {!updateStates.pending ? (
                  "Save"
                ) : (
                  <Icon path={mdiLoading} size={1.5} spin={0.8} />
                )}
              </Button>
            </Grid>
          </form>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={openSnack}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            onClose={() => this.setState({ openSnack: false })}
            message={<span id="message-id">Settings Saved!</span>}
          />
        </Grid>
      </PreferencesContainer>
    );
  }
}

const mapStateToProps = (state: any) => ({
  userStates: state.user,
  user: state.user.user,
  updateStates: state.userUpdate
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateUser: (body: any) => dispatch(new UpdateUser(body)),
  validateUser: (jwt: string) => dispatch(new QuickValidateUser(jwt))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
