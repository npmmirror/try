$(function (params) {
  var editor = document.getElementById('editor');
  window.quill = new Quill(editor, {
    // modules: { toolbar: '#toolbar' },
    // debug: 'info',
    // modules: {
    //   toolbar: '#toolbar',
    // },
    placeholder: 'Compose an epic...',
    readOnly: false,
    theme: 'snow',
  });

  // quill.on('text-change', (delta, oldDelta, source) => {
  //   // 暂时这样处理 行高，行高会被默认过滤掉，暂时没找到其他办法设置行高，默认正文是28.5pt，标题的如有需要也可特殊处理
  //   const content = quill.root.innerHTML;
  //   console.log('text-change', { delta, oldDelta, source });
  //   // console.log(content);
  // });

  var Keyboard = Quill.import('modules/keyboard');

  quill.keyboard.addBinding(
    { key: Keyboard.keys.BACKSPACE },
    {
      empty: null,
      // collapsed: true,
      // format: ['blockquote', 'list'],
      // offset: 0,
    },
    function (range, context) {
      console.log('addBinding handler', { range, context });
      if (context.format.list) {
        this.quill.format('list', false);
      } else {
        this.quill.format('blockquote', false);
      }
      return true;
    }
  );

  $('#getContents').click(() => {
    console.log('quill.getContents', quill.getContents());
    console.log('quill.getText', quill.getText());
  });

  $('#addContent').click(() => {
    quill.insertText(0, 'Hello', 'bold', true);

    quill.insertText(5, 'Quill', {
      color: '#ffff00',
      italic: true,
    });
  });
  $('#setText').click(() => {
    quill.setText('<p>Some initial <strong>bold</strong> text</p>');
  });
});
