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
      placeholder="Please select"
      :value="value"
    >
      <a-select-option v-for="d in data" :key="d.studentid">{{d.name}}</a-select-option>
    </a-select>
  </a-modal>
</template>

<script>
const data = []
data.push({
  name: '刘1',
  studentid: '15555555'
})
data.push({
  name: '刘2',
  studentid: '15555556'
})
data.push({
  name: '刘3',
  studentid: '15555557'
})

export default {
  data () {
    return {
      data,
      value: [],
      visible: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    show () {
      this.visible = true
      this.value = []
    },
    handleSubmit () {
      this.visible = false
    },
    handleChange (value) {
      // console.log(`selected ${value}`)
      // console.log(value)
      this.value = value
    }
  }
}
</script>
