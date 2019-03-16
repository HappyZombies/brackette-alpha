import React, { Component } from "react";
import PreferencesContainer from "../PreferencesContainer";
import { FormControl, InputLabel, Input, Button, Grid } from "@material-ui/core";
import { User, UserState } from "../../reducers/userReducers";

type Props = {
    user: User;
    userStates: UserState;
};

type State = {
}

class PasswordUpdate extends Component<State, Props> {
    render() {
        return (
            <PreferencesContainer>
                <Grid>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <Grid item xs={12} className="form-group-item">
                            <FormControl margin="dense">
                                <InputLabel htmlFor="currentpassword">Current Password</InputLabel>
                                <Input id="currentpassword" type="password" name="currentpassword" value={"currentpassword"} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} className="form-group-item">
                            <FormControl margin="dense">
                                <InputLabel htmlFor="newpassword">New Password</InputLabel>
                                <Input id="newpassword" name="newpassword" type="password" value={"newpassword"} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} className="form-group-item">
                            <FormControl margin="dense">
                                <InputLabel htmlFor="newpasswordconfirm">New Password Confirm</InputLabel>
                                <Input id="newpasswordconfirm" name="newpasswordconfirm" type="password" value={"newpasswordconfirm"} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Change Password
                            </Button>
                        </Grid>
                    </form>
                </Grid>
            </PreferencesContainer>
        )
    }
}

// const mapStateToProps = (state: any) => ({
//     userStates: state.user
// });

// const mapDispatchToProps = (dispatch: Dispatch) => ({
//     validateUser: (jwt: string) => dispatch(new ValidateUser(jwt))
// })



export default PasswordUpdate;
