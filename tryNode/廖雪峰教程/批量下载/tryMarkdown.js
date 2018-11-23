const marked = require('marked');

// Generate A MarkDown to read the comics.
function comicToMarkDown(param) {
    let {origin, name, imgArray} = param;
    let pArr = [];
    pArr.push(`<link rel="stylesheet" type="text/css" href="../../md.css">`);
    pArr.push(`<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">`);
    pArr.push(`## [${name}](url)`);
    pArr.push(`### ${new Date().toLocaleString()}`);
    for (let item of imgArray) {
        pArr.push(`![](${item})`)
    }
    let md = pArr.join('\n\n');

    return {
        markdown: md,
        html: marked(md)
    };
}

// console.log(marked(`
// ## 灰机
// 1. Type in stuff on the left.
// 2. See the live updates on the right.
//
// # Marked in the browser\\n\\nRendered by **marked**.
// `));

module.exports = {comicToMarkDown};
