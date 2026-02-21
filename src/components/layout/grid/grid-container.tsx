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

  $laptop?: ResponsiveConfig;
  $tablet?: ResponsiveConfig;
  $mobile?: ResponsiveConfig;
}

interface GridContainerProps extends StyledGridContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const OverlayItem = styled.div`
  grid-column: 1 / -1;
  grid-row: 1 / 3;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-row: 2 / 4;
  }
`;

const StyledGridContainer = styled.div<StyledGridContainerProps>`
  display: grid;

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

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    ${({ $laptop, theme }) =>
      $laptop &&
      `
      grid-template-columns: repeat(${$laptop.columns ?? 2}, ${$laptop.columnSize ?? '1fr'});
      ${$laptop.rows ? `grid-template-rows: repeat(${$laptop.rows}, ${$laptop.rowSize ?? 'auto'});` : ''}
      ${$laptop.gap ? `gap: ${theme.spacing[$laptop.gap]};` : ''}
    `}
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    ${({ $tablet, theme }) =>
      $tablet &&
      `
      grid-template-columns: repeat(${$tablet.columns ?? 2}, ${$tablet.columnSize ?? '1fr'});
      ${$tablet.rows ? `grid-template-rows: repeat(${$tablet.rows}, ${$tablet.rowSize ?? 'auto'});` : ''}
      ${$tablet.gap ? `gap: ${theme.spacing[$tablet.gap]};` : ''}
    `}
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    ${({ $mobile, theme }) =>
      $mobile &&
      `
      grid-template-columns: repeat(${$mobile.columns ?? 1}, ${$mobile.columnSize ?? '1fr'});
      ${$mobile.rows ? `grid-template-rows: repeat(${$mobile.rows}, ${$mobile.rowSize ?? 'auto'});` : ''}
      ${$mobile.gap ? `gap: ${theme.spacing[$mobile.gap]};` : ''}
    `}
  }
`;

export const GridContainer = ({ children, ...props }: GridContainerProps) => {
  return <StyledGridContainer {...props}>{children}</StyledGridContainer>;
};
