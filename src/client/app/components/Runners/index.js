/**
 *
 * Runners
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactTable from "react-table";
import 'react-table/react-table.css';

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

  }

  render() {

    const {
      startRunner,
      finishRunner,
    } = this.props

    const runners = startRunner;
    const crossLineRunner = finishRunner;

    if (typeof runners.startRunner !== 'undefined') {

      console.log("start runner from server to Browser", runners.startRunner);

      const DisplayedPlayer = ({ startRunner }) => (
        <Fragment>
          {startRunner.map(player => (
            <BodyWrap key={player.AthleteID}>
              <div className="player" >
                {player.FullName},
              {player.StartNumber}</div>
            </BodyWrap>
          ))}
        </Fragment>
      );

      return (
        <MainWrap>
          <CenteringContainer>
            <Wrapper>
              <Header />
              <DisplayedPlayer startRunner={runners.startRunner} />             
            </Wrapper>
          <Button
            text="Back"
            onClick={() => {
              this.props.history.push('/welcome');
            }}
          />
          </CenteringContainer>
        </MainWrap >
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
          </CenteringContainer>
          <Button
            text="Back"
            onClick={() => {
              this.props.history.push('/welcome');
            }}
          />
        </MainWrap>
      );
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
