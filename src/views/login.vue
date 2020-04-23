<template>
  <div class="container">
    <div class="content">
      <div class="main">
        <Card class="card" :dis-hover="true">
          <div class="top">
            <div class="header">
              <a>
                <img class="logo" src="../images/yunying.png"/>
                <span class="title" style="color:#F8F8FF">{{L('AppName')}}</span>
              </a>
            </div>
            <div class="desc">
              <!-- {{L('WelcomeMessage')}} -->
            </div>
          </div>
          <!--<div v-if="!!tenant" class="tenant-title"><a @click="showChangeTenant=true">{{L('CurrentTenant')}}:{{tenant.name}}</a></div>
          <div v-if="!tenant" class="tenant-title"><a @click="showChangeTenant=true">{{L('NotSelected')}}</a></div>-->
          <Form ref="loginform" :rules="rules" :model="loginModel" style="margin: 0 60px;margin-top:50px;">
            <FormItem prop="userNameOrEmailAddress">
              <div class="ivu-input-wrapper ivu-input-wrapper-large ivu-input-type">
                <input v-model="loginModel.userNameOrEmailAddress" autocomplete="off" spellcheck="false" type="text" :placeholder="L('UserNamePlaceholder')" class="lg-input ivu-input ivu-input-large" style="padding-left:20px;padding-right:0;background:rgba(242,242,242,0.1)">
              </div>
            </FormItem>
            <FormItem prop="password">
              <div class="ivu-input-wrapper ivu-input-wrapper-large ivu-input-type">
                <input v-model="loginModel.password" autocomplete="off" spellcheck="false" type="password" :placeholder="L('PasswordPlaceholder')" class="lg-input ivu-input ivu-input-large" style="padding-left:20px;padding-right:0;background:rgba(242,242,242,0.1)">
              </div>
            </FormItem>
          </Form>
          <div style="margin:0 100px">
            <Checkbox v-model="loginModel.rememberMe" size="large" style="color:#F8F8FF">{{L('RememberMe')}}</Checkbox>
            <!-- <a style="float:right;font-size: 14px;margin-top: 3px;">{{L('ForgetPassword')}}</a> -->
          </div>
          <div style="margin:30px 100px 0 100px">
            <Button type="primary" style="height:50px;border-radius:25px;background: rgba(30,144,255,0.5)" @click="login" long size="large">{{L('LogIn')}}</Button>
          </div>
        </Card>
      </div>
    </div>
    <Footer :copyright="L('CopyRight')"></Footer>
    <tenant-switch v-model="showChangeTenant"></tenant-switch>
  </div>
</template>
<script lang="ts">
import { Component, Vue,Inject } from 'vue-property-decorator';
import Footer from '../components/Footer.vue'
import TenantSwitch from '../components/tenant-switch.vue'
import LanguageSwitch from '../components/language-switch.vue'
import iView from 'iview';
import AbpBase from '../lib/abpbase'
@Component({
  components:{Footer,TenantSwitch,LanguageSwitch}
})
export default class Login extends AbpBase {
  loginModel={
    userNameOrEmailAddress:'',
    password:'',
    rememberMe:false
  }
  showChangeTenant:boolean=false
  async login(){
    (this.$refs.loginform as any).validate(async (valid:boolean)=>{
       if(valid){
          this.$Message.loading({
            content:this.L('LoginPrompt'),
            duration:0
          })
          await this.$store.dispatch({
            type:'app/login',
            data:this.loginModel
          })
          sessionStorage.setItem('rememberMe',this.loginModel.rememberMe?'1':'0');
          location.reload();
       }
    });      
  }
  get tenant(){
    return this.$store.state.session.tenant;
  }
  rules={
    userNameOrEmailAddress: [
      { required: true, message: this.L('UserNameRequired'), trigger: 'blur' }
    ],
    password: [
      { required: true, message: this.L('PasswordRequired'), trigger: 'blur' }
    ]
  }
  created(){
  }
}
</script>

<style scoped>
  .container{
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-height: 100%;
    /*background: rgb(49, 183, 255);*/
    background: url(../images/newback.jpg);
    background-size: 100% 100%;
  }
  @media (min-width: 768px){.container{
    /*background-image: url(../images/back.png);*/
    background-repeat: no-repeat;
    /*background-position: center 110px;*/
    background-size: 100%;
    font-size: 18px;
  }}
  .content{
    padding: 32px 0;
    -ms-flex: 1 1 0%;
    flex: 1 1 0%;
  }
  @media (min-width:768px) {
    .content{
      padding: 112px 0 24px
    }
  }
  .main{
    width: 679px;
    height: 601px;
    border-radius:10px;
    border-style:solid;
    border-width:10px;
    border-color:rgba(120, 199, 252, 0.2);
    margin: 0 auto;
  }
  .card{
    border: 0px;
    background-color: rgba(242, 242, 242, 0.1);
    height: 100%;
    width: 100%
  }
  .top{
    margin: 66px 0 0 0;
    text-align: center
  }
  .logo{
    width: 19px;
    height: 27px;
    vertical-align: text-bottom;
    margin-right: 12px;
  }
  .title{
    font-size: 27px;
    color: #808080;
    font-family: "PingFangSC-Regular","Myriad Pro","Helvetica Neue",Arial,Helvetica,sans-serif;
    position: relative;
    line-height:24px;
  }
  .tenant-title{
    margin-bottom: 24px;
    text-align: center;
  }
  .lg-input{
    border-radius:25px;
    background: #f2f2f2;
    margin: 20px 0;
    height: 50px;
    width: 508px;
    font-size: 17px;
  }
</style>

