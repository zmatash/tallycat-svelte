import gulp from "gulp";
import svgSprite from "gulp-svg-sprite";

// SVG Sprite Configuration
const svgSpriteConfig = {
	mode: {
		symbol: {
			dest: ".",
			sprite: "sprite-sheet.svg",
			example: true
		}
	},
	shape: {
		id: {
			separator: "-"
		}
	},
	svg: {
		xmlDeclaration: false,
		doctypeDeclaration: false
	}
};

// SVG Sprite Task
gulp.task("svg-sprite", () =>
	gulp.src("assets/icons/**/*.svg").pipe(svgSprite(svgSpriteConfig)).pipe(gulp.dest("static"))
);

// Default task
gulp.task("default", gulp.series("svg-sprite"));
