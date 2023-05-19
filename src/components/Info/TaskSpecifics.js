import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { selectView, openEdit, openDetails } from "../../store/detailsSlice";
import * as config from "../../config";
import {
  selectActive,
  submitToDo,
  deleteToDo,
  changeActive,
  editToDo,
} from "../../store/toDoSlice";
import Select from "react-select";
import { useState } from "react";

function formatPriority(priority) {
  switch (priority) {
    case config.HIGH_PRIORITY:
      return "High";
    case config.MID_PRIORITY:
      return "Normal";
    case config.LOW_PRIORITY:
      return "Low";
    default:
      return "Normal";
  }
}

function EditTask({ view }) {
  const dispatch = useDispatch();
  const taskID = useSelector(selectActive);
  const task = useSelector((state) =>
    state.todos.list.find((todo) => todo.id === taskID)
  );

  const [selectedPriority, setSelectedPriority] = useState(task?.priority);

  const handleSubmit = function (e) {
    e.preventDefault();

    const form = e.target;

    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());

    formJson.priority = selectedPriority;
    formJson.id = taskID;

    console.log(formJson);

    if (view === config.TASK_CREATE) {
      dispatch(submitToDo(formJson));
    }
    if (view === config.TASK_EDIT) {
      dispatch(editToDo(formJson));
    }

    dispatch(openDetails());
  };

  const getInputDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}-${("" + (date.getMonth() + 1)).padStart(
      2,
      "0"
    )}-${date.getDate()}`;
  };

  const priorities = [
    config.HIGH_PRIORITY,
    config.MID_PRIORITY,
    config.LOW_PRIORITY,
  ];

  const prioritySelectOptions = priorities.map((el) => {
    return { value: el, label: formatPriority(el) };
  });

  const handlePriorityChange = (e) => {
    setSelectedPriority(e.value);
  };

  return (
    <>
      <h3 className="text-center">
        <FontAwesomeIcon icon={faPenToSquare} size="sm" />{" "}
        {view === config.TASK_CREATE ? "Create" : "Edit"} Task
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="form-part">
          <label>Name: </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Wash the Dishes"
            defaultValue={task?.name ? task.name : ""}
            required
          ></input>
        </div>
        <div className="form-part">
          <label>Date: </label>
          <input
            id="date"
            type="date"
            name="date"
            defaultValue={task?.date ? getInputDate(task.date) : ""}
          ></input>
          <Select
            options={prioritySelectOptions}
            className="col-3"
            placeholder="Priority"
            defaultValue={
              task?.priority
                ? { value: task.priority, label: formatPriority(task.priority) }
                : {}
            }
            onChange={handlePriorityChange}
          />
        </div>
        <div className="form-part">
          <label>Notes: </label>
          <textarea
            id="notes"
            type="text"
            name="notes"
            placeholder="Make sure you use the blue dish soap"
            defaultValue={task?.notes ? task.notes : ""}
          ></textarea>
        </div>
        <button id="task-buttons" type="submit" className="btn btn-primary">
          Submit
        </button>
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
    dispatch(deleteToDo({ id: taskID }));
    dispatch(changeActive({ id: -1 }));
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
          {task.date ? <p>Date: {task.date}</p> : ""}
          <p>Priority: {formatPriority(task.priority)}</p>
          {task.notes ? <p>Notes: {task.notes}</p> : ""}

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
      ) : view === config.TASK_EDIT || view === config.TASK_CREATE ? (
        <EditTask view={view} />
      ) : (
        ""
      )}
    </div>
  );
}
