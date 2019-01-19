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

import { login, loginFinal } from './actions';

// eslint-disable-next-line react/prefer-stateless-function
export class MainPage extends React.Component {
  render() {
    const { startRunner, finishRunner } = this.props.mainPage;

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
  let interval= 1000

  return {
    login: ([runnerStart]) => {
      runnerStart.forEach(runner => {
        setTimeout(() => {
          dispatch(login(runner));
        }, interval + offset);
        offset += interval;
      });
    },

    loginFinal: ([runnersFinal]) => {
      runnersFinal.forEach(runner => {
        setTimeout(() => {
          dispatch(loginFinal(runner));
        }, interval + offset);
        offset += interval;
      });
    },
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
