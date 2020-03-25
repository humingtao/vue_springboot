import Vue from 'vue';
import { Button, Table, TableColumn, Pagination, Dialog, Form, FormItem, Input, DatePicker, Message, MessageBox } from 'element-ui';

Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(DatePicker);
Vue.use(Message);
Vue.use(MessageBox);

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
