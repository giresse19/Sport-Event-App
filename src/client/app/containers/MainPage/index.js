/**
 *
 * MainPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { Switch, Route, Redirect } from 'react-router-dom';

import Welcome from 'components/Welcome';
import Runners from 'components/Runners';

import injectSaga from 'utils/injectSaga';
import makeSelectMainPage from './selectors';
import saga from './saga';

import {
  login,
  loginFinal,

} from './actions';

export class MainPage extends React.Component {

  render() {

    const {
      startRunner,
      finishRunner,
    } = this.props.mainPage;

    return (
      <Switch>
        <Redirect exact from="/" to="/welcome" />
        <Route
          path="/welcome"
          render={props => (
            <Welcome
              historyPush={this.props.history.push}
              login={this.props.login}
              loginFinal={this.props.loginFinal}
              {...props}
            />
          )}
        />
        <Route
          path="/runners"
          render={props => (
            <Runners
              startRunner={startRunner}
              finishRunner={finishRunner}
              {...props}
            />
          )}
        />
      </Switch>
    );
  }
}

MainPage.propTypes = {
  mainPage: PropTypes.shape({
    startRunner: PropTypes.object,
    finishRunner: PropTypes.object,
  }),

  login: PropTypes.func,
  loginFinal: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

const mapStateToProps = createStructuredSelector({
  mainPage: makeSelectMainPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    login: (runnerStart) => dispatch(login(runnerStart)),
    loginFinal: (runnersFinal) => dispatch(loginFinal(runnersFinal)),

  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'mainPage', saga });

export default withRouter(
  compose(
    withSaga,
    withConnect,
  )(MainPage),
);
