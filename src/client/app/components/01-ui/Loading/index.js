/**
 *
 * Loading
 *
 */

import React from 'react';

import Wrapper from './styled/Wrapper';

function Loading() {
  return (
    <Wrapper>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <g transform="translate(50,50)">
          <g transform="scale(0.7)">
            <circle
              cx="0"
              cy="0"
              r="50"
              ng-attr-fill="{{config.c1}}"
              fill="#ff727d"
            />
            <circle
              cx="0"
              cy="-28"
              r="15"
              fill="#ffd391"
              transform="rotate(285.945)"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                calcMode="linear"
                values="0 0 0;360 0 0"
                keyTimes="0;1"
                dur="1s"
                begin="0s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        </g>
      </svg>
    </Wrapper>
  );
}

Loading.propTypes = {};

export default Loading;
