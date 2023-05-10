import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function ToDoList() {
  return (
    <div className="col-md-6">
      <div className="octoplan-container to-do-list-container">
        <header className="row">
          <h2 className="">
            <FontAwesomeIcon icon={faBars} size="sm" />
            ToDoList
          </h2>
        </header>
      </div>
    </div>
  );
}
