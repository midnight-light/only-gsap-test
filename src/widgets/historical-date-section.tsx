import { Flex } from '../components/layout/flex';
import { GridContainer } from '../components/layout/grid/grid-container';
import { GridItem } from '../components/layout/grid/grid-item';
import { Header } from '../components/typography/header';
import { Separator } from '../components/ui/separator';

export const HistoricalDateSection = () => {
  return (
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
        $borderRight={{ style: 'solid' }}
        $borderLeft={{ style: 'solid' }}
      >
        {null}
      </GridItem>
      <GridItem
        $variant="muted"
        $borderRadius="none"
        $borderRight={{ style: 'solid' }}
      >
        {null}
      </GridItem>
    </GridContainer>
  );
};
