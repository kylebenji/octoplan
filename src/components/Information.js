import TaskSpecifics from "./Info/TaskSpecifics";
import DailyInfo from "./Info/DailyInfo";

export default function Information() {
  return (
    <div className="col-md-6">
      <TaskSpecifics />
      <DailyInfo />
    </div>
  );
}
