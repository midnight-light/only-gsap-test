import { Flex } from '../../components/layout/flex';
import {
  GridContainer,
  OverlayItem,
} from '../../components/layout/grid/grid-container';
import { GridItem } from '../../components/layout/grid/grid-item';
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

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-height: 67.5rem;
  max-width: 90rem;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
`;

export const HistoricalDateSection = () => {
  const historicalDates = getHistoricalDates();
  const [activePoint, setActivePoint] = useState<TimeLinePoint>(
    historicalDates.data[0],
  );

  const handleActivePointChange = (point: TimeLinePoint) => {
    setActivePoint(point);
  };

  const handlePointChange = (newPointActiveIndex: number) => {
    console.warn('newPointActiveIndex', newPointActiveIndex);

    const newPoint = historicalDates.data.find(
      (p) => p.id === newPointActiveIndex,
    ) as TimeLinePoint;

    if (!newPoint) return;

    setActivePoint(newPoint);
  };

  console.warn('historicalDates', historicalDates);

  return (
    <Container>
      <GridContainer
        $columns={2}
        $rows={2}
        $columnSize="44.87rem"
        $rowSize="30rem"
        $gap="none"
        $tablet={{
          columns: 2,
          columnSize: '1fr',
          rowSize: '25rem',
        }}
        $mobile={{
          columns: 1,
          rows: 5,
          rowSize: '18.75rem',
        }}
        $justifyContent="center"
        $alignContent="center"
      >
        <GridItem
          $gridColumn="1"
          $gridRow="1"
          $variant="muted"
          $borderLeft={{ style: 'solid' }}
          $borderBottom={{ style: 'solid' }}
          $borderRadius="none"
          $justifyContent="start"
          $padding="none"
        >
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
          </Flex>{' '}
        </GridItem>
        <GridItem
          $gridColumn="2"
          $gridRow="1"
          $variant="muted"
          $borderRadius="none"
          $borderRight={{ style: 'solid' }}
          $borderLeft={{ style: 'solid' }}
          $borderBottom={{ style: 'solid' }}
        >
          {null}
        </GridItem>
        <GridItem
          $variant="muted"
          $borderRadius="none"
          $borderLeft={{ style: 'solid' }}
          $padding="none"
        >
          {null}
        </GridItem>
        <GridItem
          $gridColumn="1"
          $gridRow="2"
          $variant="muted"
          $borderRadius="none"
          $borderLeft={{ style: 'solid' }}
          $padding="none"
        >
          {null}
        </GridItem>
        <GridItem
          $variant="muted"
          $borderRadius="none"
          $borderLeft={{ style: 'solid' }}
          $padding="none"
        >
          {null}
        </GridItem>
        <GridItem
          $gridColumn="2"
          $gridRow="2"
          $variant="muted"
          $borderRadius="none"
          $borderLeft={{ style: 'solid' }}
          $borderRight={{ style: 'solid' }}
          $padding="none"
        >
          {null}
        </GridItem>
        <OverlayItem>
          <CircularNavigation
            activePointId={activePoint.id}
            points={historicalDates}
            radius={265}
            pointSize={56}
            initialDelay={1}
            onActivePointChange={handleActivePointChange}
          />

          <EventsSwiper
            onPointChange={handlePointChange}
            events={activePoint.events}
            currentPointId={activePoint.id}
            totalPoints={historicalDates.meta.pointCount}
          />
        </OverlayItem>
      </GridContainer>
    </Container>
  );
};
