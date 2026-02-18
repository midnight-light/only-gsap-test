import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'outline';

const buttonSizes = {
  sm: { width: '1.5rem', height: '1.5rem' },
  md: { width: '3.125rem', height: '3.125rem' },
  lg: { width: '4.375rem', height: '4.375rem' },
  xl: { width: '5.625rem', height: '5.625rem' },
} as const;

const variantStyles: Record<ButtonVariant, ReturnType<typeof css>> = {
  primary: css`
    background: #ffffff;
    color: ${({ theme }) => theme.colors.primary};
    border: none;
    box-shadow: 0px 0px 15px 0px rgba(56, 119, 238, 0.2);
  `,
  outline: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.foreground};
    border: 1px solid ${({ theme }) => theme.colors.foreground};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.foreground};
      color: ${({ theme }) => theme.colors.background};
    }
  `,
};

const ButtonContainer = styled.button<ButtonProps>`
  ${({ variant = 'primary' }) => variantStyles[variant]}

  width: ${({ size = 'md' }) => buttonSizes[size].width};
  height: ${({ size = 'md' }) => buttonSizes[size].height};
  border-radius: ${({ $rounded }) => ($rounded ? '50%' : '0.25rem')};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition:
    background-color 0.2s,
    color 0.2s;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: keyof typeof buttonSizes;
  $rounded?: boolean;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  $rounded = true,
  children,
  ...props
}) => (
  <ButtonContainer variant={variant} size={size} $rounded={$rounded} {...props}>
    {children}
  </ButtonContainer>
);
