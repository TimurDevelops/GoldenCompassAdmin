// import React, {useState} from 'react';
import React from 'react';
import PropTypes from "prop-types";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

import SlideItem from "./slideItem/SlideItem";

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

const SlideList = ({slides, setSlidesOrder, deleteSlide, openSlide}) => {

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
                      <SlideItem slide={slide}
                                 deleteSlide={() => deleteSlide(slide._id)}
                                 openSlide={() => openSlide(slide._id)}/>
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
  setSlidesOrder: PropTypes.func.isRequired,
  deleteSlide: PropTypes.func.isRequired,
  openSlide: PropTypes.func.isRequired

};

export default SlideList;