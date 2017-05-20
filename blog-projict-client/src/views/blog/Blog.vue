<template>
    <div>
       <div class="layout-breadcrumb">
            <Breadcrumb>
                <Breadcrumb-item href="/">首页</Breadcrumb-item>
                <Breadcrumb-item>博客管理</Breadcrumb-item>
            </Breadcrumb>
        </div>

        <div id="btns">
        <div class="container">
            <h2>Upload file</h2>
            <vue-base64-file-upload 
                class="v1"
                accept="image/png,image/jpeg"
                image-class="v1-image"
                input-class="v1-input"
                :max-size="customImageMaxSize"
                @size-exceeded="onSizeExceeded"
                @file="onFile"
                @load="onLoad" />
            </div>
  <Upload action="http://localhost:3000/blog/uploads" name="avatar" :data="formData">
        <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
    </Upload>

            <Button type="info" @click="modal1 =true">添加</Button>
            <Button type="warning" @click="removes">删除</Button>
            <Input icon="search" placeholder="请输入..." v-model="filter.name" style="width:200px;"></Input>
            <Button type="ghost" @click="getData">搜索数据</Button>
        
            <Modal v-model="modal1">
                <p slot="header" style="color:#f60;text-align:center">
                    <Icon type="information-circled"></Icon>
                    <span>添加数据</span>
                </p>
                
                <div slot="footer">
                    
                </div>


                 <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                     
                    <Form-item label="标题" prop="title">
                        <Input v-model="formValidate.title" placeholder="请输入标题"></Input>
                    </Form-item>
     
                    <Form-item label="介绍" prop="desc">
                        <quill-editor ref="myTextEditor"
                        v-model="formValidate.desc"
                        >
                        </quill-editor>

                    </Form-item>
                    <Form-item>
                        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                    </Form-item>
                </Form>
            </Modal>
             <Table border :columns="columns" :data="list" @on-selection-change="handleSelectChange"></Table>
             <Page :total="filter.total" :current="filter.page" :page-size="filter.limit" @on-change="changePage" size="small" show-elevator show-sizer></Page>

        </div>
     </div>
</template>

<script>
   import Base from '../../common/Base.js';
import { quillEditor } from 'vue-quill-editor'
import VueBase64FileUpload from 'vue-base64-file-upload';

    export default{
        mixins:[Base],
        components: {
            quillEditor,
            VueBase64FileUpload
        },
        data() {
            return {
                 customImageMaxSize: 3,
                 formData:{
                    a:'1',
                    b:'2',
                    c:"3"
                 },
                 columns: [
                     {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    
                    {
                        title: '标题',
                        key: 'title'
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
                                }, '修改'),
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
                model:'blog',
                formValidate: {
                    _id:null,
                    title: '', 
                    desc: '',
                    image:''
                },
                ruleValidate: {
                    title: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    
                    desc: [
                        { required: true, message: '请输入个人介绍', trigger: 'blur' },
                        { type: 'string', min: 2, message: '介绍不能少于2字', trigger: 'blur' }
                    ]
                }
              }
        },
        methods: {
             onFile(file) {
                console.log(file); // file object
                },

                onLoad(dataUri) {
                    this.formValidate.image = dataUri;
                },

                onSizeExceeded(size) {
                 alert(`Image ${size}Mb size exceeds limits of ${this.customImageMaxSize}Mb!`);
                }
        }
    }
</script>