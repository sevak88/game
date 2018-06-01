var gulp        = require("gulp"),
    del         = require("del"),
    sass        = require("gulp-sass"),
    less        = require("gulp-less"),
    lessChanged = require('gulp-less-changed'),
    concat      = require("gulp-concat"),
    uglify      = require("gulp-uglifyjs"),
    imagemin    = require("gulp-imagemin"),
    htmlmin     = require('gulp-htmlmin');

gulp.task("less", function () {
    return gulp.src([
                "./src/styles/*.less"
            ])
        .pipe(less({outputStyle: 'compressed', javascriptEnabled: true}).on('error', function (error) {
            console.log("less compile error!!!" + error)
        }))
        .pipe(gulp.dest("./src/dist/css"))
});

gulp.task("sass", function () {
    return gulp.src([
                "./src/styles/*.sass"
            ])
        .pipe(sass({outputStyle: 'compressed'}).on('error', function (error) {
            console.log("less compile error!!!" + error)
        }))
        .pipe(gulp.dest("./src/dist/css"))
});


// gulp.task("scripts", function () {
//     return gulp.src([
//                 "./app/uikit/dist/js/uikit.js",
//                 "./app/uikit/dist/js/uikit-icons.js",
//                 "./app/PickMeUp/dist/pickmeup.min.js",
//                 "./app/app.js"
//                 ])
//         .pipe(concat("app.min.js"))
//         .pipe(uglify())
//         .pipe(gulp.dest("./dist/js"))
// });
//
// gulp.task("html", function () {
//     return gulp.src(["./app/*.html"])
//        // .pipe(htmlmin({collapseWhitespace: true}))
//         .pipe(gulp.dest("./dist"))
// });
//
// gulp.task("images", function () {
//     return gulp.src(["./app/images/**/*"])
//         .pipe(imagemin([
//             imagemin.gifsicle({interlaced: true}),
//             imagemin.jpegtran({progressive: true}),
//             imagemin.optipng({optimizationLevel: 5}),
//             imagemin.svgo({
//                 plugins: [
//                     {removeViewBox: true},
//                     {cleanupIDs: false}
//                 ]
//             })
//
//         ]))
//         .pipe(gulp.dest("./dist/images"))
// });

gulp.task('clean', function(){
    return del('./src/dist/**', {force:true});
});

gulp.task("watch", function () {
   //gulp.watch(["./src/styles/*.less"], gulp.series(["less"]));
   gulp.watch(["./src/styles/*.sass"], gulp.series(["sass"]));
   //gulp.watch(["./app/app.js"], ["scripts"]);
   // gulp.watch(["./app/*.html"], ["html"]);
});