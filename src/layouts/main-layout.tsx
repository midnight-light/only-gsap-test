import styled from 'styled-components';

const LayoutContainer = styled.div`
  padding: 0 10rem 0 20rem; /* top right bottom left */

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding: 0;
  }
`;

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return <LayoutContainer>{children}</LayoutContainer>;
};
