const db = require('../utils/db');

const user_job_titles_exclude = db.execute(`create table if not exists user_job_titles_exclude (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    job_titles VARCHAR(256) NOT NULL,
    time DATETIME NOT NULL
)`)
.then(res => {
    module.exports = res;
})
.catch(err => console.log(err));