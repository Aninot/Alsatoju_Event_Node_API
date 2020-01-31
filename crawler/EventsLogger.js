const fs = require('fs');

let filename = new Date().toString();
let content = ' événements enregistrés !';

var logger = function (count, start_date, end_date) {
  fs.writeFile('crawler/EventsLogs/' + filename.replace(' ', '_') + '.txt',
    start_date
    + ' - '
    + end_date
    + '\n'
    + count
    + content, (err) => {
      if (err) {
        console.error(err);

      }
    }
  )
};
module.exports = logger;
