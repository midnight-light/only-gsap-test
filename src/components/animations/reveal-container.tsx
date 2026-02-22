import styled from 'styled-components';

export const StyledRevealContainer = styled.div`
  width: 100%;
  height: 100%;

  @keyframes revealUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  > * {
    opacity: 0;
    animation: revealUp 1s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
  }

  @media (prefers-reduced-motion: reduce) {
    > * {
      animation: none;
      opacity: 1;
      transform: none;
    }
  }
`;

export const RevealContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <StyledRevealContainer>{children}</StyledRevealContainer>;
};
