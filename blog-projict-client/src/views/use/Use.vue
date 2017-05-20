<template>
	<div>
		<div class="layout-breadcrumb">
            <Breadcrumb>
                <Breadcrumb-item href="/">首页</Breadcrumb-item>
                <Breadcrumb-item>用户管理</Breadcrumb-item>
            </Breadcrumb>
        </div>
        <div id="bts">
        	<Button type="info" @click="modal = true">添加用户</Button>
		    <Modal v-model="modal">
		        <p slot="header" style="color:#f60;text-align:center">
		            <Icon type="information-circled"></Icon>
		            <span>添加用户</span>
		        </p>
		        <putForm :mymodel="modal" :acList="actList" @modalChange="changeModal"></putForm>
		        <div slot="footer">
		           
		        </div>
		    </Modal>


        	<Button type="warning" @click="removes">删除用户</Button>
        	<Input icon="search" placeholder="请输入..." v-model="filter.name" style="width:200px"></Input>
        	<Button type="ghost" @click="getData">搜索数据</Button>
        </div>
        <Table border :columns="columns" :data="list" @on-selection-change="handleSelect"></Table>
        <Page :total="filter.total" :current="filter.page" :page-size="filter.limit" @on-change="changePage" size="small" show-elevator show-sizer></Page>
	</div>
</template>

<script>
	import Form from '../comment/form.vue';

    export default {
        data () {
            return {
                actList:[],
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: '性别',
                        key: 'gender'
                    },
                    {
                        title: '城市',
                        key: 'city'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.update(params.index)
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                modal: false,
                list:[],
                self:this,
                ids:[],
                filter:{
                    limit:5,
                    page:1,
                    name:'',
                    total:0
                }
            }
        },
        methods: {
            getData(){
                var _this = this;
                this.$http.post('http://localhost:3000/users/list',_this.filter)
                .then(function(res){
                    if('docs' in res.data){
                        _this.list = res.data.docs;
                        _this.filter.total = res.data.total;
                    }
                })
                .catch(function(err){
                    console.log(err);
                });
            },
            changeModal(value){
                if(value === false){
                    this.modal = false;
                }
            },
            changePage(page){
                this.filter.page = page;
                this.getData();
            },
            handleSelect(select){
                var _this=this;
                if(select.length>0){
                    var ids = [];
                    let selectLen = select.length;
                    for(var i=0;i<selectLen;i++){
                        ids.push(select[i]._id);
                    }
                    _this.ids = ids;
                }
                console.log(_this.ids);
            },
            removes(){
                var _this = this;
                if(_this.ids.length>0){
                    _this.$Modal.confirm({
                        title:'警告',
                        contect:'确认删除',
                        onOk: ()=>{
                            _this.$http.post('http://localhost:3000/users/removes',{ids:_this.ids}).then(function(res){
                                _this.getData();
                                _this.$Message.info('删除成功');
                            })
                        },
                        onCancle:()=>{
                            _this.$Message.info('取消删除');
                        }
                    })
                }
            },
            remove(index){
                var _this = this;
                var id = _this.list[index]._id;
                _this.$Modal.confirm({
                        title:'警告',
                        contect:'确认删除',
                        onOk: ()=>{
                            _this.$http.delete('http://localhost:3000/users/'+id).then(function(res){
                                _this.getData();
                                _this.$Message.info('删除成功');
                            })
                        },
                        onCancle:()=>{
                            _this.$Message.info('取消删除');
                        }
                    })
            },
            update(index){
                var _this = this;
                _this.modal = true;
                var dataObj = Object.assign({},_this.list[index]);
                _this.actList=dataObj;
            }
        },
        components:{
        	putForm:Form
        },
        created(){
            this.getData();
        }
    }
</script>