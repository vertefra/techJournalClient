const sortByDate = (arrayOfElements) => {
  return arrayOfElements.sort((a, b) => {
    const aDate = new Date(a.createdAt);
    const bDate = new Date(b.createdAt);
    return Date.parse(bDate) - Date.parse(aDate);
  });
};

// weekday
// The representation of the weekday. Possible values are:
// "long" (e.g., Thursday)
// "short" (e.g., Thu)
// "narrow" (e.g., T). Two weekdays may have the same narrow style for some locales (e.g. Tuesday's narrow style is also T).

// year
// The representation of the year. Possible values are:
// "numeric" (e.g., 2012)
// "2-digit" (e.g., 12)

// month
// The representation of the month. Possible values are:
// "numeric" (e.g., 2)
// "2-digit" (e.g., 02)
// "long" (e.g., March)
// "short" (e.g., Mar)
// "narrow" (e.g., M). Two months may have the same narrow style for some locales (e.g. May's narrow style is also M).

// day
// The representation of the day. Possible values are:
// "numeric" (e.g., 1)
// "2-digit" (e.g., 01)

const entryFormat = {
  weekday: "short",
  year: "2-digit",
  month: "short",
  day: "2-digit",
};

const eventFormat = {
  weekday: "short",
  year: "2-digit",
  month: "short",
  day: "2-digit",
  hours: "long",
};

const formatDate = (createdAt, options) => {
  const event = new Date(createdAt);
  return event.toLocaleString("en-EN", options);
};

export { sortByDate, formatDate, entryFormat, eventFormat };
