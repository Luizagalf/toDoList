import "./notes.scss";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableStateSnapshot,
  DropResult,
  DraggableProvided,
  DraggableLocation
} from "react-beautiful-dnd";
import fire from "assets/img/fire.svg";
import { ReactComponent as IconClose } from "assets/img/iconClose.svg";
import { Col, Cols } from "types/Cols";
import { Note } from "types/Note";
import { observer } from "mobx-react-lite";
import { useEffect, useContext } from "react";
import { ServicesContext, StoresContext } from "context";

const Notes = () => {
  const { notesStore } = useContext(StoresContext);
  const { notesService } = useContext(ServicesContext);

  useEffect(() => {
    notesService.getItemsFromLocalStorage();
  }, []);

  const onDragEnd = (result: DropResult, columns: Cols) => {
    if (!result.destination) return;
    const source: DraggableLocation = result.source;
    const destination: DraggableLocation = result.destination;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn: Col = columns[source.droppableId];
      const destColumn: Col = columns[destination.droppableId];
      const sourceItems: Note[] = [...sourceColumn.items];
      const destItems: Note[] = [...destColumn.items];
      const [removed]: Note[] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      notesStore.setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column: Col = columns[source.droppableId];
      const copiedItems: Note[] = [...column.items];
      const [removed]: Note[] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      notesStore.setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

  return (
    <div className="notes">
      <DragDropContext
        onDragEnd={(result: DropResult) =>
          onDragEnd(result, notesStore.columns)
        }
      >
        {Object.entries(notesStore.columns).map(
          ([columnId, column]: [string, Col]) => {
            return (
              <div className="notes__block" key={columnId}>
                <h2 className="notes__title">{column.name}</h2>
                <div
                  className="notes__notions-container"
                  style={{
                    opacity: column.items.length ? "1" : "0.7"
                  }}
                >
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="notes__notion"
                          style={{
                            background: snapshot.isDraggingOver
                              ? "#e7e7e7"
                              : "#d3d3d3"
                          }}
                        >
                          {column.items.map((item: Note, index: number) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(
                                  provided: DraggableProvided,
                                  snapshot: DraggableStateSnapshot
                                ) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="notes__notion-block"
                                      style={{
                                        backgroundColor: snapshot.isDragging
                                          ? "#263B4A"
                                          : "#456C86",
                                        ...provided.draggableProps.style
                                      }}
                                    >
                                      <div className="notes__notion-header">
                                        <h3>{item.title}</h3>
                                        <IconClose
                                          onClick={() =>
                                            notesService.deleteNote(
                                              item.id,
                                              columnId
                                            )
                                          }
                                        />
                                      </div>
                                      <p className="notes__notion-text">
                                        {item.text}
                                      </p>
                                      <p className="notes__notion-footer">
                                        <img
                                          src={fire}
                                          alt="priority"
                                          style={{
                                            filter:
                                              item.priority === "3"
                                                ? "invert(11%) sepia(91%) saturate(6739%) hue-rotate(8deg) brightness(80%) contrast(114%)"
                                                : item.priority === "2"
                                                ? "invert(55%) sepia(88%) saturate(1894%) hue-rotate(359deg) brightness(100%) contrast(105%)"
                                                : "invert(98%) sepia(6%) saturate(2935%) hue-rotate(350deg) brightness(114%) contrast(105%)"
                                          }}
                                        />
                                        {item.date}
                                      </p>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          }
        )}
      </DragDropContext>
    </div>
  );
};

export default observer(Notes);
