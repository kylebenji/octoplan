export default function Header() {
  return (
    <header className="text-center header d-flex align-content-center justify-content-center">
      <h1>
        <img
          className="octopus-icon"
          src={require("../octopus.png")}
          alt="octopus icon"
        ></img>{" "}
        Octoplan
      </h1>
    </header>
  );
}
