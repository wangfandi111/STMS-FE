<template>
  <div>
    <a-card :bordered="false">
      <a-row>
        <a-col :sm="8" :xs="24">
          <head-info title="待分配任务" content="3" :bordered="true"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info title="待完成任务" content="8" :bordered="true"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info title="已完成任务" content="5"/>
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

      <div class="operate">
        <a-button type="dashed" style="width: 100%" icon="plus" @click="$refs.taskForm.add()">新建任务</a-button>
      </div>

      <a-list size="large" :pagination="{showSizeChanger: true, showQuickJumper: true, pageSize: 5, total: 50}">
        <a-list-item :key="index" v-for="(item, index) in data">
          <a-list-item-meta :description="item.description">
            <a-avatar slot="avatar" size="large" shape="square" :src="item.avatar"/>
            <a @click="$refs.formDetail.show()" slot="title">{{ item.title }}</a>
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
              <p>{{ item.state }}</p>
            </div>
            <div class="list-content-item">
              <span>创建时间</span>
              <p>{{ item.startAt }}</p>
            </div>
          </div>

          <div v-if="item.state=='创建中'" slot="actions">
            <a @click="$refs.taskForm.edit(item)">编辑</a>
          </div>
          <div v-else slot="actions">
            <a disabled="disabled">编辑</a>
          </div>

          <div v-if="item.state=='创建中'" slot="actions">
            <a>删除</a>
          </div>
          <div v-else slot="actions">
            <a disabled="disabled">删除</a>
          </div>

          <div v-if="item.state=='创建中'" slot="actions">
            <a @click="$refs.taskDisp.show(item)">分配</a>
          </div>
          <div v-else-if="item.state=='进行中' || item.state=='已完成'" slot="actions">
            <a @click="$refs.taskCom.show(item)">点评</a>
          </div>
          <div v-else slot="actions">
            <a disabled="disabled">分配</a>
          </div>

        </a-list-item>
      </a-list>

      <task-form ref="taskForm" />
      <form-detail ref="formDetail" />
      <task-disp ref="taskDisp" />
      <task-com ref="taskCom" />
    </a-card>
  </div>
</template>

<script>
import HeadInfo from '@/components/tools/HeadInfo'
import TaskForm from './modules/TaskForm'
import FormDetail from './modules/FormDetail'
import TaskDisp from './modules/TaskDisp'
import TaskCom from './modules/TaskCom'

const data = []
data.push({
  taskid: '1',
  title: '任务一号',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
  description: '那是一种内在的东西， 他们到达不了，也无法触及的',
  state: '创建中',
  startAt: '2018-07-26 22:44'
})
data.push({
  taskid: '2',
  title: '快去做作业！',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
  description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
  state: '进行中',
  startAt: '2018-07-26 22:44'
})
data.push({
  taskid: '3',
  title: '做完作业了吗',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
  description: '生命就像一盒巧克力，结果往往出人意料',
  state: '已完成',
  startAt: '2018-07-26 22:44'
})
data.push({
  taskid: '4',
  title: '你妈喊你回家吃饭',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
  description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
  state: '创建中',
  startAt: '2018-07-26 22:44'
})
data.push({
  taskid: '5',
  title: '窝窝头一块钱四个',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
  description: '那时候我只会想自己想要什么，从不想自己拥有什么',
  state: '创建中',
  startAt: '2018-07-26 22:44'
})

export default {
  name: 'StandardList',
  components: {
    HeadInfo,
    TaskForm,
    FormDetail,
    TaskDisp,
    TaskCom
  },
  data () {
    return {
      data,
      status: 'all'
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
