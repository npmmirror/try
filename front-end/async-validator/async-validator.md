# async-validator 的中文文档翻译 #

阿里出品的 [antd](https://ant.design/components/form-cn/#校验规则) 和 [ElementUI](https://element.eleme.cn/2.0/#/zh-CN/component/form#biao-dan-yan-zheng) 组件库中表单校验默认使用的 [async-validator](https://github.com/yiminghe/async-validator)，它在 gitbub 上也获得了 3.8k 的 star，可见这个库十分强大，奈何只有英文文档看的蛋疼，因此花点时间翻译一下以便日后查看和为新手同事提供文档，原文都以折叠的方式保留着，看不懂我的描述可以展开看看原文。

结合 github 上的例子能方便理解

（大部分原因是我英文水平不够，但是明明是中国人写的为啥不顺手写个中文的 readme 呢，虽然就算翻译成了中文也还是晦涩难懂。。。）

翻译时间： **2019/5/31**

正文开始。

---

# async-validator

一个用于表单异步校验的库，参考了 https://github.com/freeformsystems/async-validate 
<details><summary></summary>
Validate form asynchronous. A variation of https://github.com/freeformsystems/async-validate
</details>

## API

下述内容来自于 [async-validate](https://github.com/freeformsystems/async-validate). 的早期版本
<details><summary></summary>
The following is modified from earlier version of [async-validate](https://github.com/freeformsystems/async-validate).
</details>

### Usage 使用方法 ###

基本的使用方法：定义一个 descriptor，将它传入 schema，得到一个 validator。将需要校验的对象和回调传入 validator.validate 方法中。

注：descriptor 是对校验规则的描述，validator 是根据校验规则得到的校验器

<details><summary></summary>
Basic usage involves defining a descriptor, assigning it to a schema and passing the object to be validated and a callback function to the `validate` method of the schema:
</details>

```javascript
var schema = require('front-end/async-validator/async-validator');
var descriptor = {
  name: {
    type: "string",
    required: true,
    validator: (rule, value) => value === 'muji',
  },
};
var validator = new schema(descriptor);
validator.validate({ name: "muji" }, (errors, fields) => {
  if (errors) {
    // validation failed, errors is an array of all errors
    // fields is an object keyed by field name with an array of
    // errors per field

    // 校验未通过的情况，errors 是所有错误的数组
    // fields 是一个 object，以字段作为 key 值，该字段对应的错误数组作为 value
    // （其实 fields 就是把 errors 按照原对象的 key 值分组）

    return handleErrors(errors, fields);
  }

  // validation passed
  // 这里说明校验已通过
});

// PROMISE USAGE
// Promise 式用法

validator.validate({
  name: "muji",
  asyncValidator: (rule, value) => axios.post('/nameValidator', { name: value }),
}, (errors, fields) => {
  if (errors) {
    // validation failed, errors is an array of all errors
    // fields is an object keyed by field name with an array of
    // errors per field

    // 校验未通过的情况，errors 和 fields 同上
    return handleErrors(errors, fields);
  }
  // validation passed
  // 校验通过
})
  .then(() => {
    // validation passed
    // 校验通过
  })
  .catch(({ errors, fields }) => {
    return handleErrors(errors, fields);
  })
```

#### Validate 方法参数

```javascript
function(source, [options], callback): Promise
```

* `source`: 需要校验的对象（必填）.
* `options`: 校验选项（可选）.
* `callback`: 校验完成时的回调（必填）.

<details><summary></summary>
* `source`: The object to validate (required).
* `options`: An object describing processing options for the validation (optional).
* `callback`: A callback function to invoke when validation completes (required).
</details>

方法返回一个 Promise 对象:
* `then()`，说明校验通过
* `catch({ errors, fields })`，校验未通过，errors, fields 含义见前面示例

<details><summary></summary>
The method will return a Promise object like:
* `then()`，validation passed
* `catch({ errors, fields })`，validation failed, errors is an array of all errors, fields is an object keyed by field name with an array of
</details>

### Options 选项

* `first`: Boolean, 遇见第一个未通过校验的值时便调用 `callback` 回调，不再继续校验剩余规则。
适用情况：校验涉及到多个异步调用，比如数据库查询，而你只需要获取首个校验错误时

* `firstFields`: Boolean|String[], 对于指定字段，遇见第一条未通过的校验规则时便调用 `callback` 回调，而不再校验该字段的其他规则 ，传入 `true` 代表所有字段。

<details><summary></summary>
* `first`: Boolean, Invoke `callback` when the first validation rule generates an error,
no more validation rules are processed.
If your validation involves multiple asynchronous calls (for example, database queries) and you only need the first error use this option.

* `firstFields`: Boolean|String[], Invoke `callback` when the first validation rule of the specified field generates an error,
no more validation rules of the same field are processed.  `true` means all fields.

</details>

### Rules

> 

Rules 也可以是用于校验的函数

<details><summary></summary>
Rules may be functions that perform validation.
</details>

```javascript
function(rule, value, callback, source, options)
```

* `rule`: 当前校验字段在 descriptor 中所对应的校验规则，其中的 field 属性是当前正在校验字段的名称
* `value`: 当前校验字段的值
* `callback`: 在校验完成时的回调，传入 `Error` [或者是一个数组] 代表校验失败，如果校验是同步的话，直接返回 `false` 或 `Error` 或 `Error` 数组也可以（注：异步校验通过时直接不带参数调用 `callback()`，代表没有错误）
* `source`: 传入 `validate` 方法的 object，也就是需要校验的对象
* `options`: 传入的额外选项
* `options.messages`: 对象包含的校验错误提示信息，会被合并到默认的提示信息中

<details><summary></summary>
* `rule`: The validation rule in the source descriptor that corresponds to the field name being validated. It is always assigned a `field` property with the name of the field being validated.
* `value`: The value of the source object property being validated.
* `callback`: A callback function to invoke once validation is complete. It expects to be passed an array of `Error` instances to indicate validation failure. If the check is synchronous, you can directly return a ` false ` or ` Error ` or ` Error Array `.
* `source`: The source object that was passed to the `validate` method.
* `options`: Additional options.
* `options.messages`: The object containing validation error messages, will be deep merged with defaultMessages.
</details>

传入 `validate` 或 `asyncValidate` 的 options 被带到了校验函数中，以便你可以在校验函数中拿到数据（比如 model 引用）。然而，option中部分属性名是被保留的，你如果使用了的话会被覆盖掉，其中包括  `messages`, `exception` 和 `error`。

<details><summary></summary>
The options passed to `validate` or `asyncValidate` are passed on to the validation functions so that you may reference transient data (such as model references) in validation functions. However, some option names are reserved; if you use these properties of the options object they are overwritten. The reserved properties are `messages`, `exception` and `error`.
</details>

```javascript
var schema = require('async-validator');
var descriptor = {
  name(rule, value, callback, source, options) {
    var errors = [];
    if(!/^[a-z0-9]+$/.test(value)) {
      errors.push(
        new Error(
          util.format("%s must be lowercase alphanumeric characters",
            rule.field)));
    }
    return errors;
  }
}
var validator = new schema(descriptor);
validator.validate({name: "Firstname"}, (errors, fields) => {
  if(errors) {
    return handleErrors(errors, fields);
  }
  // validation passed
});
```

在需要对一个字段设置多条校验规则时，可以把规则设为一个数组，比如

<details><summary></summary>
It is often useful to test against multiple validation rules for a single field, to do so make the rule an array of objects, for example:
</details>

```javascript
var descriptor = {
  email: [
    {type: "string", required: true, pattern: schema.pattern.email},
    {validator(rule, value, callback, source, options) {
      var errors = [];
      // test if email address already exists in a database
      // and add a validation error to the errors array if it does
      return errors;
    }}
  ]
}
```

#### Type 内置类型

下列是 `type` 可用的值：

* `string`: 必须是 `string`. `This is the default type.`
* `number`: 必须是 `number`.
* `boolean`: 必须是 `boolean`.
* `method`: 必须是 `function`.
* `regexp`: 必须是正则或者是在调用 `new RegExp` 时不报错的字符串.
* `integer`: 整数.
* `float`: 浮点数.
* `array`: 必须是数组，通过 `Array.isArray` 判断.
* `object`: 是对象且不为数组.
* `enum`: 值必须出现在 `enmu` 枚举值中.
* `date`: 合法的日期，使用 `Date` 判断
* `url`:  url.
* `hex`: 16进制.
* `email`: 邮箱地址.

<details><summary></summary>
Indicates the `type` of validator to use. Recognised type values are:

* `string`: Must be of type `string`. `This is the default type.`
* `number`: Must be of type `number`.
* `boolean`: Must be of type `boolean`.
* `method`: Must be of type `function`.
* `regexp`: Must be an instance of `RegExp` or a string that does not generate an exception when creating a new `RegExp`.
* `integer`: Must be of type `number` and an integer.
* `float`: Must be of type `number` and a floating point number.
* `array`: Must be an array as determined by `Array.isArray`.
* `object`: Must be of type `object` and not `Array.isArray`.
* `enum`: Value must exist in the `enum`.
* `date`: Value must be valid as determined by `Date`
* `url`: Must be of type `url`.
* `hex`: Must be of type `hex`.
* `email`: Must be of type `email`.
</details>

**Required**

`required` 属性代表这个字段必须出现在对象中

<details><summary></summary>
The `required` rule property indicates that the field must exist on the source object being validated.
</details>

**Pattern**

`pattern` 属性代表需要符合的正则

<details><summary></summary>
The `pattern` rule property indicates a regular expression that the value must match to pass validation.
</details>

**Range**

使用 `min` 和 `max` 属性定义范围，对于字符串和数组会与 `value.length` 比较，对于数字会直接与值比较

<details><summary></summary>
A range is defined using the `min` and `max` properties. For `string` and `array` types compariso is performed against the `length`, for `number` types the number must not be less than `min` nor greater than `max`.
</details>

**Length**

使用 `len` 属性直接指定长度，会与字符串和数组的 `value.length` 比较相等，对于数字会直接与值比较是否相等
如果 `len` 与 `min` 和 `max` 同时使用， `len` 优先。

<details><summary></summary>
To validate an exact length of a field specify the `len` property. For `string` and `array` types comparison is performed on the `length` property, for the `number` type this property indicates an exact match for the `number`, ie, it may only be strictly equal to `len`.

If the `len` property is combined with the `min` and `max` range properties, `len` takes precedence.
</details>

**Enumerable**

可枚举值

对于可以枚举出所有情况的类型，可以使用枚举校验，如下：

<details><summary></summary>
To validate a value from a list of possible values use the `enum` type with a `enum` property listing the valid values for the field, for example:
</details>

```javascript
var descriptor = {
  role: {type: "enum", enum: ['admin', 'user', 'guest']}
}
```

**Whitespace**

把仅包含空格的字段视为错误是很典型的做法，为了额外测试字段是否只有空格，添加 `whitespace` 属性并设为true。这个属性要求字段必须为 `string` 类型。

如果你想要修正用户的输入而不是测试有无空格，查看 [transform](#transform) 中去除空格的例子。

<details><summary></summary>
It is typical to treat required fields that only contain whitespace as errors. To add an additional test for a string that consists solely of whitespace add a `whitespace` property to a rule with a value of `true`. The rule must be a `string` type.

You may wish to sanitize user input instead of testing for whitespace, see [transform](#transform) for an example that would allow you to strip whitespace.
</details>

**Deep Rules 深层规则**

如果需要校验一个深层的对象，你需要使用 `fields` 属性来设置嵌套的规则

<details><summary></summary>
If you need to validate deep object properties you may do so for validation rules that are of the `object` or `array` type by assigning nested rules to a `fields` property of the rule.
</details>

```javascript
var descriptor = {
  address: {
    type: "object", required: true,
    fields: {
      street: {type: "string", required: true},
      city: {type: "string", required: true},
      zip: {type: "string", required: true, len: 8, message: "invalid zip"}
    }
  },
  name: {type: "string", required: true}
}
var validator = new schema(descriptor);
validator.validate({ address: {} }, (errors, fields) => {
  // errors for address.street, address.city, address.zip
});
```

需要注意的是，如果没有在父规则上指定 `required` 属性，在校验对象中不存在这个属性是完全合法的，嵌套的深层规则也不会运行。

<details><summary></summary>
Note that if you do not specify the `required` property on the parent rule it is perfectly valid for the field not to be declared on the source object and the deep validation rules will not be executed as there is nothing to validate against.
</details>

深层规则提供了直接一个定义嵌套规则的方式，让你可以简化传递给 `schema.validate()` 的 `options` 。

<details><summary></summary>
Deep rule validation creates a schema for the nested rules so you can also specify the `options` passed to the `schema.validate()` method.
</details>

```javascript
var descriptor = {
  address: {
    type: "object", required: true, options: {single: true, first: true},
    fields: {
      street: {type: "string", required: true},
      city: {type: "string", required: true},
      zip: {type: "string", required: true, len: 8, message: "invalid zip"}
    }
  },
  name: {type: "string", required: true}
}
var validator = new schema(descriptor);

validator.validate({ address: {} })
  .catch(({ errors, fields }) => {
    // now only errors for street and name    
  });
```

如果你像下面这样写，父规则也会被校验

<details><summary></summary>
The parent rule is also validated so if you have a set of rules such as:
</details>

```javascript
var descriptor = {
  roles: {
    type: "array", required: true, len: 3,
    fields: {
      0: {type: "string", required: true},
      1: {type: "string", required: true},
      2: {type: "string", required: true}
    }
  }
}
```

比如用于 `{roles: ["admin", "user"]}` 会产生两个错误，一个是数组长度不匹配，一个是缺少了索引为 `2` 的元素

<details><summary></summary>
And supply a source object of `{roles: ["admin", "user"]}` then two errors will be created. One for the array length mismatch and one for the missing required array entry at index 2.
</details>

#### defaultField 默认字段

`defaultField` 属性可以在  `array` 和 `object` 类型中用于校验所有的值，它可以是一个包含有校验规则的对象或数组。 例子如下：

<details><summary></summary>
The `defaultField` property can be used with the `array` or `object` type for validating all values of the container.
It may be an `object` or `array` containing validation rules. For example:
</details>

```javascript
var descriptor = {
  urls: {
    type: "array", required: true,
    defaultField: {type: "url"}
  }
}
```

注意，`defaultField` 是 `fields` 的扩展，见 [deep rules](#deep-rules).

<details><summary></summary>
Note that `defaultField` is expanded to `fields`, see [deep rules](#deep-rules).
</details>

#### Transform 变换

有时候需要在校验前修改值，强制修改为特定格式。 为此在校验规则中添加了 `transform`， 这个属性会在校验前执行，以适当的方式改变原始对象的值。（也就是返回值会作用在原始对象的值上）

<details><summary></summary>
Sometimes it is necessary to transform a value before validation, possibly to coerce the value or to sanitize it in some way. To do this add a `transform` function to the validation rule. The property is transformed prior to validation and re-assigned to the source object to mutate the value of the property in place.
</details>

```javascript
var schema = require('async-validator');
var sanitize = require('validator').sanitize;
var descriptor = {
  name: {
    type: "string",
    required: true, pattern: /^[a-z]+$/,
    transform(value) {
      return sanitize(value).trim();
    }
  }
}
var validator = new schema(descriptor);
var source = {name: " user  "};
validator.validate(source)
  .then(() => assert.equal(source.name, "user"));
```

如果没有 `transform` 函数校验会失败因为前后空格导致正则与输入不符，但在添加了 `transform` 函数后便可通过因为字段已经被清洗了（或者翻译为使输入值符合预期格式）

<details><summary></summary>
Without the `transform` function validation would fail due to the pattern not matching as the input contains leading and trailing whitespace, but by adding the transform function validation passes and the field value is sanitized at the same time.
</details>

### Messages 提示信息

在某些需求下，你可能需要格式化支持或者想要不同校验错误信息。

最简单的方式就是直接为 `message` 属性赋值：

<details><summary></summary>
Depending upon your application requirements, you may need i18n support or you may prefer different validation error messages.
The easiest way to achieve this is to assign a `message` to a rule:
</details>

```javascript
{name:{type: "string", required: true, message: "Name is required"}}
```

消息可以是任意类型的，比如 `JSX`：

<details><summary></summary>
Message can be any type, such as jsx format.
</details>

```javascript
{name:{type: "string", required: true, message: <b>Name is required</b>}}
```

也可以是函数，比如使用 vue-i18n 时：

<details><summary></summary>
Message can also be a function, e.g. if you use vue-i18n:
</details>

```javascript
{name:{type: "string", required: true, message: () => this.$t( 'name is required' )}}
```

有时候你只是需要对相同的校验规则定义不同语言的提示信息，在这种情况下为各种语言重复定义信息就显得很多余。

你也可以采取这个方案：定义你自己的提示信息并赋值给 `schema` ：

<details><summary></summary>
Potentially you may require the same schema validation rules for different languages, in which case duplicating the schema rules for each language does not make sense.

In this scenario you could just provide your own messages for the language and assign it to the schema:
</details>

```javascript
var schema = require('async-validator');
var cn = {
  required: '%s 必填',
};
var descriptor = {name:{type: "string", required: true}};
var validator = new schema(descriptor);
// deep merge with defaultMessages
validator.messages(cn);
...
```

如果你要定义自己的校验函数，最好将提示信息赋值给消息对象，并在校验函数中通过 `options.messages` 访问消息。（说实话我没看懂是什么意思，应该是指不要把消息硬编码写在校验函数里面而是通过option传递，以便修改）

<details><summary></summary>
If you are defining your own validation functions it is better practice to assign the message strings to a messages object and then access the messages via the `options.messages` property within the validation function.
</details>

### asyncValidator 异步校验函数

你可以对指定的字段自定义包含异步操作的校验函数

<details><summary></summary>
You can customize the asynchronous validation function for the specified field:
</details>

```js
const fields = {
  asyncField:{
    asyncValidator(rule,value,callback){
      ajax({
        url:'xx',
        value:value
      }).then(function(data){
        callback();
      },function(error){
        callback(new Error(error))
      });
    }
  },

  promiseField:{
    asyncValidator(rule, value){
      return ajax({
        url:'xx',
        value:value
      });
    }
  }
};
```

### validator 校验函数

你也可像下面这样自定义校验函数：

<details><summary></summary>
you can custom validate function for specified field:
</details>

```js
const fields = {
  field:{
    validator(rule,value,callback){
      return value === 'test';
    },
    message: 'Value is not equal to "test".',
  },

  field2:{
    validator(rule,value,callback){
      return new Error(`'${value} is not equal to "test".'`);
    },
  },
 
  arrField:{
    validator(rule, value){
      return [
        new Error('Message 1'),
        new Error('Message 2'),
      ];
    }
  },
};
```

## FAQ

### How to avoid warning 如何关闭警告

```js
var Schema = require('async-validator');
Schema.warning = function(){};
```
