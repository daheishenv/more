/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2021-07-29 20:18:23
 */
export default ({ app, store }) => {
    app.router.beforeEach((to, from, next) => {
        if (to.name !== 'login' && to.name !== 'agreement' && to.name !== 'register') {
            // 设置条件、
            const token = app.$cookies.get('applet_token', {
                path: '/',
                maxAge: 60 * 60 * 24 * 7
            })
            if (token) {
                // store.dispatch('getUserInfo')
                next()
            } else {
                next({ name: 'login' })
            }
        } else if (to.name === 'login' || to.name === 'register') {
            const token = app.$cookies.get('applet_token', {
                path: '/',
                maxAge: 60 * 60 * 24 * 7
            })
            if (token) {
                next('/')
            } else {
                next()
            }
        } else {
            next()
        }
    })
}
