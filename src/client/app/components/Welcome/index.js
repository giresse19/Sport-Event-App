/**
 *
 * Welcome
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/01-ui/Button';
import CenteringContainer from 'components/01-ui/CenteringContainer';

import shuffle from '../../helpers/shuffle';
import runners from '../../helpers/data/runners';

import Wrapper from './styled/Wrapper';
import Title from './styled/Title';
import Instructions from './styled/Instructions';
import Fields from './styled/Fields';
import NestedLink from './styled/NestedLink';

function Welcome({ historyPush, login, loginFinal }) {
  const runnerStart = shuffle(runners);
  const runnersFinal = shuffle(runners);

  return (
    <Wrapper>
      <CenteringContainer maxWidth="700">
        <Title> Sports Event Tracking App</Title>
        <Instructions>
          <p>
            {' '}
            Click on start button to fire runners from Entering into
            finish corridor point or on Finish button to get results
            of runners who cross the finish line.
          </p>
          <p>
            The means of communication is websockets. For this app,
            socket.io was use. You can read more about socket.io from
            the link below:
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
              login([runnerStart]), historyPush('/runners');
            }}
          />
        </Fields>
        <Fields>
          <Button
            text="Finish"
            onClick={() => {
              loginFinal([runnersFinal]), historyPush('/runners');
            }}
          />
        </Fields>
      </CenteringContainer>
    </Wrapper>
  );
}

Welcome.propTypes = {
  login: PropTypes.func,
  loginFinal: PropTypes.func,
  historyPush: PropTypes.func,
};

export default Welcome;
