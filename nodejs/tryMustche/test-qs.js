const qs = require("qs");
const os = require("os");

const out = qs.stringify({
  where: {
    name: "hello",
    zz: {
      dd: 22,
    },
  },
  u: 33,
});

const parsed = qs.parse(out);

console.log(out);
console.log(parsed);

const o2 = decodeURIComponent(out);

process.exit(0);
