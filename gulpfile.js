var {series , parallel , src , dest , watch} = require('gulp')
var clean = require('gulp-clean')
var webserver = require('gulp-webserver')
var sass = require('gulp-sass');
var fileinclude = require('gulp-file-include')
function cleanTask(){
    return src('./dist',{allowEmpty:true})
            .pipe(clean());
}

function htmlTask(){
    return src('./src/view/*.html')
            .pipe(fileinclude({prefix:'@',basepath:'./src/view/templates'}))
            .pipe(dest('./dist/view'))
}
function webTask(){
    return src('./dist')
              .pipe(webserver({
                host : 'localhost',
                port : 4000,
                open : './view/index.html',  // dist下的index.html
                livereload : true
              }));
}
function apiTask(){
    return src('./src/api/**')
            .pipe(dest('./dist/api'))
}
function cssTask(){
    return src('./src/css/*.scss')
            .pipe(sass())
            .pipe(dest('./dist/css'))
}
function staticTask(){
    return src('./src/static/**')
            .pipe(dest('./dist/static'))
}
function libTask(){
    return src('./src/lib/**')
            .pipe(dest('./dist/lib'))
}
function jsTask(){
    return src('./src/js/**')
            .pipe(dest('./dist/js'))
}


function watchTask(){
    watch('./src/view/**' , htmlTask);
    watch('./src/static/**' , staticTask);
    watch('./src/lib/**' , libTask);
    watch('./src/api/**' , apiTask);
    watch('./src/js/**' , jsTask);
    watch('./src/css/**' , cssTask);
}
module.exports = {
    dev:series(cleanTask,parallel(htmlTask,apiTask,cssTask,staticTask,libTask,jsTask),parallel(webTask,watchTask)),
    build:series(cleanTask)
}