import React, { Component } from "react";
import store from "store";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { TOKEN } from "../../utils/constants";
import { ValidateUser } from "../../actions/userActions";

import "./styles.css";
import Loading from "./../Loading/index";

export function withAuth(AuthComponent) {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    class AuthWrapper extends Component {
      jwt = store.get(TOKEN);
      componentDidMount() {
        this.props.validateUser(this.jwt);
      }
      render() {
        const { pending, error, user } = this.props.userStates;
        if (pending) {
          return <Loading />;
        }
        if (!this.jwt || error || !user) {
          return <Redirect to="/login" />;
        }
        return <AuthComponent />;
      }
    }
  );
}

const mapStateToProps = state => ({
  userStates: state.user
});

const mapDispatchToProps = dispatch => ({
  validateUser: jwt => dispatch(new ValidateUser(jwt))
});
