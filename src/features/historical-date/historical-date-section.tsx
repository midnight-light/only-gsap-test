import { Flex } from '../../components/layout/flex';
import { Header } from '../../components/typography/header';
import { Separator } from '../../components/ui/separator';
import { CircularNavigation } from '../../components/circular-navigation';
import styled from 'styled-components';
import {
  getHistoricalDates,
  TimeLinePoint,
} from './constants/historical-dates-mok.constants';
import { useState } from 'react';
import { EventsSwiper } from './components/swiper/events-swiper';
import { YearRange } from './components/year-range';
import { QuadrantContainer } from '../../components/layout/quadrant-container';
import useMediaQuery from '../../hooks/use-media-query';
import { theme } from '../../app/styles/theme';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100svh;
  max-width: 90rem;
  position: relative;
`;

const YearRangeContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 50%;
  pointer-events: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.smallTablet}) {
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: center;
    align-items: center;
  }
`;

const TopLeftContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  pointer-events: none;
  z-index: 1;
`;

export const HistoricalDateSection = () => {
  const isMobile = useMediaQuery(
    `(max-width: ${theme.breakpoints.smallTablet})`,
  );
  const historicalDates = getHistoricalDates();
  const [activePoint, setActivePoint] = useState<TimeLinePoint>(
    historicalDates.data[0],
  );

  const handleActivePointChange = (point: TimeLinePoint) => {
    setActivePoint(point);
  };

  const handlePointChange = (newPointActiveIndex: number) => {
    const newPoint = historicalDates.data.find(
      (p) => p.id === newPointActiveIndex,
    ) as TimeLinePoint;

    if (!newPoint) return;

    setActivePoint(newPoint);
  };

  if (isMobile) {
    return (
      <Flex
        $direction="column"
        $justify="flex-start"
        $alignContent="flex-start"
        $gap="xl"
        $columnGap="xl"
      >
        <Header as="h1" $variant="primary">
          Исторические даты
        </Header>

        <YearRangeContainer>
          <YearRange point={activePoint} />
        </YearRangeContainer>

        <Separator $orientation="horizontal" $color="muted" $thickness="1px" />

        <EventsSwiper
          onPointChange={handlePointChange}
          events={activePoint.events}
          currentPointId={activePoint.id}
          totalPoints={historicalDates.meta.pointCount}
          isMobile={isMobile}
        />
      </Flex>
    );
  }

  return (
    <Container>
      <QuadrantContainer>
        <TopLeftContent>
          <Flex
            $justify="flex-start"
            $align="center"
            $alignContent="center"
            $gap="xl"
            $maxWidth="22rem"
          >
            <Separator $height="7.5rem" $width="5px" />
            <Header as="h1" $variant="primary">
              Исторические даты
            </Header>
          </Flex>
        </TopLeftContent>

        <CircularNavigation
          activePointId={activePoint.id}
          points={historicalDates}
          radius={265}
          pointSize={56}
          initialDelay={1}
          onActivePointChange={handleActivePointChange}
        />

        <YearRangeContainer>
          <YearRange point={activePoint} />
        </YearRangeContainer>

        <EventsSwiper
          onPointChange={handlePointChange}
          events={activePoint.events}
          currentPointId={activePoint.id}
          totalPoints={historicalDates.meta.pointCount}
        />
      </QuadrantContainer>
    </Container>
  );
};
