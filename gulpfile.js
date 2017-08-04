/* jshint node: true, esnext: true */
'use strict';

const gulp       = require('gulp');
const rename     = require('gulp-rename');
const concat     = require('gulp-concat');
const uglify     = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');

const ROOTDIR = require('path').dirname(__filename);
const DIST    = ROOTDIR + '/dist';

gulp.task('default', function () {
    return gulp
        .src(['js/multimodal.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('bootstrap-multimodal.js'))
        .pipe(gulp.dest('dist'))
        .pipe(uglify({
            output: {
                comments: require('uglify-save-license')
            }
        }))
        .pipe(sourcemaps.write())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'));
});
