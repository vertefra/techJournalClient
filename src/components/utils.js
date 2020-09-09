const sortByDate = (arrayOfElements) => {
  return arrayOfElements.sort((a, b) => {
    const aDate = new Date(a.createdAt);
    const bDate = new Date(b.createdAt);
    return Date.parse(bDate) - Date.parse(aDate);
  });
};

export { sortByDate };
