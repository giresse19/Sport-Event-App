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
import TableHeader from './styled/TableHeader';


const TOTAL_WIDTH = 1200;

class Runners extends React.Component {

  state = {
    widths: {
      AthleteID: 0.33,
      FullName: 0.33,
      StartNumber: 0.33
    }
  };

  headerRenderer = ({
    dataKey,
    label,
  }) => {
    return (
      <Fragment key={dataKey}>
        <TableHeader>
          {label}
        </TableHeader>
      </Fragment>
    );
  };

  render() {

    const {
      widths
    } = this.state;

    const {
      startRunner,
      finishRunner,
    } = this.props

    const runner = startRunner;
    console.log("runner in runner component", runner.startRunner)

    const runners = startRunner;
    const crossLineRunner = finishRunner;

    if (typeof runners.startRunner !== 'undefined') {
      console.log("start runner from server to Browser", runners.startRunner);

      return (
        <MainWrap>
          <CenteringContainer>
            <Wrapper>
              <Header />

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
      console.log("finished runner from server to Browser", crossLineRunner.finishRunner );

      return (
        <MainWrap>
          <CenteringContainer>
            <Wrapper>
              <Header />
              <Table
                ref='Table'
                width={TOTAL_WIDTH}
                height={400}
                headerHeight={20}
                rowHeight={30}
                rowCount={crossLineRunner.finishRunner.length}
                rowGetter={({ index }) => crossLineRunner.finishRunner[index]}
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
                    label="starting Position"
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

  headerRenderer: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default Runners;
