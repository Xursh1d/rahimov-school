export const dateRangeFormat = (date) => {
  let dateObj = new Date(date);
  let month = dateObj.getMonth() + 1;
  let day = dateObj.getDate();
  let year = dateObj.getFullYear();
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  let newdate = year + "-" + month + "-" + day;
  if (date) {
    return newdate;
  } else return "";
};
