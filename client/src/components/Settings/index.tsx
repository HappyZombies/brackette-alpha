import React, { Component } from "react";
import PreferencesContainer from "../PreferencesContainer";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";
import { User, UserState } from "../../reducers/userReducers";

type Props = {
    user: User;
    userStates: UserState;
};

type State = {
}

class Settings extends Component<State, Props> {
    render() {
        return (
            <PreferencesContainer>
                <form onSubmit={(e) => e.preventDefault()}>
                    <FormControl margin="normal" required>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input id="username" name="username" autoComplete="username" />
                    </FormControl>
                    <FormControl margin="normal" required>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input name="password" type="password" id="password" autoComplete="current-password" />
                    </FormControl>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Save
                    </Button>
                </form>
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



export default Settings;
