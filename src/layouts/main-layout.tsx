import styled from 'styled-components';

const LayoutContainer = styled.div`
  height: 100%;

  /* 10rem на laptop до 20rem на desktop */
  padding-left: clamp(10rem, calc(-20rem + 2.083vw), 20rem);

  /* 5rem на laptop до 10rem на desktop */
  padding-right: clamp(5rem, calc(-10rem + 1.042vw), 10rem);

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: ${({ theme }) => theme.spacing.sm};
    padding-left: ${({ theme }) => theme.spacing.sm};
    padding-right: ${({ theme }) => theme.spacing.sm};
  }
`;

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return <LayoutContainer>{children}</LayoutContainer>;
};
