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
      visible: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    show () {
      this.visible = true
    },
    handleSubmit () {
      this.visible = false
    }
  }
}
</script>
