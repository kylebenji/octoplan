import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
import { selectView } from "../../store/detailsSlice";
import { TASK_DETAILS, TASK_EDIT } from "../../config";
import { selectActive } from "../../store/toDoSlice";

function EditTask() {
  return (
    <h3 className="text-center">
      <FontAwesomeIcon icon={faPenToSquare} size="sm" />
      Edit Task
    </h3>
  );
}

function TaskDetails() {
  const taskID = useSelector(selectActive);
  const task = useSelector((state) =>
    state.todos.list.find((todo) => todo.id === taskID)
  );
  return (
    <div>
      <h3 className="text-center">
        <FontAwesomeIcon icon={faPenToSquare} size="sm" />
        Task Specifics
      </h3>
      {task ? <h6>{task.text}</h6> : ""}
    </div>
  );
}

export default function TaskSpecifics() {
  const view = useSelector(selectView);
  return (
    <div className="octoplan-container octoplan-small-container mb-3">
      {view === TASK_DETAILS ? (
        <TaskDetails />
      ) : view === TASK_EDIT ? (
        <EditTask />
      ) : (
        ""
      )}
    </div>
  );
}
