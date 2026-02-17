import styled from 'styled-components';
import { DefaultTheme } from 'styled-components';
import { theme } from '../../../app/styles/theme';
import { hexToRgba } from '../../../utils/colors';

type GridItemVariants = 'primary' | 'muted';

const gridItemVariants = {
  primary: theme.colors.foreground,
  muted: hexToRgba(theme.colors.foreground, 0.2),
} as const;

interface BorderConfig {
  width?: string;
  style?: 'solid' | 'dashed' | 'dotted' | 'double';
}

interface StyledGridItemProps {
  $variant?: GridItemVariants;
  $padding?: keyof DefaultTheme['spacing'];
  $borderRadius?: string;
  $borderWidth?: string;
  $borderTop?: BorderConfig;
  $borderRight?: BorderConfig;
  $borderBottom?: BorderConfig;
  $borderLeft?: BorderConfig;

  $borderStyle?: 'solid' | 'dashed' | 'dotted' | 'double';
  alignItems?: 'start' | 'center' | 'end';
  justifyContent?: 'start' | 'center' | 'end';
}

interface GridItemProps extends StyledGridItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const createBorder = (
  config: BorderConfig | undefined,
  defaultVariant?: GridItemVariants,
): string => {
  if (!config) return 'none';

  const width = config.width || '1px';
  const style = config.style || 'solid';
  const color = defaultVariant
    ? gridItemVariants[defaultVariant]
    : theme.colors.foreground;

  return `${width} ${style} ${color}`;
};

const GridItemContainer = styled.div<StyledGridItemProps>`
  width: 100%;
  height: 100%;

  background-color: ${({ theme }) => theme.colors.background};

  ${({
    $borderWidth,
    $borderStyle,
    $variant,
    $borderTop,
    $borderRight,
    $borderBottom,
    $borderLeft,
  }) => {
    const hasIndividualBorders =
      $borderTop || $borderRight || $borderBottom || $borderLeft;

    if (hasIndividualBorders) {
      return '';
    }

    const color = $variant
      ? gridItemVariants[$variant]
      : theme.colors.foreground;
    return `border: ${$borderWidth || '1px'} ${$borderStyle || 'solid'} ${color};`;
  }}

  ${({ $borderTop, $variant }) =>
    $borderTop && `border-top: ${createBorder($borderTop, $variant)};`}
  
  ${({ $borderRight, $variant }) =>
    $borderRight && `border-right: ${createBorder($borderRight, $variant)};`}
  
  ${({ $borderBottom, $variant }) =>
    $borderBottom && `border-bottom: ${createBorder($borderBottom, $variant)};`}
  
  ${({ $borderLeft, $variant }) =>
    $borderLeft && `border-left: ${createBorder($borderLeft, $variant)};`}
  
  padding: ${({ $padding, theme }) =>
    $padding ? theme.spacing[$padding] : theme.spacing.md};

  border-radius: ${({ $borderRadius = '0' }) => $borderRadius};

  display: flex;
  align-items: ${({ alignItems = 'center' }) => alignItems};
  justify-content: ${({ justifyContent = 'center' }) => justifyContent};
`;

export const GridItem = ({ children, ...props }: GridItemProps) => {
  return <GridItemContainer {...props}>{children}</GridItemContainer>;
};
