export default class DataFormater {
  timeZone; 

  formatHourFromUnix(hourUnix) {
    return new Date(hourUnix * 1000).getHours().toString().padStart(2, "0");
  }

  formatDate(date, timeZone) {
    this.timeZone = timeZone;

    const options = {
      weekday: "long",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZone,
    };

    const formatter = new Intl.DateTimeFormat("es-MX", options);

    return formatter.format(date);
  }

  formatDateForCard(date) {
    const options = {
      weekday: "long",
      month: "short",
      day: "numeric",
      timeZone: this.timeZone,
    };

    const formatter = new Intl.DateTimeFormat("es-MX", options);
    const dayName = formatter.format(date).split(' ')[0];
    const dateName = formatter.format(date).replace(dayName, '').trim();

    return {
      day: dayName,
      full: dateName
    }
  }
}