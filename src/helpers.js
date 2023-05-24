//checking to see if two dates have the same month,day,year
export const datesAreOnSameDay = (first, second) => {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
};

//parse dates formatted as yyyy-mm-dd
export const parseInputDate = (dateStr) => {
  const dateArr = dateStr.split("-"); //split input string into component parts
  dateArr[1] = parseInt(dateArr[1], 10) - 1; //making the month value into an indexed value for the Date constructor
  return new Date(...dateArr);
};
