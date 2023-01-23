const db = require('../util/database');

module.exports = {

    search: async function({ parameters }, req) {
        const userJobTitlesInclude = parameters.userJobTitlesInclude;
        const userJobTitlesExclude = parameters.userJobTitlesExclude;

        const userId = 1;
        const userJobTitleIncludeArray = [];
        const userJobTitleExcludeArray = [];

        userJobTitleInclude.split(',').map(async title => {
            if (title.startsWith('bucket: ')) {
                const bucketTitles = await db.execute('SELECT titles FROM job_title_bucket WHERE bucket_name = ?', [title.substr(8)]);
                if (bucketTitles[0][0]) {
                    bucketTitles[0].split(',').map(btitle => {
                        userJobTitleIncludeArray.push(btitle.titles);
                    });
                }
            } else {
                userJobTitleIncludeArray.push(title);
            }
        });

        userJobTitleExclude.split(',').map(async title => {
            if (title.startsWith('bucket: ')) {
                const bucketTitles = await db.execute('SELECT titles FROM job_title_bucket WHERE bucket_name = ?', [title.substr(8)]);
                if (bucketTitles[0][0]) {
                    bucketTitles[0].split(',').map(btitle => {
                        userJobTitleExcludeArray.push(btitle.titles);
                    });
                }
            } else {
                userJobTitleExcludeArray.push(title);
            }
        });

        await db.execute('INSERT INTO user_job_titles_include (user_id, job_titles, time) VALUES (?, ?, ?)',
                [userId, userJobTitleIncludeArray.toString(), Date.now()]);

        await db.execute('INSERT INTO user_job_titles_exclude (user_id, job_titles, time) VALUES (?, ?, ?)',
                [userId, userJobTitleExcludeArray.toString(), Date.now()]);

        const resp = '';

        const jobsToInclude = '(';

        userJobTitleIncludeArray.map(jobTitle => {
            jobsToInclude.concat('title:' + jobTitle + ' OR ');
        });
        if (userJobTitleIncludeArray.length > 0) {
            jobsToInclude = jobsToInclude.substring(0, jobsToInclude.length - 4);
            jobsToInclude.concat(')');
        }
        
    },

    testMutation: async function({ key }, req) {
        // console.log(key);

        const res = {
            response: key
        };

        return res;
    },

    testQuery: async function({ key }, req) {

        const res = {
            response: key
        };

        return res;
    }
}