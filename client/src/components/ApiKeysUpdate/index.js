import React, { Component } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Grid,
  Snackbar
} from "@material-ui/core";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { mdiLoading } from "@mdi/js";
import Icon from "@mdi/react";
import PreferencesContainer from "../PreferencesContainer";
import { UpdateUser, QuickValidateUser } from "../../actions/userActions";

class ApiKeysUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challongeKey:
        props.user && props.user.challongeKey ? props.user.challongeKey : "",
      smashggKey:
        props.user && props.user.smashggKey ? props.user.smashggKey : "",
      openSnack: false
    };
  }

  onSave = () => {
    const { challongeKey, smashggKey } = this.state;
    const { updateUser, validateUser } = this.props;
    updateUser({ challongeKey, smashggKey }).then(data => {
      validateUser(data.value.token);
      this.setState({ openSnack: true });
    });
  };
  render() {
    const { challongeKey, smashggKey, openSnack } = this.state;
    const { updateStates } = this.props;
    return (
      <PreferencesContainer>
        <Grid>
          <form onSubmit={e => e.preventDefault()}>
            <Grid item xs={12} className="form-group-item">
              <FormControl margin="dense">
                <InputLabel htmlFor="challongeApi">Challonge API</InputLabel>
                <Input
                  id="challongeApi"
                  type="text"
                  onChange={e =>
                    this.setState({ challongeKey: e.target.value })
                  }
                  name="challongeApi"
                  value={challongeKey}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} className="form-group-item">
              <FormControl margin="dense">
                <InputLabel htmlFor="smashggApi">Smash.gg API</InputLabel>
                <Input
                  id="smashggApi"
                  name="smashggApi"
                  onChange={e => this.setState({ smashggKey: e.target.value })}
                  type="text"
                  value={smashggKey}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} className="form-group-item">
              <InputLabel>Click here to learn how to get these.</InputLabel>
              <br />
              <InputLabel>
                Note: The API keys will not be validated here. Make sure they're
                right!
              </InputLabel>
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
                  "Update API Keys"
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
            message={<span id="message-id">API Keys Saved!</span>}
          />
        </Grid>
      </PreferencesContainer>
    );
  }
}

const mapStateToProps = state => ({
  userStates: state.user,
  user: state.user.user,
  updateStates: state.userUpdate
});

const mapDispatchToProps = dispatch => ({
  updateUser: body => dispatch(new UpdateUser(body)),
  validateUser: jwt => dispatch(new QuickValidateUser(jwt))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApiKeysUpdate);
