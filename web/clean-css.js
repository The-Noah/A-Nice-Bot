const fs = require("fs");

// CleanCSS
const CleanCSS = require("clean-css");
const cleanCSS = new CleanCSS({level: 2});

process.argv.forEach((val, index, array) => {
  if(index < 2){
    return;
  }

  if(!val.endsWith(".css")){
    console.log(`${val} is not a CSS file`);
    return;
  }

  console.log(`Minifying ${val}...`);
  fs.writeFileSync(val.replace(/\.css/, ".min.css"), cleanCSS.minify(fs.readFileSync(val)).styles);
  console.log(`Done minifying ${val}`);
});