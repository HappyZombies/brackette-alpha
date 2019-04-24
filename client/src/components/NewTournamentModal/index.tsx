import React from "react";
import {
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Radio,
  TextField,
  RadioGroup,
  FormControlLabel,
  MobileStepper
} from "@material-ui/core";
import { Hosters } from "../../reducers/tournamentReducers";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { CreateTournament } from "../../actions/tournamentActions";
import { SelectTournament } from "./../../actions/tournamentActions";
import { withRouter } from "react-router";

function Transition(props: any) {
  return <Slide direction="up" {...props} />;
}
type Steps = {
  CHALLONGE: any[];
  SMASHGG: any[];
};
type Props = {
  open: boolean;
  toggleModal: () => void;
  createNewTournament: (body: any) => any;
  selectTournament: (id: string) => any;
};
type State = {
  hoster: string;
  tournamentId: string;
  nickname: string;
  currentStep: number;
  subdomain: string;
};
const initialState: State = {
  hoster: "",
  tournamentId: "",
  nickname: "",
  subdomain: "",
  currentStep: 0
};
// starting at 0...
const MAX_STEPS = 1;

class NewTournamentModal extends React.Component<Props, State> {
  state = initialState;
  steps: Steps = {
    CHALLONGE: [],
    SMASHGG: []
  };

  constructor(props: Props) {
    super(props);
    this.steps = {
      CHALLONGE: [null, this.challongeStep2()],
      SMASHGG: [null, <p>Not Yet</p>]
    };
  }

  challongeStep2 = () => {
    const { tournamentId, subdomain, nickname } = this.state;
    return (
      <DialogContent>
        <DialogContentText>
          Enter the Challonge Tournament ID and give it a nickname. Optionally,
          give it a subdomain if it has one.
          <br />
          <br /> NOTE: The subdomain MUST be provided if the API Key provided is
          linked to a tournament with a subdomain, else it will NOT work.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="tournamentId"
          label="Tournament ID"
          type="text"
          value={tournamentId}
          onChange={(e: any) => this.setState({ tournamentId: e.target.value })}
          fullWidth
        />
        <TextField
          margin="dense"
          id="nickname"
          label="Nick Name"
          type="text"
          value={nickname}
          onChange={(e: any) => this.setState({ nickname: e.target.value })}
          fullWidth
        />
        <TextField
          margin="dense"
          id="subdomain"
          label="Subdomain (Optional)"
          type="text"
          value={subdomain}
          onChange={(e: any) => this.setState({ subdomain: e.target.value })}
          fullWidth
        />
      </DialogContent>
    );
  };

  defaultError = (message: string = "Error dispalying the step!") => (
    <DialogContent>
      <DialogContentText color="error">{message}</DialogContentText>
    </DialogContent>
  );

  renderStep = () => {
    const { currentStep, hoster } = this.state;
    if (hoster === "CHALLONGE") {
      switch (currentStep) {
        case 1:
          return this.challongeStep2();
        default:
          return this.defaultError("Missing step found for Challonge!");
      }
    } else if (hoster === "SMASHGG") {
      return this.defaultError("Unsupported.");
    }
    return this.defaultError();
  };

  nextStep = () => this.setState({ currentStep: this.state.currentStep + 1 });
  prevStep = () => this.setState({ currentStep: this.state.currentStep - 1 });
  onSubmit = () => {
    // @ts-ignore
    const { createNewTournament, history, match } = this.props;
    const { subdomain, tournamentId, nickname, hoster } = this.state;
    createNewTournament({ nickname, tournamentId, subdomain, hoster }).then(
      (data: any) => {
        this.onClose();
        history.push(`${match.url}/t/${data.value.newTournament}`);
      }
    );
  };

  onClose = () => {
    this.setState(initialState);
    this.props.toggleModal();
  };

  render() {
    const { currentStep, hoster, tournamentId, nickname } = this.state;
    return (
      <Dialog
        open={this.props.open}
        TransitionComponent={Transition}
        onClose={this.onClose}
        aria-labelledby="form-dialog-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="form-dialog-title">Create Tournament</DialogTitle>
        {currentStep === 0 ? (
          <DialogContent>
            <DialogContentText>
              What platform is this tournament running on?
            </DialogContentText>
            <RadioGroup
              value={hoster}
              onChange={(e: any) => this.setState({ hoster: e.target.value })}
            >
              <FormControlLabel
                value="CHALLONGE"
                control={<Radio />}
                label="Challonge"
              />
              <FormControlLabel
                value="SMASHGG"
                disabled
                control={<Radio />}
                label="Smashgg"
              />
              <FormControlLabel
                value="BRACKETTE"
                disabled
                control={<Radio />}
                label="Brackette RR"
              />
            </RadioGroup>
          </DialogContent>
        ) : (
          this.renderStep()
        )}
        <MobileStepper
          variant="progress"
          steps={MAX_STEPS + 1}
          position="static"
          activeStep={currentStep}
          nextButton={
            currentStep === MAX_STEPS ? (
              <Button
                size="small"
                onClick={this.onSubmit}
                disabled={!tournamentId || !nickname}
              >
                Submit
              </Button>
            ) : (
              <Button size="small" onClick={this.nextStep} disabled={!hoster}>
                Next
              </Button>
            )
          }
          backButton={
            <Button
              size="small"
              onClick={this.prevStep}
              disabled={currentStep === 0}
            >
              Back
            </Button>
          }
        />
      </Dialog>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createNewTournament: (body: any) => dispatch(new CreateTournament(body)),
  selectTournament: (id: string) => dispatch(new SelectTournament(id))
});

export default withRouter(
  //@ts-ignore
  connect(
    null,
    mapDispatchToProps
  )(NewTournamentModal)
);
