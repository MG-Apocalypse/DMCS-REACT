export const adminMenu = [
    { //Quản lý người dùng
        name: 'menu.admin.manage-user', menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage',
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux',
            },
            // quản lý nhân viên
            {
                name: 'menu.admin.manage-room', link: '/system/manage-room',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
            // {
            //     name: 'menu.admin.manage-admin', link: '/system/user-admin',
            // },
            { //Quản lý kế hoạch phòng ở của nhâN viên
                name: 'menu.room.manage-schedule', link: '/room/manage-schedule',
            },
            { //Quản lý kế hoạch phòng ở 
                name: 'menu.admin.info', link: '/system/manage-info',
            },
        ]
    },
    { //Quản lý phòng ở
        name: 'menu.admin.specialty', menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty',
            },

        ]
    },


];

export const roomMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [
            { //Quản lý kế hoạch phòng ở của nhân viên
                name: 'menu.room.manage-schedule', link: '/room/manage-schedule',
            },
            { //Quản lý kế hoạch phòng ở của nhân viên
                name: 'menu.room.manage-student', link: '/room/manage-student',
            },
        ]

    }


];

export const studentMenu = [
    {
        name: 'menu.admin.manage-user', menus: [
            { //Quản lý kế hoạch phòng ở của nhân viên
                name: 'menu.admin.info', link: '/system/manage-info',
            },
        ]

    }


];