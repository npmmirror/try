const levenshtein = require('fast-levenshtein');

let statementText = `我志愿加入中国共产党，拥护党的纲领，遵守党的章程，履行党员义务，执行党的决定，严守党的纪律，保守党的秘密，对党忠诚，积极工作，为共产主义奋斗终身，随时准备为党和人民牺牲一切，永不叛党。
宣誓人：李正安
2021年10月26日`;

let acrText = `我志愿加入中国共产党，拥护党的纲领，遵守党的章程，履行党员义务，执行党的决定，严守党的纪律，保守党的秘密，对党忠诚，积极工作，为共产主义奋斗终生，随时准备为党和人民牺牲一切，永不叛党。宣誓人李正安2021年10月26日。`;

statementText = statementText.replace(/[，。：\n]/gi, '');
acrText = acrText.replace(/[，。：\n]/gi, '');

const distance = levenshtein.get(statementText, acrText);
const len = Math.max(statementText.length, acrText.length);
const accuracy = Math.floor((1 - distance / len) * 100) + '%';

console.log({
  distance, // 编辑距离
  len, // 文本总长度
  accuracy, // 准确度计算结果
});
