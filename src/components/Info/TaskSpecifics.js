import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { selectView, openEdit, openDetails } from "../../store/detailsSlice";
import * as config from "../../config";
import { selectActive, submitToDo } from "../../store/toDoSlice";

function formatPriority(priority) {
  switch (priority) {
    case config.HIGH_PRIORITY:
      return "High";
    case config.MID_PRIORITY:
      return "Normal";
    case config.LOW_PRIORITY:
      return "Low";
  }
}

function EditTask() {
  const dispatch = useDispatch();

  const handleSubmit = function (e) {
    e.preventDefault();

    const form = e.target;

    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());

    console.log(formJson);

    dispatch(submitToDo(formJson));
    dispatch(openDetails());
  };

  return (
    <>
      <h3 className="text-center">
        <FontAwesomeIcon icon={faPenToSquare} size="sm" /> Edit Task
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="form-part">
          <label>Name: </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Wash the Dishes"
          ></input>
        </div>
        <div className="form-part">
          <label>Date: </label>
          <input id="date" type="date" name="date"></input>
          <select className="col-3 mx-1" name="priority" id="priority">
            <option selected>Priority</option>
            <option value={config.HIGH_PRIORITY}>High</option>
            <option value={config.MID_PRIORITY}>Normal</option>
            <option value={config.LOW_PRIORITY}>Low</option>
          </select>
        </div>
        <div className="form-part">
          <label>Notes: </label>
          <textarea
            id="notes"
            type="text"
            name="notes"
            placeholder="Make sure you use the blue dish soap"
          ></textarea>
        </div>
        <button type="submit">Create Task</button>
      </form>
    </>
  );
}

function TaskDetails() {
  const taskID = useSelector(selectActive);
  const dispatch = useDispatch();

  const task = useSelector((state) =>
    state.todos.list.find((todo) => todo.id === taskID)
  );

  const handleDelete = function (e) {
    e.preventDefault();
  };

  const handleEdit = function (e) {
    e.preventDefault();
    dispatch(openEdit());
  };

  return (
    <div>
      <h3 className="text-center">
        <FontAwesomeIcon icon={faPenToSquare} size="sm" /> Task Specifics
      </h3>
      {task ? (
        <>
          <h6>{task.name}</h6>
          <p>Date: {task.date}</p>
          <p>Priority: {formatPriority(task.priority)}</p>
          <p>Notes: {task.notes}</p>

          <div id="task-buttons">
            <button
              type="button"
              className="btn btn-warning"
              onClick={handleEdit}
            >
              edit
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              delete
            </button>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default function TaskSpecifics() {
  const view = useSelector(selectView);
  return (
    <div className="octoplan-container octoplan-small-container mb-3">
      {view === config.TASK_DETAILS ? (
        <TaskDetails />
      ) : view === config.TASK_EDIT ? (
        <EditTask />
      ) : (
        ""
      )}
    </div>
  );
}
