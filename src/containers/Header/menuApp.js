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
                name: 'menu.admin.manage-employer', link: '/system/user-employer',
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
                name: 'menu.employer.manage-schedule', link: '/employer/manage-schedule',
            },
            { //Quản lý kế hoạch phòng ở 
                name: 'menu.admin.info', link: '/system/manage-info',
            },
        ]
    },
    { //Quản lý nhân viên
        name: 'menu.admin.employer', menus: [
            {
                name: 'menu.admin.manage-employer', link: '/system/manage-employer',
            },


        ]
    },
    { //Quản lý phòng ở
        name: 'menu.admin.room', menus: [
            {
                name: 'menu.admin.manage-room', link: '/system/manage-room',
            },

        ]
    },


];

export const employerMenu = [
    {
        name: 'menu.admin.manage-user', menus: [
            { //Quản lý kế hoạch phòng ở của nhân viên
                name: 'menu.employer.manage-schedule', link: '/employer/manage-schedule',
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