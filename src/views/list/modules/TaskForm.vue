<template>
  <a-modal
    :width="640"
    :visible="visible"
    title="任务添加"
    @ok="handleSubmit"
    @cancel="visible = false"
  >
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item label="任务名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-decorator="['taskName', {rules:[{required: true, message: '请输入任务名称'}]}]" />
      </a-form-item>
      <!-- <a-form-item
        label="开始时间"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-date-picker style="width: 100%" v-decorator="['startTime', {rules:[{required: true, message: '请选择开始时间'}]}]" />
      </a-form-item>
      <a-form-item
        label="任务负责人"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-select v-decorator="['owner', {rules:[{required: true, message: '请选择开始时间'}]}]">
          <a-select-option :value="0">付晓晓</a-select-option>
          <a-select-option :value="1">周毛毛</a-select-option>
        </a-select>
      </a-form-item>-->
      <a-form-item label="任务详情" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-textarea v-decorator="['desc']"></a-textarea>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  name: 'TaskForm',
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      formState: 0,
      taskId: 0,
      visible: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    add () {
      const {
        form: { setFieldsValue }
      } = this
      this.visible = true
      this.formState = 0
      this.$nextTick(() => {
        setFieldsValue({ taskName: '', desc: '' })
      })
    },
    edit (record) {
      const {
        form: { setFieldsValue }
      } = this
      this.visible = true
      this.formState = 1
      this.taskId = record.taskId
      console.log(record)
      this.$nextTick(() => {
        setFieldsValue({ taskName: record.taskName, desc: record.taskContent })
      })
    },
    handleSubmit () {
      const {
        form: { validateFields }
      } = this
      this.visible = true
      validateFields((errors, values) => {
        if (!errors && this.formState === 0) {
          console.log('values', values)
          this.$axios2.post(
            'task/pub',
            JSON.parse('{"taskName":"' + values.taskName + '", "taskContent": "' + values.desc + '"}'),
            response => {
              if (response.status >= 200 && response.status < 300) {
                this.visible = false
                this.$emit('refreshdata')
                this.openNotification(1)
                console.log(response.data)
              } else {
                this.openNotification(0)
                console.log(response.message)
              }
            }
          )
        } else if (!errors && this.formState === 1) {
          this.$axios2.post(
            'task/modify',
            JSON.parse('{"taskId": ' + this.taskId + ', "taskName":"' + values.taskName + '", "taskContent": "' + values.desc + '"}'),
            response => {
              if (response.status >= 200 && response.status < 300) {
                this.visible = false
                this.$emit('refreshdata')
                this.openNotification(1)
                console.log(response.data)
              } else {
                this.openNotification(0)
                console.log(response.message)
              }
            }
          )
        }
      })
    },
    openNotification (state) {
      let des = ''
      if (state === 1) {
        des = '操作成功！'
      } else {
        des = '操作失败！'
      }
      this.$message.info(des)
    }
  }
}
</script>
