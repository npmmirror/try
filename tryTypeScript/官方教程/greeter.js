var arry = [1, 25, 15, [1, 2, 15, 5], 15, 25, 35, 1];
var set = new Set(arry.flat(Infinity).sort(function (a, b) { return (a - b); }));
var arr = set.slice();
console.log(arr); // [1, 2, 5, 15, 25, 35]
for (var i = 1; i <= 5; i++) {
    setTimeout(function timer() {
        console.log(i);
    }, i * 1000);
}
