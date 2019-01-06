/**
 *
 * Runners
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Header from 'components/Header';
import Loading from 'components/01-ui/Loading';
import CenteringContainer from 'components/01-ui/CenteringContainer';
import Button from 'components/01-ui/Button';

import Wrapper from './styled/Wrapper';
import BodyWrap from './styled/BodyWrap';
import MainWrap from './styled/MainWrap';

class Runners extends React.Component {

  render() {
     // console.log("here are props", this.props);
    const {
       startRunner,
       finishRunner,
     } = this.props    
    
    if (startRunner) {

       console.log("start runner from server to Browser", startRunner);

      return (
        <MainWrap>
          <CenteringContainer>
            <Wrapper>
              <Header />
              <BodyWrap>
                Hello world!
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

    if (finishRunner) {

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

    return <Loading />;
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
