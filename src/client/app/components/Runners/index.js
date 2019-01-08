/**
 *
 * Runners
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { List } from "react-virtualized";
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from 'components/Header';
import Loading from 'components/01-ui/Loading';
import CenteringContainer from 'components/01-ui/CenteringContainer';
import Button from 'components/01-ui/Button';

import Wrapper from './styled/Wrapper';
import BodyWrap from './styled/BodyWrap';
import MainWrap from './styled/MainWrap';

class Runners extends React.Component {

  componentDidMount() {
    let runners = this.props;
    let crossLineRunner = this.props;
    console.log("runner mounted", runners.startRunner);
    console.log("runner mounted", crossLineRunner);
  }

  render() {

    const {
      startRunner,
      finishRunner,
    } = this.props

    let runners = startRunner;
      let crossLineRunner = finishRunner;
      if (typeof runners.startRunner !== 'undefined') {

        console.log("start runner from server to Browser", runners.startRunner[0]);

        return (
          <MainWrap>
            <CenteringContainer>
              <Wrapper>
                <Header />
                <BodyWrap>
                  test
                  {/* runners.startRunner.map((el) =><div> {el} </div>) */}
                </BodyWrap>
              </Wrapper>
              <Button
                text="Back"
                onClick={() => {
                  this.props.history.push('/welcome');
                }}
              />
            </CenteringContainer>
          </MainWrap>
        );
      }

      if (typeof crossLineRunner.finishRunner !== 'undefined') {

        console.log("finished runner from server to Browser", finishRunner);

        return (
          <MainWrap>
            <CenteringContainer>
              <Wrapper>
                <Header />
                <BodyWrap>
                  Hello final world!
                </BodyWrap>
              </Wrapper>
              <Button
                text="Back"
                onClick={() => {
                  this.props.history.push('/welcome');
                }}
              />
            </CenteringContainer>
          </MainWrap>
        );
      }

      if (typeof crossLineRunner.finishRunner || crossLineRunner.finishRunner === 'undefined') {
        return (          
          <MainWrap>
          <CenteringContainer>
            <Wrapper>
              <Header />
              <BodyWrap>
                Hello final world!
              </BodyWrap>
            </Wrapper>
            <Button
              text="Back"
              onClick={() => {
                this.props.history.push('/welcome');
              }}
            />
          </CenteringContainer>
        </MainWrap>
        )
      }    

    return (
      <Loading />
    );
  }
}

Runners.propTypes = {
  Runners: PropTypes.shape({
    startRunner: PropTypes.object,
    finishRunner: PropTypes.object,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default Runners;
