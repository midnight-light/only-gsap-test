import styled from 'styled-components';
import { DefaultTheme } from 'styled-components';

type SeparatorOrientation = 'horizontal' | 'vertical';

interface StyledSeparatorProps {
  $orientation?: SeparatorOrientation;
  $gradient?: string;
  $color?: keyof DefaultTheme['colors'];
  $width?: string;
  $height?: string;
  $thickness?: string;
}

interface SeparatorProps extends StyledSeparatorProps {
  className?: string;
}

const StyledSeparator = styled.div<StyledSeparatorProps>`
  ${({ $orientation = 'vertical', $width, $height, $thickness = '5px' }) => {
    if ($orientation === 'vertical') {
      return `
        width: ${$thickness};
        height: ${$height || '7.5rem'};
      `;
    } else {
      return `
        width: ${$width || '100%'};
        height: ${$thickness};
      `;
    }
  }}

  ${({ $gradient, $color, theme }) => {
    if ($gradient) {
      return `background: ${$gradient};`;
    }
    if ($color) {
      return `background-color: ${theme.colors[$color]};`;
    }
    return `background: linear-gradient(to bottom, #3877EE, #EF5DA8);`;
  }}
  
  border-radius: 2px;
  flex-shrink: 0;
`;

export const Separator = (props: SeparatorProps) => {
  return <StyledSeparator {...props} />;
};
