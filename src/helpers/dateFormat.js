export const dateRangeFormat = (date) => {
  if (!date) return "";

  console.log(date);

  let dateObj = new Date(date);

  let month = dateObj.getMonth() + 1;
  let day = dateObj.getDate();
  let year = dateObj.getFullYear();

  month = month < 10 ? "0" + month : "" + month;
  day = day < 10 ? "0" + day : "" + day;
  console.log(year + "-" + month + "-" + day);
  return year + "-" + month + "-" + day;
};
