/**
 *
 * Runners
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Column, Table } from "react-virtualized";

import Header from 'components/Header';
import Loading from 'components/01-ui/Loading';
import CenteringContainer from 'components/01-ui/CenteringContainer';
import Button from 'components/01-ui/Button';

import Wrapper from './styled/Wrapper';
import BodyWrap from './styled/BodyWrap';
import MainWrap from './styled/MainWrap';


const TOTAL_WIDTH = 1200;

class Runners extends React.Component {

  state = {
    widths: {
      AthleteID: 0.33,
      FullName: 0.33,
      StartNumber: 0.33
    }
  };

  tableDisplay = {
    display: 'inline-block',
    border: '1px solid rgba(0, 0, 0, 0.1)',    
  }

  headerRenderer = ({
    dataKey,
    label,
  }) => {
    return (
      <Fragment key={dataKey}>
        <div style={this.tableDisplay}>          
            {label}          
        </div>    
      </Fragment>
    );
  };

  render() {

    const {
      startRunner,
      finishRunner,
    } = this.props

    const {
      widths
    } = this.state;

    const runners = startRunner;
    const crossLineRunner = finishRunner;

    if (typeof runners.startRunner !== 'undefined') {
      console.log("start runner from server to Browser", runners.startRunner);

      return (
        <MainWrap>
          <CenteringContainer>
            <Wrapper>
              <Header />
              {/* <DisplayedPlayer startRunner={runners.startRunner} />  */}
              <Table
                width={TOTAL_WIDTH}
                height={300}
                headerHeight={20}
                rowHeight={30}
                rowCount={runners.startRunner.length}
                rowGetter={({ index }) => runners.startRunner[index]}
              >
                <Column
                  headerRenderer={this.headerRenderer}
                  dataKey="FullName"
                  label="Full Name"
                  width={widths.FullName * TOTAL_WIDTH}
                />
                <Column
                  headerRenderer={this.headerRenderer}
                  dataKey="AthleteID"
                  label="Athlete ID"
                  width={widths.AthleteID * TOTAL_WIDTH}
                />
                <Column
                  headerRenderer={this.headerRenderer}
                  dataKey="StartNumber"
                  label="starting No"
                  width={widths.StartNumber * TOTAL_WIDTH}
                />
              </Table>
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


      /* 
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
      ); */