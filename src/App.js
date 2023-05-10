import Header from "./components/Header.js";
import ToDoList from "./components/ToDoList.js";
import Information from "./components/Information.js";
import Footer from "./components/Footer.js";

function App() {
  return (
    <div className="App text-center container">
      <Header />
      <div className="row gx-3">
        <ToDoList />
        <Information />
      </div>
      <Footer />
    </div>
  );
}

export default App;
