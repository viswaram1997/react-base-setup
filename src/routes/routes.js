const routers = [
    {
        path: '/',
        redirect: '/auth'
    },
    {
        component: 'AuthLayout',
        path: '/auth',
        auth: false,
        name:'Auth',
        exact: false,
        redirect: '/auth/login',
        childrens: [
            {
                path: '/login/:id',
                componentPath:'pages/Auth/Login',
                name:'Login',
                auth: false,
                exact: true
            }   
        ]
    },
    {
        component: 'MainLayout',
        path: '/dashboard',
        auth: false,
        name:'Dashboard',
        exact: false,
        childrens: [
            {
                path: '/login',
                componentPath:'pages/Dashboard/Main',
                name:'LoginDashboard',
                auth: false,
                exact: true
            }
        ]
    }
]

export default routers 