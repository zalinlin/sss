import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
import index from '../components/pages/index.vue'
import newsDetail from '../components/pages/newsDetail.vue'
import comment from '../components/pages/comment.vue'
import collection from '../components/pages/collection.vue'


export default new Router({
    routes: [{
            path: '/index',
            component: index,
        }, {
            path: '/newsDetail/:id',
            component: newsDetail,
        },
        {
            path: '/comment/:id',
            component: comment,
        },
        {
            path: '/collection',
            component: collection,
        },
        {
            path: '*',
            redirect: '/index'
        },
    ]
})