import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  selectActive,
  selectList,
  changeActive,
  toggleToDo,
} from "../store/toDoSlice";
import { openDetails, selectView, openCreate } from "../store/detailsSlice";
import * as config from "../config";
import { selectFilters, setSortBy, toggleFilter } from "../store/filtersSlice";

function OptionsBar({ filters, sort }) {
  const dispatch = useDispatch();

  return (
    <div className="options-bar d-flex">
      <div className="dropdown filter-dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          type="button"
        >
          Filters
        </button>
        <div className="dropdown-menu">
          <button
            className="dropdown-item"
            type="button"
            onClick={() => dispatch(toggleFilter({ filter: "completed" }))}
          >
            <input type="checkbox" checked={filters.completed} readOnly></input>{" "}
            Completed
          </button>
        </div>
      </div>
      <div className="dropdown sort-dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          data-bs-toggle="dropdown"
          type="button"
        >
          Sort
        </button>
        <div className="dropdown-menu">
          {Object.entries(sort.sortStates).map((sortType) => {
            return (
              <button
                key={sortType[0]}
                className={`dropdown-item ${
                  sortType[1] === filters.sortBy ? "active" : ""
                }`}
                type="button"
                onClick={() => dispatch(setSortBy({ sortBy: sortType[1] }))}
              >
                {sortType[1]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ToDoItem({ item }) {
  const active = useSelector(selectActive);
  const view = useSelector(selectView);
  const dispatch = useDispatch();

  return (
    <button
      className={`d-flex align-items-center list-group-item list-group-item-action${
        active === item.id ? " active" : ""
      }${item.completed ? " completed" : ""}`}
      onClick={() => {
        if (view !== config.TASK_DETAILS) dispatch(openDetails());
        if (active !== item.id) dispatch(changeActive({ id: item.id }));
      }}
    >
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => dispatch(toggleToDo({ id: item.id }))}
      ></input>
      <p className="list-item-text">{item.name}</p>
    </button>
  );
}

export default function ToDoList() {
  const list = useSelector(selectList);
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();

  //sorting
  const sortStates = {
    none: "None",
    date: "Date",
    priorityHL: "Priority (H-L)",
    priorityLH: "Priority (L-H)",
  };

  //apply filters
  const filteredList = list.filter((task) => {
    let shouldShow = true;
    if (!filters.completed) {
      if (task.completed) shouldShow = false;
    }
    return shouldShow;
  });

  //creating new task
  const handleNewTask = () => {
    dispatch(changeActive({ id: -1 }));
    dispatch(openCreate());
  };

  return (
    <div className="col-md-6">
      <div className="octoplan-container to-do-list-container">
        <header className="row text-center">
          <h2 className="">
            <FontAwesomeIcon icon={faBars} size="sm" /> ToDoList
          </h2>
        </header>
        <OptionsBar filters={filters} sort={{ sortStates }} />
        <ul className="list-group">
          {filteredList.map((el) => {
            return <ToDoItem item={el} key={el.id} />;
          })}
        </ul>
        <button
          id="btn-new-task"
          className="btn btn-sm btn-primary"
          onClick={handleNewTask}
        >
          +
        </button>
      </div>
    </div>
  );
}
