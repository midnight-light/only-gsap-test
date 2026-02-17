import styled from 'styled-components';
import { DefaultTheme } from 'styled-components';

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
type JustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
type AlignContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  | 'space-between'
  | 'space-around';

interface StyledFlexProps {
  $direction?: FlexDirection;
  $wrap?: FlexWrap;
  $justify?: JustifyContent;
  $align?: AlignItems;
  $alignContent?: AlignContent;

  $gap?: keyof DefaultTheme['spacing'];
  $rowGap?: keyof DefaultTheme['spacing'];
  $columnGap?: keyof DefaultTheme['spacing'];

  $width?: string;
  $height?: string;
  $minWidth?: string;
  $minHeight?: string;
  $maxWidth?: string;
  $maxHeight?: string;

  $padding?: keyof DefaultTheme['spacing'];
  $paddingX?: keyof DefaultTheme['spacing'];
  $paddingY?: keyof DefaultTheme['spacing'];
  $margin?: keyof DefaultTheme['spacing'];
  $marginX?: keyof DefaultTheme['spacing'];
  $marginY?: keyof DefaultTheme['spacing'];

  $backgroundColor?: keyof DefaultTheme['colors'];
  $borderRadius?: string;
}

interface FlexProps extends StyledFlexProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const StyledFlex = styled.div<StyledFlexProps>`
  display: flex;

  flex-direction: ${({ $direction = 'row' }) => $direction};
  flex-wrap: ${({ $wrap = 'nowrap' }) => $wrap};
  justify-content: ${({ $justify = 'flex-start' }) => $justify};
  align-items: ${({ $align = 'stretch' }) => $align};
  ${({ $alignContent }) => $alignContent && `align-content: ${$alignContent};`}

  ${({ $gap, $rowGap, $columnGap, theme }) => {
    if ($gap) return `gap: ${theme.spacing[$gap]};`;
    if ($rowGap || $columnGap) {
      return `
        ${$rowGap ? `row-gap: ${theme.spacing[$rowGap]};` : ''}
        ${$columnGap ? `column-gap: ${theme.spacing[$columnGap]};` : ''}
      `;
    }
    return '';
  }}
  
  ${({ $width }) => $width && `width: ${$width};`}
  ${({ $height }) => $height && `height: ${$height};`}
  ${({ $minWidth }) => $minWidth && `min-width: ${$minWidth};`}
  ${({ $minHeight }) => $minHeight && `min-height: ${$minHeight};`}
  ${({ $maxWidth }) => $maxWidth && `max-width: ${$maxWidth};`}
  ${({ $maxHeight }) => $maxHeight && `max-height: ${$maxHeight};`}
  
  ${({ $padding, $paddingX, $paddingY, theme }) => {
    if ($padding) return `padding: ${theme.spacing[$padding]};`;
    if ($paddingX || $paddingY) {
      return `
        ${$paddingY ? `padding-top: ${theme.spacing[$paddingY]}; padding-bottom: ${theme.spacing[$paddingY]};` : ''}
        ${$paddingX ? `padding-left: ${theme.spacing[$paddingX]}; padding-right: ${theme.spacing[$paddingX]};` : ''}
      `;
    }
    return '';
  }}
  
  ${({ $margin, $marginX, $marginY, theme }) => {
    if ($margin) return `margin: ${theme.spacing[$margin]};`;
    if ($marginX || $marginY) {
      return `
        ${$marginY ? `margin-top: ${theme.spacing[$marginY]}; margin-bottom: ${theme.spacing[$marginY]};` : ''}
        ${$marginX ? `margin-left: ${theme.spacing[$marginX]}; margin-right: ${theme.spacing[$marginX]};` : ''}
      `;
    }
    return '';
  }}
  
  ${({ $backgroundColor, theme }) =>
    $backgroundColor && `background-color: ${theme.colors[$backgroundColor]};`}
  ${({ $borderRadius }) => $borderRadius && `border-radius: ${$borderRadius};`}
`;

export const Flex = ({ children, as = 'div', ...props }: FlexProps) => {
  return (
    <StyledFlex as={as} {...props}>
      {children}
    </StyledFlex>
  );
};
