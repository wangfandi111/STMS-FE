<template>
  <a-modal
    :width="640"
    :visible="visible"
    title="任务分派"
    @ok="handleSubmit"
    @cancel="visible = false"
  >
    <a-select
      mode="multiple"
      :defaultValue="[]"
      style="width: 100%"
      @change="handleChange"
      placeholder="请选择执行人"
      :value="value"
    >
      <a-select-option v-for="d in data" :key="d.userId">{{d.userName}}</a-select-option>
    </a-select>
  </a-modal>
</template>

<script>
export default {
  data () {
    return {
      data: [],
      value: [],
      visible: false,
      taskId: 0,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    show (record) {
      this.visible = true
      this.value = []
      this.taskId = record.taskId
      this.refreshdata()
    },
    handleSubmit () {
      this.visible = false
      const j = JSON.parse('{"taskId":' + this.taskId + ', "student":""}')
      j['student'] = this.value
      console.log('step4', j)
      this.$axios2.post(
        'task/distribute',
        j,
        response => {
          if (response.status >= 200 && response.status < 300) {
            if (response.data.code === 200) {
              this.$emit('refreshdata')
              this.openNotification(1)
              console.log('分派成功')
            }
            console.log(response.data)
          } else {
            this.openNotification(0)
            console.log(response.message)
          }
        }
      )
    },
    handleChange (value) {
      this.value = value
    },
    refreshdata () {
      this.$axios2.post(
        'user/students',
        JSON.parse('{"pageNo":1,"pageSize":1000}'),
        response => {
          if (response.status >= 200 && response.status < 300) {
            this.data = response.data.data.dataList
            console.log(response.data)
          } else {
            console.log(response.message)
          }
        }
      )
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
