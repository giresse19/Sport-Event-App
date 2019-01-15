/**
 *
 * Welcome
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/01-ui/Button';
import CenteringContainer from 'components/01-ui/CenteringContainer';

import shuffle from '../../helpers/shuffle'
import runners from '../../helpers/data/runners'

import Wrapper from './styled/Wrapper';
import Title from './styled/Title';
import Instructions from './styled/Instructions';
import Fields from './styled/Fields';
import NestedLink from './styled/NestedLink';

const runnerStart = shuffle(runners);
const runnersFinal = shuffle(runners);


class Welcome extends Component {

  constructor() {
    super();
    this.handleLogin = this.handleLogin.bind(this); 
    this.randomRunners = this.randomRunners.bind(this);  
    this.getRandomArbitrary = this.getRandomArbitrary.bind(this);
  }

  componentDidMount() {
    console.log("mounted")
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  randomRunners() {   
    const randTime = getRandomArbitrary(0, 3);

    runnerStart.forEach(() => {
      setTimeout(this.props.login([randomRunner]), randTime);
    })
    
  }

  render() {

    const {
      historyPush,
      login,
      loginFinal,
    } = this.props;

    return (
      <Wrapper>
        <CenteringContainer maxWidth="700">
          <Title> Sports Event Tracking App</Title>
          <Instructions>
            <p>
              {' '}
              Click on start button to fire runners from Entering into finish corridor point or
              on Finish button to get results of runners who cross the finish line.
            </p>
            <p>
              The means of communication is websockets. For this app, socket.io was use.
                You can read more about socket.io from the link below:
            </p>
            <p>
              <NestedLink href="https://socket.io/docs/client-api/">
                (external link)
              </NestedLink>{' '}
            </p>
          </Instructions>
          <Fields>
            <Button
              text="Start"
              onClick={() => {
                login([runnerStart]),
                  historyPush('/runners');
              }}
            />
          </Fields>
          <Fields>
            <Button
              text="Finish"
              onClick={() => {
                loginFinal([runnersFinal]),
                  historyPush('/runners');
              }}
            />
          </Fields>
        </CenteringContainer>
      </Wrapper>
    );
  }
}

Welcome.propTypes = {
  historyPush: PropTypes.func,
};

export default Welcome;


/* 
              <Table
                ref='Table'
                width={TOTAL_WIDTH}
                height={400}
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
                  label="starting Position"
                  width={widths.StartNumber * TOTAL_WIDTH}
                />
              </Table> */