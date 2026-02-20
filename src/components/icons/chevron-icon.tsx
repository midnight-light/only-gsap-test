import React from 'react';
import styled from 'styled-components';

type ChevronDirection = 'left' | 'right' | 'up' | 'down';

interface ChevronIconProps extends React.SVGAttributes<SVGSVGElement> {
  direction?: ChevronDirection;
  size?: number;
  color?: string;
  'aria-label'?: string;
}

const ROTATION_MAP: Record<ChevronDirection, number> = {
  left: 0,
  right: 180,
  up: 90,
  down: 270,
};

const StyledSvg = styled.svg<{ $rotation: number }>`
  transform: rotate(${({ $rotation }) => $rotation}deg);
  flex-shrink: 0;
`;

export const ChevronIcon = React.forwardRef<SVGSVGElement, ChevronIconProps>(
  (
    { direction = 'left', size = 14, color, 'aria-label': ariaLabel, ...rest },
    ref,
  ) => {
    const rotation = ROTATION_MAP[direction];

    return (
      <StyledSvg
        ref={ref}
        width={size * (9 / 14)} // preserves 9:14 aspect ratio
        height={size}
        viewBox="0 0 9 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        $rotation={rotation}
        role={ariaLabel ? 'img' : 'presentation'}
        aria-label={ariaLabel}
        aria-hidden={!ariaLabel}
        {...rest}
      >
        <path
          d="M7.66418 0.707108L1.41419 6.95711L7.66418 13.2071"
          stroke={color ?? 'currentColor'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </StyledSvg>
    );
  },
);

ChevronIcon.displayName = 'ChevronIcon';
