import { Button } from "../components/ui/button";
import styled from 'styled-components';


const LayoutContainer = styled.div`
  padding: 0 10rem 0 20rem; /* top right bottom left */
  width: 100%;
  min-height: 100vh;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 5rem 0 10rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => `
    ${theme.spacing.sm} ${theme.spacing.sm} ${theme.spacing.sm} ${theme.spacing.sm}`};
  }
`;


export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <LayoutContainer>
      {children}
    </LayoutContainer>
  );
};