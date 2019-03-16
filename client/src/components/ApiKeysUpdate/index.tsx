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

class ApiKeysUpdate extends Component<State, Props> {
    render() {
        return (
            <PreferencesContainer>
                <Grid>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <Grid item xs={12} className="form-group-item">
                            <FormControl margin="dense">
                                <InputLabel htmlFor="challongeApi">Challonge API</InputLabel>
                                <Input id="challongeApi" type="text" name="challongeApi" value={"challongeApi"} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} className="form-group-item">
                            <FormControl margin="dense">
                                <InputLabel htmlFor="smashggApi">Smash.gg API</InputLabel>
                                <Input id="smashggApi" name="smashggApi" type="text" value={"smashggApi"} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} className="form-group-item">
                            <InputLabel>Click here to learn how to get these.</InputLabel>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Update API Keys
                            </Button>
                        </Grid>
                    </form>
                </Grid>
            </PreferencesContainer>
        )
    }
}

export default ApiKeysUpdate;
