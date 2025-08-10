import { AddNew } from "./addnew";
import { TodoCard } from "./todocard";
import { Droppable } from "@hello-pangea/dnd";

export function CollumnComp(props) {
  return (
    <div className="w-68 bg-black rounded-xl px-1 p-2">
      <div className="font-semibold text-sm text-gray-400 flex items-center justify-between"><div className="pl-2">{props.coll.title}</div>
      <div className="flex items-center justify-between gap-1">
        <div className="hover:bg-gray-400/30 transition-all duration-100 rounded-lg p-1.5"><svg  width="16" height="16" fill="none" viewBox="0 0 16 16" role="presentation"><path fill="currentcolor" fillRule="evenodd" d="M6.25 8.75H0v-1.5h6.25zm3.5-1.5H16v1.5H9.75z" clipRule="evenodd"></path><path fill="currentcolor" fillRule="evenodd" d="M5.19 8 2.22 5.03l1.06-1.06 3.5 3.5a.75.75 0 0 1 0 1.06l-3.5 3.5-1.06-1.06zm4.03-.53 3.5-3.5 1.06 1.06L10.81 8l2.97 2.97-1.06 1.06-3.5-3.5a.75.75 0 0 1 0-1.06" clipRule="evenodd"></path></svg></div>
        <div className="hover:bg-gray-400/30 transition-all duration-100 rounded-lg p-1.5"><svg  width="16" height="16" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z" fill="currentColor"></path></svg></div>
      </div>
      </div>
      <Droppable droppableId={props.coll._id}>
        {(provided) => (
          <div className="min-h-2 max-h-[80vh] overflow-y-auto"
          ref={provided.innerRef}
          {...provided.droppableProps}>            
            {props.task.map((task,index) => (
              <TodoCard
              allTodos={props.task}
              setRefetch={props.setRefetch}
              refetch={props.refetch}
              cardData={props.cardData}
              index={index}
                key={task._id}
                id={task._id}
                title={task.title}
                desc={task.desc}
                due={task.endDate}
                timeAdded={task.timeAdded}
                priority={task.priority}
                members={task.members}
                labels={task.labels}
                attachments={task.attachments}
                location={task.location}
                checklist={task.checklist}
                boardId={task.boardId}
                completed={task.completed}
                reminder={task.reminder}
                startDate={task.startDate}
                endDate={task.endDate}
              ></TodoCard>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className="mt-2">
      <AddNew></AddNew>
      </div>
    </div>
  );
}
