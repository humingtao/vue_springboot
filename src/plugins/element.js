import Vue from 'vue';
import
{
    Button, Table, TableColumn, Pagination, Dialog, Form, FormItem, Input, DatePicker, Message, MessageBox,
Container, Header, Main, Aside, Collapse, Menu, Submenu, MenuItem, Switch, Breadcrumb, BreadcrumbItem, Backtop, Card, Col, Row, Select, Option
} from 'element-ui';
import Slider from 'view-design';

Vue.use(Slider);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(DatePicker);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Aside);
Vue.use(Collapse);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Switch);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Backtop);
Vue.use(Card);
Vue.use(Col);
Vue.use(Row);
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
