const dateToString = (date) => {
  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  return new Date(date).toLocaleDateString("en-US", options);
}

export default {
  dateToString,
};
