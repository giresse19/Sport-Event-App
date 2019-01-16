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
              finishRunner={finishRunner}
              startRunner={startRunner}
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
  let offset = 0;
  return {
    login: ([runnerStart]) => {
      runnerStart.forEach((runner) => {
        setTimeout(() => {
          console.log("individual runner", runner)
          dispatch(login(runner))
        }, 5000 + offset);
        offset += 5000;
      })
    },

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


/*

      return {
    login: ([runnerStart]) => {
      runnerStart.forEach((runner) => {
        console.log("individual runner", runner)
        dispatch(login(runner))
      },
      )
    },

    */