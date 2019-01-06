/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import CenteringContainer from 'components/01-ui/CenteringContainer';

import Wrapper from './styled/Wrapper';
import LogoH1 from './styled/LogoH1';
import LeftColumn from './styled/LeftColumn';

function Header() {
  return (
    <Wrapper>
      <CenteringContainer>
        <LeftColumn>
          <Link to="/welcome">
            <LogoH1>Mooncascade</LogoH1>
          </Link>
        </LeftColumn>
      </CenteringContainer>
    </Wrapper>
  );
}

Header.propTypes = {};

export default Header;