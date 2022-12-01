import "./notes.scss";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from "react-beautiful-dnd";
import fire from "assets/img/fire.svg";
import { ReactComponent as IconClose } from "assets/img/iconClose.svg";
import { Cols } from "types/Cols";
import { observer } from "mobx-react-lite";
import { useStores } from "stores";

const Notes = () => {
  const { notesStore } = useStores();

  const onDragEnd = (result: DropResult, columns: Cols) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
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
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
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
        onDragEnd={(result) => onDragEnd(result, notesStore.columns)}
      >
        {Object.entries(notesStore.columns).map(([columnId, column]) => {
          return (
            <div className="notes_block" key={columnId}>
              <h2 className="notes_block__title">{column.name}</h2>
              <div
                className="wrapper__notes_block__main"
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
                        className="notes_block__main"
                        style={{
                          background: snapshot.isDraggingOver
                            ? "#e7e7e7"
                            : "#d3d3d3"
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="block"
                                    style={{
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    <div className="block_header">
                                      <h3>{item.title}</h3>
                                      <IconClose
                                        onClick={() =>
                                          notesStore.deleteNote(
                                            item.id,
                                            columnId
                                          )
                                        }
                                      />
                                    </div>
                                    <p className="block_text">{item.text}</p>
                                    <p className="block_footer">
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
        })}
      </DragDropContext>
    </div>
  );
};

export default observer(Notes);
