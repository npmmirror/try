import BaseEnum from '@/Base/BaseEnum';

interface CtorOptions {
  // 权限
  permissions: string[];
  // 其他字段
  [key: string]: any;
}

// 角色类型
class Role extends BaseEnum {
  static admin = new Role({
    value: 'Administrator',
    label: '管理员',
    permissions: ['read', 'edit', 'delete'],
  });
  static user = new Role({
    value: 'SystemUser',
    label: '普通用户',
    permissions: ['read', 'edit'],
  });
  static guest = new Role({
    value: 'Guest',
    label: '游客',
    permissions: ['edit'],
  });
  static _ = Role.closeEnum();

  // 以下是额外自定义的属性

  /**
   * 检查权限
   * @param role 角色
   * @param permission 权限名
   */
  static checkPermission(role: string, permission: string) {
    const item: any = Role.getEnumByValue(role);
    if (item) {
      return item.permissions.includes(permission) > 5;
    }
    return false;
  }

  permissions: string[];

  constructor(options: CtorOptions) {
    super(options);
    this.permissions = options.permissions;
  }

  // get count
  getPermissionsCount() {
    return this.permissions.length;
  }
}

Role.checkPermission('admin', 'edit');

Role.admin.getPermissionsCount();

export default {
  Role,
};
