import React, { Component } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Grid,
  FormHelperText,
  Snackbar
} from "@material-ui/core";
import { User, UserState } from "../../reducers/userReducers";
import PreferencesContainer from "../PreferencesContainer";
import { Dispatch } from "redux";
import { UpdateUserPassword, NewPasswordBody } from "../../actions/userActions";
import { connect } from "react-redux";
import { UserUpdateState } from "../../reducers/userUpdateReducers";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
type Props = {
  updateStates: UserUpdateState;
  updateUserPassword: (body: NewPasswordBody) => any;
};

type State = {
  openSnack: boolean;
  password: string;
  newPassword: string;
  newPasswordConfirm: string;
};

class PasswordUpdate extends Component<Props, State> {
  state = {
    openSnack: false,
    password: "",
    newPassword: "",
    newPasswordConfirm: ""
  };

  onSave = () => {
    const { password, newPassword, newPasswordConfirm } = this.state;
    const { updateUserPassword } = this.props;
    updateUserPassword({ password, newPassword, newPasswordConfirm }).then(
      () => {
        this.setState({ openSnack: true });
      }
    );
  };
  isDisabled = () => {
    const { password, newPassword, newPasswordConfirm } = this.state;
    return (
      !password ||
      !newPassword ||
      !newPasswordConfirm ||
      newPassword !== newPasswordConfirm
    );
  };
  render() {
    const { openSnack, password, newPassword, newPasswordConfirm } = this.state;
    const { updateStates } = this.props;
    return (
      <PreferencesContainer>
        <Grid>
          <form onSubmit={e => e.preventDefault()}>
            <Grid item xs={12} className="form-group-item">
              <FormControl margin="dense">
                <InputLabel htmlFor="currentpassword">
                  Current Password
                </InputLabel>
                <Input
                  id="currentpassword"
                  type="password"
                  name="currentpassword"
                  value={password}
                  onChange={e => this.setState({ password: e.target.value })}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} className="form-group-item">
              <FormControl margin="dense">
                <InputLabel htmlFor="newpassword">New Password</InputLabel>
                <Input
                  id="newpassword"
                  name="newpassword"
                  type="password"
                  value={newPassword}
                  onChange={e => this.setState({ newPassword: e.target.value })}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} className="form-group-item">
              <FormControl margin="dense">
                <InputLabel htmlFor="newpasswordconfirm">
                  New Password Confirm
                </InputLabel>
                <Input
                  id="newpasswordconfirm"
                  name="newpasswordconfirm"
                  type="password"
                  value={newPasswordConfirm}
                  onChange={e =>
                    this.setState({ newPasswordConfirm: e.target.value })
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormHelperText
                hidden={updateStates.error === null}
                component="h1"
                error
              >
                {updateStates.error}
              </FormHelperText>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={this.isDisabled()}
                onClick={this.onSave}
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
              "aria-describedby": "message-id-2"
            }}
            onClose={() => this.setState({ openSnack: false })}
            message={<span id="message-id-2">Password Update!</span>}
          />
        </Grid>
      </PreferencesContainer>
    );
  }
}

const mapStateToProps = (state: any) => ({
  updateStates: state.userUpdate
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateUserPassword: (body: NewPasswordBody) =>
    dispatch(new UpdateUserPassword(body))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordUpdate);
