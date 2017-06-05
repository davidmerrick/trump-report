'use strict';

import gulp from "gulp";
import s3 from "gulp-s3-upload";

gulp.task('deploy', () => {
    const s3Config = {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    };

    let s3Uploader = s3(s3Config);
    gulp.src('public/**')
        .pipe(s3Uploader(
            {
                Bucket: process.env.S3_BUCKET,
                ACL: 'public-read'
            }, {
                maxRetries: 5
            })
        );
});

gulp.task('default', ['deploy']);