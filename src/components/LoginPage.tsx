import React from 'react';
import {connect} from 'react-redux';
import { startLogin } from "../actions/auth";
import {Dispatch} from "redux";

const LoginPage = ({ startLogin }: any) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Boilerplate</h1>
      <p>Tagline for app.</p>
      <button onClick={startLogin} className="button">Login with Google</button>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch: Dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);