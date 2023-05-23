import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import Weather from "./Weather";

const dateFormatOptions = {
  month: "long",
  day: "numeric",
  weekday: "long",
};

export default function DailyInfo() {
  return (
    <div className="octoplan-container octoplan-small-container">
      <h3 className="text-center">
        <FontAwesomeIcon icon={faCalendarDays} size="sm" />{" "}
        {new Intl.DateTimeFormat("en-US", dateFormatOptions).format()}
      </h3>
      <Weather />
    </div>
  );
}
