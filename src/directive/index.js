import directive from './directives';
import ManagerView from '@/view/components/global-util/ManagerView';
import FormUtil from '@/view/components/global-util/FormUtil';
import ModalUtil from '@/view/components/global-util/ModalUtil';
import SearchItem from '@/view/components/global-util/SearchItem';
import DateUtil from '@/view/components/global-util/DateUtil';

const importDirective = Vue => {
  /**
   * 拖拽指令 v-draggable="options"
   * options = {
   *  trigger: /这里传入作为拖拽触发器的CSS选择器/,
   *  body:    /这里传入需要移动容器的CSS选择器/,
   *  recover: /拖动结束之后是否恢复到原来的位置/
   * }
   */
  Vue.directive('draggable', directive.draggable);
  Vue.component('ManagerView', ManagerView);
  Vue.component('ModalUtil', ModalUtil);
  Vue.component('SearchItem', SearchItem);
  Vue.component('FormUtil', FormUtil);
  Vue.component('DateUtil', DateUtil);
}

export default importDirective
