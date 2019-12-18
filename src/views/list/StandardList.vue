<template>
  <div>
    <a-card v-if="currole === 0" :bordered="false">
      <a-row>
        <a-col :sm="8" :xs="24">
          <head-info title="待分配任务" :content="createTaskNum" :bordered="true"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info title="待完成任务" :content="doingTaskNum" :bordered="true"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info title="已完成任务" :content="endTaskNum"/>
        </a-col>
      </a-row>
    </a-card>

    <a-card
      style="margin-top: 24px"
      :bordered="false"
      title="任务列表">

      <div slot="extra">
        <a-radio-group v-model="status">
          <a-radio-button value="all">全部</a-radio-button>
          <a-radio-button value="processing">进行中</a-radio-button>
          <a-radio-button value="waiting">创建中</a-radio-button>
        </a-radio-group>
        <a-input-search style="margin-left: 16px; width: 272px;" />
      </div>

      <div v-if="currole === 0" class="operate">
        <a-button type="dashed" style="width: 100%" icon="plus" @click="$refs.taskForm.add()">新建任务</a-button>
      </div>

      <a-list size="large" :pagination="{showSizeChanger: true, showQuickJumper: true, pageSize: 5, total: 50}">
        <a-list-item :key="index" v-for="(item, index) in data">
          <a-list-item-meta :description="item.taskContent">
            <a-avatar slot="avatar" size="large" shape="square" :src="avatarurl"/>
            <a @click="$refs.formDetail.show(item)" slot="title">{{ item.taskName }}</a>
          </a-list-item-meta>
          <!-- <div slot="actions">
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item><a>编辑</a></a-menu-item>
                <a-menu-item><a>删除</a></a-menu-item>
              </a-menu>
              <a>更多<a-icon type="down"/></a>
            </a-dropdown>
          </div> -->
          <div class="list-content">
            <div class="list-content-item">
              <span>状态</span>
              <p>{{ item.taskStatusDes }}</p>
            </div>
            <div class="list-content-item">
              <span>创建时间</span>
              <p>{{ item.createTime }}</p>
            </div>
          </div>

          <div v-if="item.taskStatusDes=='创建中' && currole === 0" slot="actions">
            <a @click="$refs.taskForm.edit(item)">编辑</a>
          </div>
          <div v-else-if="currole === 0" slot="actions">
            <a disabled="disabled">编辑</a>
          </div>

          <div v-if="item.taskStatusDes=='创建中' && currole === 0" slot="actions">
            <a @click="deletedata(item.taskId)">删除</a>
          </div>
          <div v-else-if="currole === 0" slot="actions">
            <a disabled="disabled">删除</a>
          </div>

          <div v-if="item.taskStatusDes=='创建中' && currole === 0" slot="actions">
            <a @click="$refs.taskDisp.show(item)">分配</a>
          </div>
          <div v-else-if="(item.taskStatusDes=='进行中' || item.taskStatusDes=='已完成') && currole === 0" slot="actions">
            <a @click="$refs.taskCom.show(item)">点评</a>
          </div>
          <div v-else-if="currole === 0" slot="actions">
            <a disabled="disabled">分配</a>
          </div>

          <div v-if="item.taskStatusDes=='进行中' && currole === 1" slot="actions">
            <a @click="$refs.taskComfir.show(item)">确认完成</a>
          </div>
          <div v-else-if="currole === 1" slot="actions">
            <a disabled="disabled">确认完成</a>
          </div>

        </a-list-item>
      </a-list>

      <task-form @refreshdata="refreshdata" ref="taskForm" />
      <form-detail ref="formDetail" />
      <task-disp @refreshdata="refreshdata" ref="taskDisp" />
      <task-com @refreshdata="refreshdata" ref="taskCom" />
      <task-comfir @refreshdata="refreshdata" ref="taskComfir" />
    </a-card>
  </div>
</template>

<script>
import HeadInfo from '@/components/tools/HeadInfo'
import TaskForm from './modules/TaskForm'
import FormDetail from './modules/FormDetail'
import TaskDisp from './modules/TaskDisp'
import TaskCom from './modules/TaskCom'
import TaskComfir from './modules/TaskComfir'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
export default {
  name: 'StandardList',
  components: {
    HeadInfo,
    TaskForm,
    FormDetail,
    TaskDisp,
    TaskCom,
    TaskComfir
  },
  created () {
    this.refreshdata()
    this.satadata()
    this.currole = JSON.parse(localStorage.getItem('userinfo')).userRole
  },
  data () {
    return {
      createTaskNum: '0',
      endTaskNum: '0',
      doingTaskNum: '0',
      currole: 1,
      data: [],
      avatarurl: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
      status: 'all'
    }
  },
  methods: {
    refreshdata () {
      sleep(200)
      this.$axios2.post(
        'task/all',
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
    deletedata (taskId) {
      this.$axios2.post(
        'task/delete',
        JSON.parse('{"taskId":' + taskId + '}'),
        response => {
          if (response.status >= 200 && response.status < 300) {
            this.data = response.data.data.dataList
            console.log(response.data)
            this.openNotification(1)
          } else {
            console.log(response.message)
            this.openNotification(0)
          }
        }
      )
      this.refreshdata()
    },
    satadata (taskId) {
      this.$axios2.post(
        'task/statistics',
        JSON.parse('{}'),
        response => {
          if (response.status >= 200 && response.status < 300) {
            this.createTaskNum = response.data.data.createTaskNum + ''
            this.endTaskNum = response.data.data.endTaskNum + ''
            this.doingTaskNum = response.data.data.doingTaskNum + ''
            console.log(response.data)
          } else {
            console.log(response.message)
          }
        }
      )
      this.refreshdata()
    },
    openNotification (state) {
      let des = ''
      if (state === 1) {
        des = '操作成功！'
      } else {
        des = '操作失败！'
      }
      this.$notification.open({
        message: 'Notification Title',
        description: des,
        duration: 2
      })
    }
  }
}
</script>

<style lang="less" scoped>
    .ant-avatar-lg {
        width: 48px;
        height: 48px;
        line-height: 48px;
    }

    .list-content-item {
        color: rgba(0, 0, 0, .45);
        display: inline-block;
        vertical-align: middle;
        font-size: 14px;
        margin-left: 40px;
        span {
            line-height: 20px;
        }
        p {
            margin-top: 4px;
            margin-bottom: 0;
            line-height: 22px;
        }
    }
</style>
