import React, { Component } from "react";
import store from "store";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

import { TOKEN } from "../../utils/Constants";
import { ValidateUser } from "../../actions/userActions";
import { User, UserState } from "../../reducers/userReducers";

import "./styles.css";
import Loading from "./../Loading/index";

type Props = {
  user: User;
  validateUser: (jwt: string) => any;
  userStates: UserState;
};

type State = {};

export function withAuth(AuthComponent: any) {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    class AuthWrapper extends Component<Props, State> {
      readonly jwt: string = store.get(TOKEN);
      componentDidMount() {
        this.props.validateUser(this.jwt);
      }
      render() {
        const { pending, error, user } = this.props.userStates;
        if (pending) {
          return <Loading />;
        }
        if (!this.jwt || error || !user) {
          return <Redirect to="login" />;
        }
        return <AuthComponent />;
      }
    }
  );
}

const mapStateToProps = (state: any) => ({
  userStates: state.user
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  validateUser: (jwt: string) => dispatch(new ValidateUser(jwt))
});
