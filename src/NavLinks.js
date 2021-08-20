/**
 *  header-menu and sidebar menu data
 */
export default [
  {
    menu_title: 'Home/ Inicio',
    path: '/',
    icon: 'home',
    child_routes: null,
  },
  {
    path: '/category/hombre',
    menu_title: 'Hombres',
    category_name: 'hombre',
    icon: 'arrow_right_alt',
    type: 'subMenu',
    child_routes: [
      {
        path: '/category/irezumi',
        menu_title: 'Irezumi',
        icon: 'arrow_right_alt',
        child_routes: null,
      },
      {
        path: '/category/art-collection',
        menu_title: 'Art collection',
        icon: 'arrow_right_alt',
        child_routes: null,
      },
      {
        path: '/category/tattoo-collection',
        menu_title: 'Tattoo collection',
        icon: 'arrow_right_alt',
        child_routes: null,
      },
    ],
  },
  {
    path: '/category/mujer',
    menu_title: 'Mujeres',
    category_name: 'mujer',
    type: 'subMenu',
    icon: 'arrow_right_alt',
    child_routes: [
      {
        path: '/category/irezumi',
        menu_title: 'Irezumi',
        icon: 'arrow_right_alt',
        child_routes: null,
      },
      {
        path: '/category/art-collection',
        menu_title: 'Art collection',
        icon: 'arrow_right_alt',
        child_routes: null,
      },
      {
        path: '/category/tattoo-collection',
        menu_title: 'Tattoo collection',
        icon: 'arrow_right_alt',
        child_routes: null,
      },
    ],
  },
  {
    path: '/category/niña',
    menu_title: 'Niñas',
    category_name: 'niña',
    icon: 'arrow_right_alt',
    type: 'subMenu',
    child_routes: [
      {
        path: '/category/irezumi',
        menu_title: 'Irezumi',
        icon: 'arrow_right_alt',
        child_routes: null,
      },
      {
        path: '/category/art-collection',
        menu_title: 'Art collection',
        icon: 'arrow_right_alt',
        child_routes: null,
      },
      {
        path: '/category/tattoo-collection',
        menu_title: 'Tattoo collection',
        icon: 'arrow_right_alt',
        child_routes: null,
      },
    ],
  },
  {
    path: '/category/niño',
    menu_title: 'Niños',
    category_name: 'niño',
    icon: 'arrow_right_alt',
    type: 'subMenu',
    child_routes: [
      {
        path: '/category/irezumi',
        menu_title: 'Irezumi',
        icon: 'arrow_right_alt',
        child_routes: null,
      },
      {
        path: '/category/art-collection',
        menu_title: 'Art collection',
        icon: 'arrow_right_alt',
        child_routes: null,
      },
      {
        path: '/category/tattoo-collection',
        menu_title: 'Tattoo collection',
        icon: 'arrow_right_alt',
        child_routes: null,
      },
    ],
  },
  {
    path: '/aboutus',
    menu_title: 'Quienes somos',
    icon: 'arrow_right_alt',
    child_routes: null,
  },
  {
    path: '/contactus',
    menu_title: 'Contáctanos',
    icon: 'arrow_right_alt',
    child_routes: null,
  },
]
