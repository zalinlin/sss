// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false


//非父子组件传值
Vue.prototype.ev = new Vue();

//引入全局组件
import commonConponents from './components/common'
for (var i in commonConponents) {
    Vue.component(i, commonConponents[i]);
}

// 引入sweetalert
import swal from 'sweetalert'
Vue.prototype.$swal = swal;

//引入mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

//引入jquery
import jquery from "jquery";
Vue.prototype.$ = jquery;


//axios
import axios from 'axios'
Vue.prototype.$http = axios;

//动画
import 'animate.css'

//过滤器
import filter from './filter'
for (var i in filter) {
    Vue.filter(i, filter[i])
}


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})