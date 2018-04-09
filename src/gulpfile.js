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