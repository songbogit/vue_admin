import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */
export const basicRoutes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
];
export default [
  ...basicRoutes,
  // {
  //   path: '',
  //   name: 'doc',
  //   meta: {
  //     title: '文档',
  //     href: 'https://lison16.github.io/iview-admin-doc/#/',
  //     icon: 'ios-book'
  //   }
  // },
  // {
  //   path: '/sys',
  //   name: 'sys',
  //   component: Main,
  //   meta: {
  //     title: '系统管理',
  //     icon: 'ios-settings'
  //   },
  //   children: [
  //     {
  //       path: 'user-manager',
  //       name: 'user-manager',
  //       component: () => import('@/view/sys/sys-user/SysUser.vue'),
  //       meta: {
  //         title: '系统用户管理',
  //         icon: 'ios-settings',
  //       }
  //     },
  //     {
  //       path: 'role-manager',
  //       name: 'role-manager',
  //       component: () => import('@/view/sys/sys-role/SysRole.vue'),
  //       meta: {
  //         title: '角色管理',
  //         icon: 'ios-settings',
  //       }
  //     },
  //     {
  //       path: 'menu-manager',
  //       name: 'menu-manager',
  //       component: () => import('@/view/sys/sys-menu/SysMenu.vue'),
  //       meta: {
  //         title: '菜单管理',
  //         icon: 'ios-settings',
  //       }
  //     },
  //   ]
  // },
  // {
  //   path: '/material-manager',
  //   name: 'material-manager',
  //   component: Main,
  //   meta: {
  //     title: '素材库管理',
  //     icon: 'ios-settings'
  //   },
  //   children: [
  //     {
  //       path: 'video-manager',
  //       name: 'video-manager',
  //       meta: {
  //         title: '视频管理',
  //         icon: 'ios-settings',
  //         // notCache: true
  //       },
  //       component: () => import('@/view/material-manager/video-manager/VideoManager.vue')
  //     },
  //     {
  //       path: 'video-edit',
  //       name: 'video-edit',
  //       meta: {
  //         title: '视频编目',
  //         icon: 'ios-settings',
  //         notCache: true
  //       },
  //       component: () => import('@/view/material-manager/video-manager/VideoEditor.vue')
  //     },
  //     {
  //       path: 'video-group-manager',
  //       name: 'video-group-manager',
  //       meta: {
  //         title: '视频集管理',
  //         icon: 'ios-settings',
  //         // notCache: true
  //       },
  //       component: () => import('@/view/material-manager/video-group-manager/VideogroupManager.vue')
  //     },
  //     {
  //       path: 'video-group-edit',
  //       name: 'video-group-edit',
  //       meta: {
  //         title: '视频集编目',
  //         icon: 'ios-settings',
  //         notCache: true
  //       },
  //       component: () => import('@/view/material-manager/video-group-manager/VideogroupEditor.vue')
  //     },
  //     {
  //       path: 'video-group-choose',
  //       name: 'video-group-choose',
  //       meta: {
  //         title: '视频集挑选',
  //         icon: 'ios-settings',
  //         // notCache: true
  //       },
  //       component: () => import('@/view/material-manager/video-group-manager/VideoChoose.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/page-template',
  //   name: 'page-template',
  //   component: Main,
  //   meta: {
  //     title: '页面管理',
  //     icon: 'ios-settings'
  //   },
  //   children: [
  //     {
  //       path: 'page-manager',
  //       name: 'page-manager',
  //       meta: {
  //         title: '页面管理',
  //         icon: 'ios-settings',
  //         // notCache: true
  //       },
  //       component: () => import('@/view/page-manager/page-manager/PageManager.vue')
  //     },
  //     {
  //       path: 'page-edit',
  //       name: 'page-edit',
  //       meta: {
  //         title: '页面编辑',
  //         icon: 'ios-settings',
  //         // notCache: true,
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/page-manager/page-manager/PageEditor.vue')
  //     },
  //     {
  //       path: 'content-edit',
  //       name: 'content-edit',
  //       meta: {
  //         title: '内容编辑',
  //         icon: 'ios-settings',
  //         // notCache: true,
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/page-manager/page-manager/ContentEditor.vue')
  //     },
  //     {
  //       path: 'template-manager',
  //       name: 'template-manager',
  //       meta: {
  //         title: '模板管理',
  //         icon: 'ios-settings',
  //         // notCache: true
  //       },
  //       component: () => import('@/view/page-manager/template-manager/TemplateManager.vue')
  //     },
  //     {
  //       path: 'template-edit',
  //       name: 'template-edit',
  //       meta: {
  //         title: '模板编辑',
  //         icon: 'ios-settings',
  //         // notCache: true,
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/page-manager/template-manager/TemplateEdit.vue')
  //     }
  //   ]
  // },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
]
