import styled from 'styled-components';
import { DefaultTheme } from 'styled-components';

interface ResponsiveConfig {
  columns?: number;
  rows?: number;
  columnSize?: string;
  rowSize?: string;
  gap?: keyof DefaultTheme['spacing'];
}

interface StyledGridContainerProps {
  // desktop settings (default)
  $columns?: number;
  $rows?: number;
  $columnSize?: string;
  $rowSize?: string;
  $gap?: keyof DefaultTheme['spacing'];
  $justifyContent?:
    | 'start'
    | 'end'
    | 'center'
    | 'stretch'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
  $alignContent?:
    | 'start'
    | 'end'
    | 'center'
    | 'stretch'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
  $minHeight?: string;
  $backgroundColor?: keyof DefaultTheme['colors'];

  $tablet?: ResponsiveConfig;
  $mobile?: ResponsiveConfig;
}

interface GridContainerProps extends StyledGridContainerProps {
  children: React.ReactNode;
  className?: string;
}

const StyledGridContainer = styled.div<StyledGridContainerProps>`
  display: grid;

  /* desktop */
  grid-template-columns: ${({ $columns = 2, $columnSize = '1fr' }) =>
    `repeat(${$columns}, ${$columnSize})`};

  grid-template-rows: ${({ $rows, $rowSize = 'auto' }) =>
    $rows ? `repeat(${$rows}, ${$rowSize})` : 'auto'};

  gap: ${({ $gap, theme }) => ($gap ? theme.spacing[$gap] : theme.spacing.md)};

  justify-content: ${({ $justifyContent = 'center' }) => $justifyContent};
  align-content: ${({ $alignContent = 'center' }) => $alignContent};

  width: 100%;
  min-height: ${({ $minHeight = '100%' }) => $minHeight};

  background-color: ${({ $backgroundColor, theme }) =>
    $backgroundColor ? theme.colors[$backgroundColor] : 'transparent'};

  /* tablet */
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    ${({ $tablet, theme }) =>
      $tablet &&
      `
      grid-template-columns: repeat(${$tablet.columns || 2}, ${$tablet.columnSize || '1fr'});
      ${$tablet.rows ? `grid-template-rows: repeat(${$tablet.rows}, ${$tablet.rowSize || 'auto'});` : ''}
      ${$tablet.gap ? `gap: ${theme.spacing[$tablet.gap]};` : ''}
    `}
  }

  /* mobile */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    ${({ $mobile, theme }) =>
      $mobile &&
      `
      grid-template-columns: repeat(${$mobile.columns || 1}, ${$mobile.columnSize || '1fr'});
      ${$mobile.rows ? `grid-template-rows: repeat(${$mobile.rows}, ${$mobile.rowSize || 'auto'});` : ''}
      ${$mobile.gap ? `gap: ${theme.spacing[$mobile.gap]};` : ''}
    `}
  }
`;

export const GridContainer = ({ children, ...props }: GridContainerProps) => {
  return <StyledGridContainer {...props}>{children}</StyledGridContainer>;
};
