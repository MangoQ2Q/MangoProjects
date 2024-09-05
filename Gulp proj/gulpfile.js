const {src, dest, series, watch} = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const del = require('del');
const browserSync = require('browser-sync').create();
const svgSprite = require('gulp-svg-sprite');
const sourcemaps = require('gulp-sourcemaps');
const htmlmin = require('gulp-htmlmin');
const notify = require('gulp-notify');
const image = require('gulp-image');
const concat = require('gulp-concat');


// Clean ++
const cleanApp = () => {
	return del(['app/*'])
}

const cleanDev = () => {
	return del(['dev/*'])
}

// svgSprites ++
const svgSpritesApp = () => {
  return src('./src/img/svg/**.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: "../sprite.svg" //sprite file name
        }
      },
    }))
    .pipe(dest('./app/img'));
}

const svgSpritesDev = () => {
  return src('./src/img/svg/**.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: "../sprite.svg" //sprite file name
        }
      },
    }))
    .pipe(dest('./dev/img'));
}

// styles ++
const stylesApp = () => {
  return src('./src/css/**/*.css')
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(cleanCSS({ level: 2 }))
		.pipe(concat('main.css'))
    .pipe(dest('./app/css/'))
};

const stylesDev = () => {
  return src('./src/css/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./dev/css/'))
    .pipe(browserSync.stream());
};
 
// scripts ++
const scriptsApp = () => {
  return src(
    ['./src/js/components/**.js', './src/js/main.js'])
		.pipe(babel({
			presets: ['@babel/env']
		}))
    .pipe(concat('main.js'))
    .pipe(uglify().on("error", notify.onError()))
    .pipe(dest('./app/js'))
}

const scriptsDev = () => {
  return src(
    ['./src/js/components/**.js', './src/js/main.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./dev/js'))
    .pipe(browserSync.stream());
}

// resources ++
const resourcesApp = () => {
  return src('./src/resources/**')
    .pipe(dest('./app'))
}

const resourcesDev = () => {
  return src('./src/resources/**')
    .pipe(dest('./dev'))
}


// images ++
const imagesApp = () => {
  return src([
		'./src/img/**.jpg',
		'./src/img/**.png',
		'./src/img/**.jpeg',
		'./src/img/*.svg',
		'./src/img/**/*.jpg',
		'./src/img/**/*.png',
		'./src/img/**/*.jpeg'
		])
    .pipe(image())
    .pipe(dest('./app/img'))
};

const imagesDev = () => {
  return src([
		'./src/img/**.jpg',
		'./src/img/**.png',
		'./src/img/**.jpeg',
		'./src/img/*.svg',
		'./src/img/**/*.jpg',
		'./src/img/**/*.png',
		'./src/img/**/*.jpeg'
		])
    .pipe(image())
    .pipe(dest('./dev/img'))
};

// watchfiles ++
const watchFilesDev = () => {
  browserSync.init({
    server: {
      baseDir: "./dev"
    },
  });

  watch('./src/css/**/*.css', stylesDev);
	watch('./src/*.html', htmlDev);
  watch('./src/js/**/*.js', scriptsDev);
  watch('./src/resources/**', resourcesDev);
  watch('./src/img/*.{jpg,jpeg,png,svg}', imagesDev);
	watch('./src/img/**/*.{jpg,jpeg,png}', imagesDev);
  watch('./src/img/svg/**.svg', svgSpritesDev);
}

// htmlminify ++
const htmlMinifyApp = () => {
	return src('src/**/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(dest('app'))
}

const htmlDev = () => {
	return src('src/**/*.html')
		.pipe(dest('dev'))
		.pipe(browserSync.stream());
}



exports.svgSpritesDev = svgSpritesDev;
exports.cleanDev = cleanDev
exports.cleanApp = cleanApp
// exports.default = series(clean, scripts, styles, resources, images, svgSprites, htmlMinify, watchFiles);

exports.app = series(cleanApp, scriptsApp, stylesApp, resourcesApp, imagesApp, svgSpritesApp, htmlMinifyApp)

exports.dev = series(cleanDev, scriptsDev, stylesDev, resourcesDev, imagesDev, svgSpritesDev, htmlDev, watchFilesDev)

