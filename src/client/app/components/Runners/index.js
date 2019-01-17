/**
 *
 * Runners
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Column } from 'react-virtualized';

import Header from 'components/Header';
import Loading from 'components/01-ui/Loading';
import CenteringContainer from 'components/01-ui/CenteringContainer';
import Button from 'components/01-ui/Button';

import Wrapper from './styled/Wrapper';
import MainWrap from './styled/MainWrap';
import TableHeader from './styled/TableHeader';

const TOTAL_WIDTH = 1200;

class Runners extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      list: [this.props.startRunner],
      listFinal: [this.props.finishRunner],
      widths: {
        AthleteID: 0.33,
        FullName: 0.33,
        StartNumber: 0.33,
        StartTime: 0.33,
        FinishTime: 0.33,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.startRunner !== prevState.list) {
      return {
        list: nextProps.startRunner,
        listFinal: nextProps.finishRunner,
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.list !== this.state.list ||
      prevState.listFinal !== this.state.listFinal
    ) {
      this.setState({
        list: [...prevProps.startRunner, this.state.list],
        listFinal: [
          ...prevProps.finishRunner,
          this.state.finishRunner,
        ],
      });
    }
  }

  headerRenderer = ({ dataKey, label }) => {
    return (
      <Fragment key={dataKey}>
        <TableHeader>{label}</TableHeader>
      </Fragment>
    );
  };

  render() {
    const { list, widths, listFinal } = this.state;

    let rowCountStart = [];
    let rowCountFinal = [];

    rowCountStart.push(list.startRunner);

    rowCountFinal.push(listFinal.finishRunner);

    if (
      !(Object.keys(list).length === 0 && list.constructor === Object)
    ) {
      return (
        <MainWrap>
          <CenteringContainer>
            <Wrapper>
              <Header />

              <Table
                myRef={el => (this.Table = el)}
                width={TOTAL_WIDTH}
                height={100}
                headerHeight={20}
                rowHeight={30}
                rowCount={rowCountStart.length}
                rowGetter={({ index }) => rowCountStart[index]}
              >
                <Column
                  headerRenderer={this.headerRenderer}
                  dataKey="FullName"
                  label="Full Name"
                  width={widths.FullName * TOTAL_WIDTH}
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

    if (
      !(
        Object.keys(listFinal).length === 0 &&
        listFinal.constructor === Object
      )
    ) {
      return (
        <MainWrap>
          <CenteringContainer>
            <Wrapper>
              <Header />

              <Table
                myRef={el => (this.TableFinal = el)}
                width={TOTAL_WIDTH}
                height={100}
                headerHeight={20}
                rowHeight={30}
                rowCount={rowCountFinal.length}
                rowGetter={({ index }) => rowCountFinal[index]}
              >
                <Column
                  headerRenderer={this.headerRenderer}
                  dataKey="FullName"
                  label="Full Name"
                  width={widths.FullName * TOTAL_WIDTH}
                />
                <Column
                  headerRenderer={this.headerRenderer}
                  dataKey="FinishTime"
                  label="clock Time"
                  width={widths.FinishTime * TOTAL_WIDTH}
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

    return <Loading />;
  }
}

Runners.propTypes = {
  Runners: PropTypes.shape({
    startRunner: PropTypes.object,
    finishRunner: PropTypes.object,
  }),

  startRunner: PropTypes.object,
  finishRunner: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default Runners;
