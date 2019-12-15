<template>
  <a-card :bordered="false">
    <a-table :columns="columns" :dataSource="data" bordered>
      <template v-for="col in ['name', 'age', 'address']" :slot="col" slot-scope="text, record">
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, col)"
          />
          <template v-else>{{text}}</template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.key)">Save</a>
            <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="() => edit(record.key)">Edit</a>
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
    dataIndex: 'name',
    width: '40%',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '学号',
    dataIndex: 'studentid',
    width: '60%',
    scopedSlots: { customRender: 'age' }
  }
]

const data = [
  {
    key: '1',
    name: '学生哈哈哈',
    studentid: 15555555
  },
  {
    key: '2',
    name: '学生哈哈哈2',
    studentid: 18888888
  }
]
export default {
  data () {
    this.cacheData = data.map(item => ({ ...item }))
    return {
      data,
      columns
    }
  }
}
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
