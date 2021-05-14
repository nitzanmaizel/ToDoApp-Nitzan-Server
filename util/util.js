const compareTaskDatesWithQuerySearch = (mongoData, queryDate) => {
   let convertDate = convertMongoDateObj(mongoData);
   if (convertDate === queryDate) return true;
   else return false;
};

const convertMongoDateObj = (date) => {
   let d = new Date(date);
   let year = d.getFullYear();
   let month = d.getMonth() + 1;
   let day = d.getDate();
   return `${day}-${month}-${year}`;
};

module.exports = { compareTaskDatesWithQuerySearch };
