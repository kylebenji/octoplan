import Header from "./components/Header.js";
import ToDoList from "./components/ToDoList.js";
import Information from "./components/Information.js";

function App() {
  return (
    <div className="App text-center">
      <Header />
      <div className="row">
        <ToDoList />
        <Information />
      </div>
    </div>
  );
}

export default App;
