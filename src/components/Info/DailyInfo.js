import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import Weather from "./Weather";
import { selectTaskData } from "../../store/toDoSlice";
import { useSelector } from "react-redux";

const dateFormatOptions = {
  month: "long",
  day: "numeric",
  weekday: "long",
};

function TaskSummary() {
  const taskData = useSelector(selectTaskData);

  return (
    <div className="daily-stats">
      <p>Tasks Due Today: {taskData.tasksDueToday}</p>
      <p>Tasks Completed Today: {taskData.tasksCompletedToday}</p>
      <p>Tasks Past Due: {taskData.tasksPastDue}</p>
    </div>
  );
}

export default function DailyInfo() {
  return (
    <div className="octoplan-container octoplan-small-container daily-info-container">
      <h2 className="text-center">
        <FontAwesomeIcon icon={faCalendarDays} size="sm" />{" "}
        {new Intl.DateTimeFormat("en-US", dateFormatOptions).format()}
      </h2>
      <TaskSummary />
      <Weather />
    </div>
  );
}
