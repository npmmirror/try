function drawText(cax, textJson) {

    const group = new cax.Group();
    group.x = textJson.x || 0;
    group.y = textJson.y || 0;
    group.rotation = textJson.rotation;

    let currentPosition = {
        x: 0,
        y: 0
    };

    // 遍历数组并逐个添加文字，后面文字的偏移量加上了前面文字的宽度，还不支持换行
    textJson.children.forEach(item => {
        currentPosition.x += +item.marginLeft || 0;
        currentPosition.y += +item.marginTop || 0;

        const text = new cax.Text(item.text, {
            font: item.font,
            color: item.color,
            baseline: 'bottom'
        });
        text.x = currentPosition.x;
        text.y = currentPosition.y;
        text.rotation = item.rotation;
        group.add(text);

        currentPosition.x += text.getWidth();
    });

    return group;
}
if (typeof module !== "undefined") {
    module.exports = drawText;
} else if (typeof window !== "undefined") {
    window.drawText = drawText;
}
/*
  textJson示例输入：
  {
    x: 20,
    y: 200,
    children: [
      {
        text: "雷猴啊类",
        color: "#00FF00",
        font: "30px Arial"
      },
      {
        text: "丢雷楼某啊",
        color: "red",
        font: "34px Arial",
        marginLeft: 10,
        marginTop: 5,
        rotation: 180
      }
    ]
  };
*/
