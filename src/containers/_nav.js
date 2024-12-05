const _nav =  [
 
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Form Management',
    route: '/formmanagement',
    icon: 'cil-user',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'List Form Data',
		icon: 'cil-people',
        to: '/formmanagement/listform',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'List Transform Form Data',
		icon: 'cil-people',
        to: '/formmanagement/formtransform',
      },
      
      {
        _tag: 'CSidebarNavItem',
        name: 'Form Dynamic',
		icon: 'cil-people',
        to: '/formmanagement/formdynamic',
      }
    ],
  },
  
]

export default _nav
