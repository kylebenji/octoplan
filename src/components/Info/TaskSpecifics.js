import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

export default function TaskSpecifics() {
  return (
    <div className="octoplan-container octoplan-small-container mb-3">
      <h3>
        <FontAwesomeIcon icon={faPenToSquare} size="sm" />
        Task Specifics
      </h3>
    </div>
  );
}
