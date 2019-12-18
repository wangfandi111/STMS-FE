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
    <a-form :form="form">
      <a-form-item
        label="教师点评"
      >
        <a-textarea readOnly v-decorator="['com']"></a-textarea>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
const columns = [
  {
    title: '姓名',
    dataIndex: 'stuName',
    width: '20%',
    scopedSlots: { customRender: 'stuName' }
  },
  {
    title: '状态',
    dataIndex: 'hasSubmittedDes',
    width: '20%',
    scopedSlots: { customRender: 'hasSubmittedDes' }
  },
  {
    title: '完成内容',
    dataIndex: 'submitText',
    width: '30%',
    scopedSlots: { customRender: 'submitText' }
  },
  {
    title: '完成时间',
    dataIndex: 'submitTime',
    width: '30%',
    scopedSlots: { customRender: 'submitTime' }
  }
]

export default {
  data () {
    return {
      data: [],
      columns,
      curtaskId: 0,
      remark: '',
      visible: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    show (record) {
      this.visible = true
      this.curtaskId = record.taskId
      this.refreshdata()
      this.getcom()
    },
    handleSubmit () {
      this.visible = false
    },
    refreshdata () {
      this.$axios2.post(
        'task/detail',
        JSON.parse('{"taskId":' + this.curtaskId + ', "pageNo":1, "pageSize":1000}'),
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
    getcom () {
      const {
        form: { setFieldsValue }
      } = this
      this.$axios2.post(
        'task/search',
        JSON.parse('{"taskId":' + this.curtaskId + '}'),
        response => {
          if (response.status >= 200 && response.status < 300) {
            this.$nextTick(() => {
              setFieldsValue({ com: response.data.data.remarkText })
            })
          } else {
            console.log(response.message)
          }
        }
      )
    }
  }
}
</script>
