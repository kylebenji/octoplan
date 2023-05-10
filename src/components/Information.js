import TaskSpecifics from "./Info/TaskSpecifics";
import DailyInfo from "./Info/DailyInfo";

export default function Information() {
  return (
    <div className="container col-6">
      <TaskSpecifics />
      <DailyInfo />
    </div>
  );
}
