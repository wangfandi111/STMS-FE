<template>
  <a-modal
    :width="640"
    :visible="visible"
    title="任务点评"
    @ok="handleSubmit"
    @cancel="visible = false"
  >
    <a-form :form="form">
      <a-form-item
        label="请输入点评"
      >
        <a-textarea v-decorator="['com']"></a-textarea>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  data () {
    return {
      curtaskid: 0,
      visible: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    show (record) {
      const {
        form: { setFieldsValue }
      } = this
      this.visible = true
      this.curtaskid = record.taskId
      this.$nextTick(() => {
        setFieldsValue({ com: record.remarkText })
      })
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
            'task/remark',
            JSON.parse('{"taskId":' + this.curtaskid + ', "remarkText": "' + values.com + '"}'),
            response => {
              if (response.status >= 200 && response.status < 300) {
                this.visible = false
                this.$emit('refreshdata')
                this.openNotification(1)
                console.log(response.data)
              } else {
                console.log(response.message)
                this.openNotification(0)
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
