const dateFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
  hour: "numeric",
  minute: "numeric",
};
export default function Footer() {
  return (
    <footer className="text-end">
      <p>{new Intl.DateTimeFormat("en-US", dateFormatOptions).format()}</p>
    </footer>
  );
}
