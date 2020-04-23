<template>
  <Modal
  title="派车车辆选取"
  :mask-closable="false"
  :value="value"
  :closable="false"
  width="800"
  @on-visible-change="showchange">
    <div class="body">
      <div style="width:50%">
        <Form :label-width="70" ref="Form" :model="Form" inline>
          <Row type="flex" justify="start">
            <Col span="24">
              <FormItem label="外观部位" style="width:90%">
                <Select>
                  <Option value="1"></Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col span="24">
              <FormItem label="状态" style="width:90%">
                <Select>
                  <Option value="1"></Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <FormItem label="备注" style="width:90%">
                <Input type="textarea" :rows="5" placeholder="请输入取消原因..." />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
      <div style="width:50%">
        <img src="@/images/vehicleparts.png" alt="" style="width:100%">
      </div>
    </div>
    <div slot="footer">
      <Button type="text" @click="showchange(false)">取消</Button>
      <Button type="primary" @click="save">确定</Button>
    </div>
  </Modal>
</template>

<script lang="ts">
  import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
  import Util from '@/lib/util'
  import AbpBase from '@/lib/abpbase'
  import PageRequest from '@/store/entities/page-request'
  import publicclass from '@/lib/publicclass'
  
  @Component({
      components:{}
  })
  export default class AddDispatchCar extends AbpBase{
    @Prop({type:Boolean,default:false}) value!:Boolean;

    Form={

    }



    /**模态框状态 */
    async showchange(value){
      if(!value){
        this.$emit("input",value);
      }else{

      }
    }
    /**提交 */
    async save(){
      // (this.$refs.BankForm as any).validate((valid:Boolean)=>{
      //   if(valid){
      //     if (this.AddOrEdit==1) {
      //       this.$emit("save-accbank",PublicClass.DeepClone(this.BankForm),1,this.Index)
      //     }else{
      //       this.$emit("save-accbank",PublicClass.DeepClone(this.BankForm),2,this.Index)
      //     }
      //     this.showchange(false)
      //   }else{
      //     return
      //   }
      // })
    }
  }
</script>

<style lang="less">
.body{
  display: flex;
  justify-content: space-between;
}
</style>