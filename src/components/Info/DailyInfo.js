import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";

export default function DailyInfo() {
  return (
    <div className="octoplan-container octoplan-small-container">
      <h3 className="text-center">
        <FontAwesomeIcon icon={faCalendarDays} size="sm" /> Daily Info
      </h3>
    </div>
  );
}
