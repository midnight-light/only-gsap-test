import styled, { css } from 'styled-components';
import { DefaultTheme } from 'styled-components';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingVariant = 'primary' | 'secondary' | 'accent' | 'muted';
type HeadingWeight = keyof DefaultTheme['typography']['fontWeight'];
type HeadingLineHeight = keyof DefaultTheme['typography']['lineHeight'];
type HeadingColor = keyof DefaultTheme['colors'];

interface StyledHeaderProps {
  $level: HeadingLevel;
  $variant?: HeadingVariant;
  $color?: HeadingColor;
  $weight?: HeadingWeight;
  $lineHeight?: HeadingLineHeight;
  $align?: 'left' | 'center' | 'right' | 'justify';
  $marginBottom?: keyof DefaultTheme['spacing'];
  $marginTop?: keyof DefaultTheme['spacing'] | string;
  $uppercase?: boolean;
  $truncate?: boolean;
  $marginLeft?: keyof DefaultTheme['spacing'] | string;
  $marginRight?: keyof DefaultTheme['spacing'] | string;
  $paddingLeft?: keyof DefaultTheme['spacing'];
  $paddingRight?: keyof DefaultTheme['spacing'] | string;
  $paddingTop?: keyof DefaultTheme['spacing'] | string;
  $paddingBottom?: keyof DefaultTheme['spacing'] | string;
}

interface HeaderProps extends Omit<StyledHeaderProps, '$level'> {
  children: React.ReactNode;
  as?: HeadingLevel;
  className?: string;
}

// styles variants
const getVariantStyles = ($variant?: HeadingVariant) => {
  switch ($variant) {
    case 'primary':
      return css`
        color: ${({ theme }) => theme.colors.text};
        font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
      `;
    case 'secondary':
      return css`
        color: ${({ theme }) => theme.colors.secondary};
        font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
      `;
    case 'accent':
      return css`
        color: ${({ theme }) => theme.colors.success};
        font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
      `;
    case 'muted':
      return css`
        color: ${({ theme }) => theme.colors.text};
        font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
        opacity: 0.7;
      `;
    default:
      return css``;
  }
};

const StyledHeader = styled.h1<StyledHeaderProps>`
  font-size: ${({ $level, theme }) => theme.typography.heading[$level]};
  font-family: ${({ theme }) => theme.typography.fontFamily};

  ${({ $variant }) => $variant && getVariantStyles($variant)}

  ${({ $color, theme }) => $color && `color: ${theme.colors[$color]};`}
  ${({ $weight, theme }) =>
    $weight && `font-weight: ${theme.typography.fontWeight[$weight]};`}
  
  line-height: ${({ $lineHeight, theme }) =>
    $lineHeight
      ? theme.typography.lineHeight[$lineHeight]
      : theme.typography.lineHeight.tight};

  text-align: ${({ $align = 'left' }) => $align};

  margin: ${({ $marginTop, $marginBottom, $marginLeft, $marginRight }) =>
    `${$marginTop ? $marginTop : '0'} ${$marginBottom ? $marginBottom : '0'} ${$marginLeft ? $marginLeft : '0'} ${$marginRight ? $marginRight : '0'}`};

  ${({ $uppercase }) => $uppercase && `text-transform: uppercase;`}

  ${({ $truncate }) =>
    $truncate &&
    css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `}
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ $level }) => {
      const mobileSizes = {
        h1: '36px',
        h2: '32px',
        h3: '28px',
        h4: '20px',
        h5: '18px',
        h6: '16px',
      };
      return mobileSizes[$level];
    }};
  }
`;

export const Header = ({ children, as = 'h1', ...props }: HeaderProps) => {
  return (
    <StyledHeader as={as} $level={as} {...props}>
      {children}
    </StyledHeader>
  );
};
