/**
 *
 * Runners
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { List } from 'react-virtualized'
import 'react-virtualized/styles.css'

import Header from 'components/Header';
import Loading from 'components/01-ui/Loading';
import CenteringContainer from 'components/01-ui/CenteringContainer';
import Button from 'components/01-ui/Button';

import Wrapper from './styled/Wrapper';
import BodyWrap from './styled/BodyWrap';
import MainWrap from './styled/MainWrap';

class Runners extends React.Component {

  componentDidMount() {
    this._interval = setInterval(this._updateFeed, 5000)

  }

  componentWillUnmount() {
    clearInterval(this._interval)
  }

  _updateFeed() {
    const list = [...this.props.startRunner]

    list.unshift(
      // Add new item here
    )

    // If you want to scroll to the top you can do it like this
    this.refs.List.scrollToRow(0)
  }

  _rowRenderer({ key, index }) {
    return (
      <div
        key={key}
      >
        {/* Your content goes here */}
      </div>
    )
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
              {/* <DisplayedPlayer startRunner={runners.startRunner} /> */}
              <BodyWrap>
                <List
                  ref='List'
                  width={3000}
                  height={2000}
                  rowHeight={60}
                  rowCount={runners.startRunner.length}
                  rowRenderer={this._rowRenderer}
                />               
                </BodyWrap>
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
