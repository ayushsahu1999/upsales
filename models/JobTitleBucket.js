const db = require('../utils/db');

const job_title_bucket = db.execute(`create table if not exists job_title_bucket (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    created_by_user_id INT NOT NULL,
    create_date DATETIME NOT NULL,
    update_date DATETIME NOT NULL,
    bucket_name VARCHAR(255) NOT NULL UNIQUE,
    titles VARCHAR(256) NOT NULL
)`)
.then(res => {
    module.exports = res;
})
.catch(err => console.log(err));