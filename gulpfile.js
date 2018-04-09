"use strict";

const gulp = require("gulp");
const connect = require("gulp-connect");
const open = require("gulp-open");

let config = { 
   port: 9005,
   devBaseUrl: "http://localhost",
   paths: {
       html: "./src/*.html",
       dist: "./dist"
   } 
};

const START_CONNECT_TASK = "boot:start-connect";
const BROWSE_APP_TASK = "boot:browse-app";
const COPY_SOURCE_TASK = "boot:copy-source";
const WATCH_SOURCE_TASK = "boot:watch-source";


/**
 * Gulp task for running a local dev server 
 * with live reloading capability.
 */
gulp.task(START_CONNECT_TASK, function() {
    connect.server({
        root: "dist",
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

/**
 * Gulp task for opening the app after the 
 * web server started.
 */
gulp.task(BROWSE_APP_TASK, [START_CONNECT_TASK], function() {
    gulp.src("dist/index.html")
                .pipe(open({
                    uri: (config.devBaseUrl + ":" + config.port + "/")
                }));
});

/**
 * Gulp task for copying task source files
 * to distribution folder.
 */
gulp.task(COPY_SOURCE_TASK, function() {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

/**
 * Gulp task for watching changes.
 */
gulp.task(WATCH_SOURCE_TASK, function() {
    gulp.watch(config.paths.html, [COPY_SOURCE_TASK])
});

gulp.task("default", [COPY_SOURCE_TASK, WATCH_SOURCE_TASK, BROWSE_APP_TASK]);