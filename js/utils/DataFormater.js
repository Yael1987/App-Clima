export default class DataFormater {
  formatHourFromUnix(hourUnix) {
    return new Date(hourUnix * 1000).getHours().toString().padStart(2, "0");
  }

  formatDate(date, timeZone) {
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZone,
    };

    const formatter = new Intl.DateTimeFormat("es-MX", options);

    return formatter.format(date);
  }
}