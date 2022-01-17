import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) => (props.isDragging ? "yellow" : "white")};
  border-radius: 5px;
  padding: 10px;
  text-align: center;
  margin: 5px 0px;
  color: tomato;
  font-size: 22px;
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(20,20,20,0.7)" : null};
`;

interface IProps {
  e: string;
  index: number;
}

const DragCard = ({ e, index }: IProps) => {
  return (
    <Draggable key={e} draggableId={e} index={index}>
      {(pro, snapshot) => (
        <Card
          ref={pro.innerRef}
          isDragging={snapshot.isDragging}
          {...pro.draggableProps}
          {...pro.dragHandleProps}
        >
          {e}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DragCard);
