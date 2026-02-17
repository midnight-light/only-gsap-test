import styled from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = styled.button<ButtonProps>`
  padding: ${({ theme, size = 'md' }) => {
    const sizes = {
      sm: `${theme.spacing.xs} ${theme.spacing.sm}`,
      md: `${theme.spacing.sm} ${theme.spacing.md}`,
      lg: `${theme.spacing.md} ${theme.spacing.lg}`,
    };
    return sizes[size];
  }};
  
  background-color: ${({ theme, variant = 'primary' }) =>
    variant === 'primary' ? theme.colors.primary : theme.colors.secondary};
  
  color: ${({ theme }) => theme.colors.background};
  border: none;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: 500;
  
  transition: opacity 0.2s ease-in-out;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:active {
    opacity: 0.8;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
