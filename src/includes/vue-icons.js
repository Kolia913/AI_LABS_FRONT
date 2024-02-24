import { OhVueIcon, addIcons } from 'oh-vue-icons'
import * as MaterialIcons from 'oh-vue-icons/icons/md'

const Md = Object.values({ ...MaterialIcons })
addIcons(...Md)

export default {
  install(app) {
    app.component('v-icon', OhVueIcon)
  }
}
