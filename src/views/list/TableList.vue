<template>
  <a-card :bordered="false">
    <a-table :columns="columns" :dataSource="data" bordered>
      <template v-for="col in ['userName', 'userJobid', 'address']" :slot="col" slot-scope="text, record">
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.userId, col)"
          />
          <template v-else>{{text}}</template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.userId)">Save</a>
            <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.userId)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="() => edit(record.userId)">Edit</a>
          </span>
        </div>
      </template>
    </a-table>
  </a-card>
</template>

<script>
const columns = [
  {
    title: '姓名',
    dataIndex: 'userName',
    width: '40%',
    scopedSlots: { customRender: 'userName' }
  },
  {
    title: '学号',
    dataIndex: 'userJobid',
    width: '60%',
    scopedSlots: { customRender: 'userJobid' }
  }
]

export default {
  created () {
    this.refreshdata()
  },
  data () {
    return {
      data: [],
      columns
    }
  },
  methods: {
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
    }
  }
}
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
