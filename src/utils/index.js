import md5 from "blueimp-md5";

const password = import.meta.env.VITE_APP_API_PASSWORD;


export function getCurrentDateAsString() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(currentDate.getDate()).padStart(2, '0'); 
    const dateString = `${year}${month}${day}`;;
    return dateString;
  }

  const todayString = getCurrentDateAsString();

 export const token = md5(`${password}${todayString}`);
export const url = 'http://api.valantis.store:40000/';

export function filterUniqueIds(originalArray) {
  const uniqueIdMap = {};
  const uniqueArray = [];

  originalArray.forEach((item) => {
    if (!uniqueIdMap[item.id]) {
      uniqueIdMap[item.id] = true;
      uniqueArray.push(item);
    }
  });

  return uniqueArray;
}
