const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");


const base = {
    sass: 'sass/',
    sassWatch: 'sass/**.sass',
    sassFile: 'base.sass',
    cssDir: 'css/',
    cssFile: 'style.css'
}

gulp.task('sass', function () {
    return gulp.src(base.sass + base.sassFile)
        .pipe(sass().on('error', sass.logError))
        .pipe(rename(base.cssFile))
        .pipe(gulp.dest(base.cssDir));
});


gulp.task( 'watch', function (){
    gulp.watch([base.sassWatch], gulp.series('sass'));
});