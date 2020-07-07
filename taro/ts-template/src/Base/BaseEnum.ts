import { Enumify } from 'enumify';

interface CtorOptions {
  // 枚举展示的文字
  label?: any;
  // 枚举的值
  value?: any;
}

class BaseEnum extends Enumify {
  // ####### static ######
  static enumValues: Array<BaseEnum>;

  // 根据 value 返回 枚举
  static getEnumByValue(value: any) {
    return this.enumValues.find((item: BaseEnum) => item.value === value);
  }

  // 根据 value 返回 label
  static renderByValue(value: any) {
    const el = this.getEnumByValue(value);
    return el?.label || '';
  }

  // ####### instance ######
  label: any;
  value: any;

  constructor(options: CtorOptions = {}) {
    super();
    this.label = options.label;
    this.value = options.value;
  }
}

export default BaseEnum;
