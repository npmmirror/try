import BaseEnum from '@/Base/BaseEnum';

// 证件类型
class IdType extends BaseEnum {
  static idCard = new IdType({ value: '01', label: '公民身份证', level: 2 });
  static gangao = new IdType({ value: '02', label: '港澳居民来往大陆通行证' });
  static taiwan = new IdType({ value: '03', label: '台湾居民来往大陆通行证' });
  static passport = new IdType({ value: '04', label: '护照', level: 1 });
  static _ = IdType.closeEnum();

  // 以下是额外自定义的属性

  // 是否允许使用
  static canUse(enumValue) {
    const item: any = IdType.getEnumByValue(enumValue);
    return item && item.getLevel() > 1;
  }

  level: number;

  constructor(options: any) {
    super(options);
    this.level = options.level;
  }

  getLevel() {
    return this.level || 0;
  }
}

export default {
  IdType,
};
