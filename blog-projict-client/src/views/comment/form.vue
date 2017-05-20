<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Form-item label="姓名" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
        </Form-item>
        <Form-item label="密码" prop="psd">
            <Input v-model="formValidate.psd" type="password" placeholder="请输入密码"></Input>
        </Form-item>
        <Form-item label="邮箱" prop="mail">
            <Input v-model="formValidate.mail" placeholder="请输入邮箱"></Input>
        </Form-item>
        <Form-item label="城市" prop="city">
            <Select v-model="formValidate.city" placeholder="请选择所在地">
                <Option value="beijing">北京市</Option>
                <Option value="shanghai">上海市</Option>
                <Option value="shenzhen">深圳市</Option>
            </Select>
        </Form-item>
        <Form-item label="选择日期">
            <Row>
                <Col span="11">
                    <Form-item prop="date">
                        <Date-picker type="date" placeholder="选择日期" v-model="formValidate.date"></Date-picker>
                    </Form-item>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
            </Row>
        </Form-item>
        <Form-item label="性别" prop="gender">
            <Radio-group v-model="formValidate.gender">
                <Radio label="male">男</Radio>
                <Radio label="female">女</Radio>
            </Radio-group>
        </Form-item>
        <Form-item label="爱好" prop="interest">
            <Checkbox-group v-model="formValidate.interest">
                <Checkbox label="吃饭"></Checkbox>
                <Checkbox label="睡觉"></Checkbox>
                <Checkbox label="跑步"></Checkbox>
                <Checkbox label="看电影"></Checkbox>
            </Checkbox-group>
        </Form-item>
        <Form-item label="介绍" prop="desc">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
        </Form-item>
        <Form-item>
            <Button type="primary" @click="handleSubmit('formValidate')" >提交</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </Form-item>
    </Form>
</template>
<script>
    var CryptoJs = require('crypto-js');
    export default {
        props:['mymodel','acList'],
        data () {
            return {
                meFa:true,
                formValidate: {
                    _id:null,
                    name: '',
                    psd: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    desc: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    psd: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: '请选择城市', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: '至少选择一个爱好', trigger: 'change' },
                        { type: 'array', max: 2, message: '最多选择两个爱好', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请输入个人介绍', trigger: 'blur' },
                        { type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        var _this = this;
                        var subMethod = '';
                        var subUrl = '';

                        if(_this.formValidate._id != null){
                            subUrl = 'http://localhost:3000/users/'+ _this.formValidate._id;
                            subMethod = 'PUT'
                        }else{
                            subUrl = 'http://localhost:3000/users/data/';
                            subMethod = 'POST'
                        }
                        console.log(subUrl);
                        _this.formValidate.psd = CryptoJs.MD5(_this.formValidate.psd,{assign:true}).toString();
                        this.$http({
                            method: subMethod,
                            url:subUrl,
                            data:_this.formValidate
                        }).then(function(res){
                            _this.meFa = false;
                            _this.$emit('modalChange',_this.meFa)
                            _this.$Message.success('提交成功!');
                            Object.assign(_this.$data.formValidate,_this.$options.data().formValidate);//清空
                        })
                    } else {
                        this.$Message.error('表单验证失败!');

                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        },
        watch: {
            acList(){
                var _this = this;
                if(this.acList){
                    _this.formValidate = _this.acList;
                }
            }
        }
    }
</script>
