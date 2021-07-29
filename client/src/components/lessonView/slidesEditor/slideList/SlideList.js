// import React, {useState} from 'react';
import React from 'react';
import PropTypes from "prop-types";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
// import {ListManager} from "react-beautiful-dnd-grid";

import SlideItem from "./slideItem/SlideItem";

// const SlideList = ({slides}) => {
//
//   const sortList = () => {
//     const list = sortedList.slice().sort((first, second) => first.order - second.order);
//
//     setSortedList(list)
//   }
//
//   const [sortedList, setSortedList] = useState(slides.map((slide, index) => {
//     return {order: index,  id: slide._id, tip: slide.tip, img: 'slide.img'}
//   }));
//
//   const reorderList = (sourceIndex, destinationIndex) => {
//     if (destinationIndex === sourceIndex) {
//       return;
//     }
//     const list = sortedList;
//     if (destinationIndex === 0) {
//       list[sourceIndex].order = list[0].order - 1;
//       sortList();
//       return;
//     }
//     if (destinationIndex === list.length - 1) {
//       list[sourceIndex].order = list[list.length - 1].order + 1;
//       sortList();
//       return;
//     }
//     if (destinationIndex < sourceIndex) {
//       list[sourceIndex].order = (list[destinationIndex].order + list[destinationIndex - 1].order) / 2;
//       sortList();
//       return;
//     }
//     list[sourceIndex].order = (list[destinationIndex].order + list[destinationIndex + 1].order) / 2;
//     sortList();
//   }
//
//
//   return (
//     <ListManager
//       items={sortedList}
//       direction="horizontal"
//       maxItems={3}
//       render={slide => <SlideItem slide={slide}/>}
//       onDragEnd={() => reorderList()}
//     />
//
//   )
// }

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  margin: `0 ${grid}px 0 0`,
  height: '100%',

  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  display: 'flex',
  padding: grid,
  overflow: 'auto',
  height: '30vh',
});

const SlideList = ({slides, setSlidesOrder}) => {

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      slides,
      result.source.index,
      result.destination.index
    );

    setSlidesOrder(items);
  }

  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
      <Droppable droppableId="slides-list-wrapper" direction="horizontal">
        {(provided, snapshot) => (
          <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} {...provided.droppableProps} >
            {slides.map((slide, index) => {
              return (
                <Draggable key={slide._id} draggableId={slide._id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <SlideItem slide={slide}/>
                    </div>
                  )}
                </Draggable>
              )
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

SlideList.propTypes = {
  slides: PropTypes.array.isRequired,
  setSlidesOrder: PropTypes.func.isRequired
};

export default SlideList;