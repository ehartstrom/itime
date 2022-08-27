import { Box, Container, createStyles, Space, Text, useMantineTheme } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { ClientOnly } from "remix-utils";

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const useStyles = createStyles((theme) => ({
  item: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },

  symbol: {
    fontSize: 30,
    fontWeight: 700,
    width: 60,
  },
}));

// interface DndListProps {
//   data: {
//     position: number;
//     mass: number;
//     symbol: string;
//     name: string;
//   }[];
// }


export default function DndList() {

  const data =  [
      {
        "position": 6,
        "mass": 12.011,
        "symbol": "C",
        "name": "Carbon"
      },
      {
        "position": 7,
        "mass": 14.007,
        "symbol": "N",
        "name": "Nitrogen"
      },
      {
        "position": 39,
        "mass": 88.906,
        "symbol": "Y",
        "name": "Yttrium"
      },
      {
        "position": 56,
        "mass": 137.33,
        "symbol": "Ba",
        "name": "Barium"
      },
      {
        "position": 58,
        "mass": 140.12,
        "symbol": "Ce",
        "name": "Cerium"
      }
    ]
  

  const { classes, cx } = useStyles();
  const [state, handlers] = useListState(data);
  const [list2, l2handlers] = useListState();

  const items = state.map((item, index) => (
    <Draggable key={item.symbol} index={index} draggableId={item.symbol}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          
          ref={provided.innerRef}
        >
          <Text className={classes.symbol}>{item.symbol}</Text>
          <div>
            <Text>{item.name}</Text>
            <Text color="dimmed" size="sm">
              Position: {item.position} • Mass: {item.mass}
            </Text>
          </div>
        </div>
      )}
    </Draggable>
  ));

  const list2_items = state.map((item, index) => (
    <Draggable key={item.symbol} index={index} draggableId={item.symbol}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          
          ref={provided.innerRef}
        >
          <Text className={classes.symbol}>{item.symbol}</Text>
          <div>
            <Text>{item.name}</Text>
            <Text color="dimmed" size="sm">
              Position: {item.position} • Mass: {item.mass}
            </Text>
          </div>
        </div>
      )}
    </Draggable>
  ));

  const theme = useMantineTheme()
  return (
    <Container>
    <Box component='div' sx={(theme) => ({backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]})}>
      <ClientOnly >{() => (
    <DragDropContext
      onDragEnd={({ destination, source }) =>
        handlers.reorder({ from: source.index, to: destination?.index || 0 })
      }
    >
      <Droppable droppableId="dnd-list" direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
    )}
    </ClientOnly>
    </Box>
    <Space />
    <Box component='div' sx={(theme) => ({backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.blue[0]})}>
        <DragDropContext
          onDragEnd={({ destination, source }) =>
        l2handlers.reorder({ from: source.index, to: destination?.index || 0 })
      }
    >
      <Droppable droppableId="dnd-list" direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {list2_items}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

          </DragDropContext>

    </Box>
    </Container>
  );
}

