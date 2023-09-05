export const dateRangeFormat = (date) => {
  if (!date) return "";

  let dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    // Invalid date
    return "";
  }

  let month = dateObj.getMonth() + 1;
  let day = dateObj.getDate();
  let year = dateObj.getFullYear();

  month = month < 10 ? '0' + month : '' + month;
  day = day < 10 ? '0' + day : '' + day;

  return year + '-' + month + '-' + day;
};