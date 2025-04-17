import router from "@/router";
import { getCookie } from '@/utils/index.ts';
import userStore from '@/store/modules/User.ts';
import pinia from '@/store';
//导入
//@ts-ignore
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false });
let userstore = userStore(pinia)
let nextPath = [
    '/home',
    '/detail/register',
    '/detail/item',
    '/detail/reserve',
    '/detail/close',
    '/detail/search'
]
//@ts-ignore
router.beforeEach((to, from, next) => {
    NProgress.start()
    document.title = `尚医通-${to.meta.title}`
    if (getCookie('token')) {
        next()
    } else {
        if (nextPath.includes(to.path)) {
            next()
        } else {
            userstore.visiable = true
            next({ path: '/home', query: { redirect: to.fullPath } })
        }
    }

})

router.afterEach(() => {
    NProgress.done()
})