export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer'
    },
    {
      name: 'Product',
      url: '/product',
      icon: 'icon-tag'
    },
    {
      name: 'Settings',
      url: '/settings',
      icon: 'icon-settings',
      children: [
        {
          name: 'Category',
          url: '/category',
          icon: 'icon-notebook'
        },
        {
          name: 'Brand',
          url: '/brand',
          icon: 'icon-notebook'
        }
      ]
    }
  ]
}
