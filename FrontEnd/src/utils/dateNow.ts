export function getFormattedTodayDate() {
    const today = new Date();
  
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = today.getFullYear();
  
    const formattedDate = `${day}/${month}/${year}`;
  
    return formattedDate;
  }