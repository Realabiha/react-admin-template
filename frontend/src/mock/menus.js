const menus = [
  {
    id: '1',
    title: '首页',
    to: '/admin/home'
  },
  {
    id: '2',
    title: '商品',
    children: [
      {
        id: '3',
        title: '分类',
        to: '/admin/pro/category'
      },
      {
        id: '4',
        title: '详情',
        to: '/admin/pro/product'
      }
    ]
  }
];
export default menus;
