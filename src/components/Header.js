export default function Header() {
  return (
    <header className="text-center">
      <h1>
        <img
          className="octopus-icon"
          src={require("../octopus.png")}
          alt="octopus icon"
        ></img>
        Octoplan
      </h1>
    </header>
  );
}
