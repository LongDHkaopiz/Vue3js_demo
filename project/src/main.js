import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'
import VueAxios from 'vue-axios'
import axios from 'axios'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faBars ,faUserSecret,faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
library.add(faBars,faUserSecret,faRightFromBracket)

const store = createStore({
  state : {
    email:""
  },
  mutations: {
    login (state,email) {
          state.email = email;
          localStorage.setItem('email', email);
    },
    logout(state) {
        state.email = '';
        localStorage.removeItem('email');
      },
    initialiseStore(state) {
      if(localStorage.getItem('email')){
        state.email = localStorage.getItem('email');
       }
    }
  }
})
const app = createApp(App).use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(VueAxios, { $request: axios })
app.use(VueSweetalert2)
app.use(ElementPlus)
app.use(store)
app.mount('#app')
