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
      list: [],
      listFinal: [],
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
    // eslint-disable consistent-return
    if (
      prevState.list !== nextProps.startRunner ||
      prevState.listFinal !== nextProps.finishRunner
    ) {
      return {
        list: [...prevState.list, nextProps.startRunner],
        listFinal: [...prevState.listFinal, nextProps.finishRunner],
      };
    }
  }

  // .scrollToRow(0)
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.list !== this.state.list ||
      prevState.listFinal !== this.state.listFinal
    ) {
      if (typeof this.refs.Table !== 'undefined') {
        this.refs.Table.scrollToRow(this.state.list.length);
      }
    }
  }

  /* eslint-disable arrow-body-style */
  headerRenderer = ({ dataKey, label }) => {
    return (
      <Fragment key={dataKey}>
        <TableHeader>{label}</TableHeader>
      </Fragment>
    );
  };

  render() {
    const { list, widths, listFinal } = this.state;

    if (
      list.length > 2 &&
      !(
        Object.keys(list[2]).length === 0 &&
        list[2].constructor === Object
      )
    ) {
      return (
        <MainWrap>
          <CenteringContainer>
            <Wrapper>
              <Header />
              <Table
                ref="Table"
                width={TOTAL_WIDTH}
                height={400}
                headerHeight={20}
                rowHeight={30}
                rowCount={list.length}
                rowGetter={({ index }) => {
                  if (index > 1 && index % 2 === 0) {
                    return list[index].startRunner;
                  } else {
                    return list[index];
                  }
                }}
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
      listFinal.length > 2 &&
      !(
        Object.keys(listFinal[2]).length === 0 &&
        listFinal[2].constructor === Object
      )
    ) {
      return (
        <MainWrap>
          <CenteringContainer>
            <Wrapper>
              <Header />
              <Table
                ref="Table"
                width={TOTAL_WIDTH}
                height={400}
                headerHeight={20}
                rowHeight={30}
                rowCount={listFinal.length}
                rowGetter={({ index }) => {
                  if (index > 1 && index % 2 === 0) {
                    return listFinal[index].finishRunner;
                  } else {
                    return listFinal[index];
                  }
                }}
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
  startRunner: PropTypes.object,
  finishRunner: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default Runners;
