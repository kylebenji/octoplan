import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  selectActive,
  selectList,
  changeActive,
  toggleToDo,
} from "../store/toDoSlice";
import { openDetails } from "../store/detailsSlice";

function ToDoItem({ item }) {
  const active = useSelector(selectActive);
  const dispatch = useDispatch();
  return (
    <button
      className={`d-flex align-items-center list-group-item list-group-item-action${
        active === item.id ? " active" : ""
      }${item.completed ? " completed" : ""}`}
      onClick={() => {
        dispatch(openDetails());
        dispatch(changeActive({ id: item.id }));
      }}
    >
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => dispatch(toggleToDo({ id: item.id }))}
      ></input>
      <p className="mb-0 list-item-text">{item.text}</p>
    </button>
  );
}

export default function ToDoList() {
  const list = useSelector(selectList);
  const dispatch = useDispatch();

  return (
    <div className="col-md-6">
      <div className="octoplan-container to-do-list-container">
        <header className="row text-center">
          <h2 className="">
            <FontAwesomeIcon icon={faBars} size="sm" />
            ToDoList
          </h2>
        </header>
        <ul className="list-group">
          {list.map((el) => {
            return <ToDoItem item={el} key={el.id} />;
          })}
        </ul>
      </div>
    </div>
  );
}
