import styled from 'styled-components';

interface QuadrantContainerProps {
  children?: React.ReactNode;
  className?: string;
}

const StyledQuadrantContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.colors.muted};

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.muted};
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 1px;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.muted};
    pointer-events: none;
  }
`;

export const QuadrantContainer = ({
  children,
  className,
}: QuadrantContainerProps) => (
  <StyledQuadrantContainer className={className}>
    {children}
  </StyledQuadrantContainer>
);
