const menus = [
  {
    key: 'home',
    title: '首页',
    to: '/admin/home'
  },
  {
    key: 'pro',
    title: '商品',
    children: [
      {
        key: 'category1',
        title: '分类1',
        // to: '/admin/pro/category',
        children: [
          {
            key: 'category',
            title: '分类1-1',
            to: '/admin/pro/category',
          }
        ]
      },
      {
        key: 'product',
        title: '详情',
        to: '/admin/pro/product'
      }
    ]
  },
  {
    key: 'role',
    title: '权限',
    to: '/admin/role'
  }
];
export default menus;
