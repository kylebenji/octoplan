const dateFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
};
export default function Footer() {
  return (
    <footer className="footer mt-auto">
      <div className="container text-end">
        <p className="m-0">
          {new Intl.DateTimeFormat("en-US", dateFormatOptions).format()}
        </p>
        <p className="small m-0">
          <a
            href="https://www.flaticon.com/free-icons/octopus"
            title="octopus icons"
          >
            Octopus icons created by Freepik - Flaticon
          </a>
        </p>
      </div>
    </footer>
  );
}
