export const adminMenu = [
    { //Quản lý người dùng
        name: 'menu.admin.manage-user', menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage',
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux',
            },
            {
                name: 'menu.admin.manage-room-student', link: '/system/user-room-student',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
            {
                name: 'menu.admin.manage-admin', link: '/system/user-admin',
            },

        ]
    },
    { //Quản lý phòng ở
        name: 'menu.admin.room', menus: [
            {
                name: 'menu.admin.manage-room', link: '/system-manage-room',
            },


        ]
    },
];