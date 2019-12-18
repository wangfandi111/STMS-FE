<template>
  <a-modal
    :width="640"
    :visible="visible"
    title="完成任务"
    @ok="handleSubmit"
    @cancel="visible = false"
  >
    <a-form :form="form">
      <a-form-item
        label="请输入完成内容"
      >
        <a-textarea v-decorator="['comfir']"></a-textarea>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      curtaskId: 0,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    show (record) {
      this.curtaskId = record.taskId
      this.visible = true
    },
    handleSubmit () {
      const {
        form: { validateFields }
      } = this
      this.visible = false
      validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          this.$axios2.post(
            'task/submit',
            JSON.parse('{"taskId":' + this.curtaskId + ', "submitText":"' + values.comfir + '"}'),
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
