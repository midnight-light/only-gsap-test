import { Flex } from '../components/layout/flex';
import { GridContainer } from '../components/layout/grid/grid-container';
import { GridItem } from '../components/layout/grid/grid-item';
import { Header } from '../components/typography/header';
import { Separator } from '../components/ui/separator';
import {
  CircularNavigation,
  generatePointsWithLabels,
} from '../components/circular-navigation';
import styled from 'styled-components';
import { useMemo } from 'react';

const Container = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.background};
`;

export const HistoricalDateSection = () => {
  const labels = useMemo(() => ['1', '2', '3', '4', '5', '6'], []);
  const descriptions = useMemo(
    () => ['', 'Кино', 'Литература', '', '', 'Наука'],
    [],
  );
  const pointsWithLabels = useMemo(
    () => generatePointsWithLabels(labels, descriptions),
    [],
  );

  console.log(pointsWithLabels);

  return (
    <Container>
      <CircularNavigation
        points={pointsWithLabels}
        radius={265}
        pointSize={56}
        targetAngle={-55}
        initialDelay={1}
      />
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
          rows: 4,
          rowSize: '18.75rem',
        }}
        $justifyContent="center"
        $alignContent="center"
      >
        <GridItem
          $variant="muted"
          $borderLeft={{ style: 'solid' }}
          $borderBottom={{ style: 'solid' }}
          $borderRadius="none"
          justifyContent="start"
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
          </Flex>
        </GridItem>
        <GridItem
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
        >
          {null}
        </GridItem>
        <GridItem
          $variant="muted"
          $borderRadius="none"
          $borderLeft={{ style: 'solid' }}
          $borderRight={{ style: 'solid' }}
        >
          {null}
        </GridItem>
      </GridContainer>
    </Container>
  );
};
