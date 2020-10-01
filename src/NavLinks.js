/**
 *  header-menu and sidebar menu data
 */
export default [
  {
    menu_title: 'Home/ Inicio',
    path: '/',
    icon: 'home',
    child_routes: null
  },
  {
    path: '/hombres',
    menu_title: 'Hombres',
    icon: 'arrow_right_alt',
    type: 'subMenu',
    child_routes: [
      {
        path: '/irezumi-art',
        menu_title: 'Irezumi Art',
        icon: 'arrow_right_alt',
        child_routes: null
      },
      {
        path: '/todo-o-nada',
        menu_title: 'Todo o Nada',
        icon: 'arrow_right_alt',
        child_routes: null
      }
    ]
  },
  {
    path: '/mujeres',
    menu_title: 'Mujeres',
    type: 'subMenu',
    icon: 'arrow_right_alt',
    child_routes: [
      {
        path: '/irezumi-art',
        menu_title: 'Irezumi Art',
        icon: 'arrow_right_alt',
        child_routes: null
      },
      {
        path: '/todo-o-nada',
        menu_title: 'Todo o Nada',
        icon: 'arrow_right_alt',
        child_routes: null
      }
    ]
  },
  {
    path: '/niños',
    menu_title: 'Niños',
    icon: 'arrow_right_alt',
    type: 'subMenu',
    child_routes: [
      {
        path: '/irezumi-art',
        menu_title: 'Irezumi Art',
        icon: 'arrow_right_alt',
        child_routes: null
      },
      {
        path: '/todo-o-nada',
        menu_title: 'Todo o Nada',
        icon: 'arrow_right_alt',
        child_routes: null
      }
    ]
  },
  {
    path: '/aboutus',
    menu_title: 'Quienes somos',
    icon: 'arrow_right_alt',
    child_routes: null
  },
  {
    path: '/contactus',
    menu_title: 'Contáctanos',
    icon: 'arrow_right_alt',
    child_routes: null
  }
]
