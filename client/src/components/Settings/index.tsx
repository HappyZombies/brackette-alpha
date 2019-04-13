import React, { Component } from "react";
import PreferencesContainer from "../PreferencesContainer";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Grid
} from "@material-ui/core";
import { User, UserState } from "../../reducers/userReducers";

type Props = {
  user: User;
  userStates: UserState;
};

type State = {};

class Settings extends Component<State, Props> {
  render() {
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
                  value={"Some@hotmail.com"}
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
                  value={"something"}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} className="form-group-item">
              <FormControl margin="dense">
                <InputLabel htmlFor="name">Display Name</InputLabel>
                <Input id="name" name="name" type="text" value={"Some Name"} />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </Grid>
          </form>
        </Grid>
      </PreferencesContainer>
    );
  }
}

// const mapStateToProps = (state: any) => ({
//     userStates: state.user
// });

// const mapDispatchToProps = (dispatch: Dispatch) => ({
//     validateUser: (jwt: string) => dispatch(new ValidateUser(jwt))
// })

export default Settings;