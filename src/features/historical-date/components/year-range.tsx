import React, { useMemo } from 'react';
import styled from 'styled-components';
import { NumberCounter } from '../../../components/ui/number-counter/number-counter';
import { TimeLinePoint } from '../constants/historical-dates-mok.constants';

interface YearRangeProps {
  point: TimeLinePoint;
}

const Wrapper = styled.div`
  display: flex;
  gap: 8rem;
  align-items: baseline;
  font-size: ${({ theme }) => theme.typography.heading.landingTitle};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.typography.heading.h1};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.smallTablet}) {
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const YearRange: React.FC<YearRangeProps> = ({ point }) => {
  const { startYear, endYear } = useMemo(
    () => ({
      startYear: Math.min(...point.events.map((e) => e.year)),
      endYear: Math.max(...point.events.map((e) => e.year)),
    }),
    [point],
  );

  return (
    <Wrapper>
      <NumberCounter value={startYear} duration={1.2} />
      <NumberCounter value={endYear} duration={1.2} variant="accent" />
    </Wrapper>
  );
};
