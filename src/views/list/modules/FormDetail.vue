<template>
  <a-modal
    :width="640"
    :visible="visible"
    title="任务详情"
    @ok="handleSubmit"
    @cancel="visible = false"
  >
    <template slot="footer">
      <a-button key="submit" type="primary" @click="handleSubmit">确定</a-button>
    </template>
    <a-table :columns="columns" :dataSource="data" bordered>
    </a-table>
  </a-modal>
</template>

<script>
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: '30%',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '状态',
    dataIndex: 'state',
    width: '30%',
    scopedSlots: { customRender: 'age' }
  },
  {
    title: '时间',
    dataIndex: 'endAt',
    width: '40%',
    scopedSlots: { customRender: 'age' }
  }
]

const data = []
data.push({
  name: '刘1',
  state: '进行中',
  endAt: '-'
})
data.push({
  name: '刘2',
  state: '已完成',
  endAt: '2018-07-26 22:44'
})
data.push({
  name: '刘3',
  state: '已完成',
  endAt: '2018-07-26 22:44'
})

export default {
  data () {
    return {
      data,
      columns,
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
