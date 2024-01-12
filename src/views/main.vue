<template>
  <div class="home">
    <header>
      {{ calss_name.now }}
      {{ now_page_start }}
      {{ now_page_end }}
    </header>
    <div class="main">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="未来" name="first">User</el-tab-pane>
        <el-tab-pane label="项目" name="second">

          <div :class="[calss_name.now, 'concomitant']" ref="now">
            <div class="zeus" v-for="(item, key) in now_datas"
              @click="(event) => classNameZeusClickFunc(event, 'now', item)">
              <div class="heracles"></div>
              <div class="themis">
                <img :src="get_img_url(item.img_url)" alt="">
              </div>
              <div class="hermes">{{ item.name }}</div>
              <div class="apollo">
                <ul>
                  <li v-for="(science, key) in item.sciences" :style="'--delay: .' + key + 's'">{{ science }}</li>
                </ul>
              </div>
            </div>
          </div>

          <div :class="[calss_name.after, 'concomitant']" ref="after"
            v-if="!(calss_name.now == 'now' && now_page_start == 0) || !(now_page_start == datas.length)">
            <div class="zeus" v-for="(item, key) in after_datas"
              @click="(event) => classNameZeusClickFunc(event, 'after', item)">
              <div class="heracles">
              </div>
              <div class="themis"></div>
              <div class="hermes">{{ item.name }}</div>
              <div class="apollo">
                <ul>
                  <li>vue</li>
                  <li style="--delay: .1s">vue</li>
                  <li style="--delay: .2s">vue</li>
                </ul>
              </div>
            </div>
          </div>

          <div :class="[calss_name.before, 'concomitant']" ref="before">
            <div class="zeus" v-for="(item, key) in before_datas"
              @click="(event) => classNameZeusClickFunc(event, 'before', item)">
              <div class="heracles">
              </div>
              <div class="themis"></div>
              <div class="hermes">{{ item.name }}</div>
              <div class="apollo">
                <ul>
                  <li>ts</li>
                  <li style="--delay: .1s">ts</li>
                  <li style="--delay: .2s">ts</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="button_left" v-show="!(calss_name.now == 'now' && now_page_start == 0)" ref="button_left"><svg
              viewBox="-100.9 99.1 61.9 105.9">
              <path
                d="m-98.2 158.8 43.5 43.5c1.7 1.7 4 2.7 6.5 2.7s4.8-1 6.5-2.7c1.7-1.7 2.7-4 2.7-6.5s-1-4.8-2.7-6.5l-37.2-37.2 37.2-37.2c1.7-1.7 2.7-4 2.7-6.5s-1-4.8-2.6-6.5c-1.8-1.9-4.2-2.8-6.6-2.8-2.3 0-4.6.9-6.5 2.6-11.5 11.4-41.2 41-43.3 43l-.2.2c-3.6 3.6-3.6 10.3 0 13.9z">
              </path>
            </svg>
          </div>
          <div class="button_right" v-show="!(now_page_start == datas.length)" ref="button_right"><svg
              viewBox="-100.9 99.1 61.9 105.9">
              <path
                d="m-41.7 145.3-43.5-43.5c-1.7-1.7-4-2.7-6.5-2.7s-4.8 1-6.5 2.7c-1.7 1.7-2.7 4-2.7 6.5s1 4.8 2.7 6.5L-61 152l-37.2 37.2c-1.7 1.7-2.7 4-2.7 6.5s1 4.8 2.6 6.5c1.8 1.9 4.2 2.8 6.6 2.8 2.3 0 4.6-.9 6.5-2.6 11.5-11.4 41.2-41 43.3-43l.2-.2c3.6-3.6 3.6-10.4 0-13.9z">
              </path>
            </svg></div>
        </el-tab-pane>
        <el-tab-pane label="个人简介" name="third">Role</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, computed } from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate, onBeforeRouteLeave } from "vue-router"
import type { TabsPaneContext } from 'element-plus'
import home_data from '@/assets/home.js'
const router = useRouter()

// -----------------  数据整备start
let datas = ref<any>([])
// 翻页
let now_page_start = ref<number>(0)
let now_page_end = ref<number>(4)

// 三个宙斯儿子的数据
let now_datas = ref<any>([])
let after_datas = ref<any>([])
let before_datas = ref<any>([])

// 获取左右按钮
const button_left = ref<any>(null)
const button_right = ref<any>(null)

// 类名
let calss_name = reactive<any>({
  now: 'now',
  after: 'after',
  before: 'before',
})
// -----------------  数据整备end

// 标签页切换
const activeName = ref('second') //默认页
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

// 事件节流
let before_date: any = 0
const throttle = (func: Function, wait: number) => {
  return function () {
    let dates: any = new Date()

    if (dates - before_date > wait) {
      console.log('允许');
      before_date = dates
      func()
    } else {
      console.log('不允许');
    }
  }
}
// 左按钮点击事件
const leftClickFunc = () => {
  button_left.value.style.border = '2px solid #FFFFFF'
  button_left.value.style.backgroundColor = '#47cf73'
  button_right.value.style = null
  let item = calss_name.now
  calss_name.now = calss_name.before
  calss_name.before = calss_name.after
  calss_name.after = item

  if (calss_name.after == 'after') {
    if ((now_page_start.value - 8) < 0) {
      after_datas.value = datas.value.slice(0, 0)
    } else {
      after_datas.value = datas.value.slice(now_page_start.value - 4, now_page_end.value - 4)
    }
  }
  if (calss_name.now == 'after') {
    now_page_start.value -= 12
    now_page_end.value -= 12
    now_datas.value = datas.value.slice(now_page_start.value, now_page_end.value)
  }
  if (calss_name.before == 'after') {
    before_datas.value = datas.value.slice(now_page_start.value - 8, now_page_end.value - 8)
  }
  // console.log(document.getElementsByClassName('now')[0]); //拿到的是before
  // console.log(document.getElementsByClassName('after')[0]); //拿到的是now
  // console.log(document.getElementsByClassName('before')[0]); //拿到的是after

  //js 实现

  document.getElementsByClassName('now')[0].style.animationName = 'name_now_left'
  document.getElementsByClassName('now')[0].style.animationDuration = '1s'
  document.getElementsByClassName('now')[0].style.animationTimingFunction = 'ease-out'

  document.getElementsByClassName('after')[0].style.animationName = 'name_after_left'
  document.getElementsByClassName('after')[0].style.animationDuration = '1s'
  document.getElementsByClassName('after')[0].style.animationTimingFunction = 'ease-out'

  document.getElementsByClassName('before')[0].style.animationName = 'name_before_left'
  document.getElementsByClassName('before')[0].style.animationDuration = '1s'
  document.getElementsByClassName('before')[0].style.animationTimingFunction = 'ease-out'

  if (now_page_start.value == 0) {
    console.log('左边到头了');
  }
}
// 右按钮点击事件
const rightClickFunc = () => {
  button_right.value.style.border = '2px solid #FFFFFF'
  button_right.value.style.backgroundColor = '#47cf73'
  button_left.value.style = null

  let item = calss_name.now
  calss_name.now = calss_name.after
  calss_name.after = calss_name.before
  calss_name.before = item

  if (calss_name.after == 'before') {
    after_datas.value = datas.value.slice(now_page_start.value + 8, now_page_end.value + 8)
  }
  if (calss_name.now == 'before') {
    now_page_start.value += 12
    now_page_end.value += 12
    now_datas.value = datas.value.slice(now_page_start.value, now_page_end.value)
  }
  if (calss_name.before == 'before') {
    before_datas.value = datas.value.slice(now_page_start.value + 4, now_page_end.value + 4)
  }
  // console.log(document.getElementsByClassName('now')[0]);  //拿到的是after  ; 实际是点击之前当前页面now到点击之后当前页面的after的变换过程
  // console.log(document.getElementsByClassName('after')[0]); // 拿到的是before
  // console.log(document.getElementsByClassName('before')[0]); // 拿到的是now

  // js 实现
  // ref封装过的dom节点是实时获取的，原js是存在延迟的
  document.getElementsByClassName('now')[0].style.animationName = 'name_now_right'
  document.getElementsByClassName('now')[0].style.animationDuration = '1s'
  document.getElementsByClassName('now')[0].style.animationTimingFunction = 'ease-out'

  document.getElementsByClassName('after')[0].style.animationName = 'name_after_right'
  document.getElementsByClassName('after')[0].style.animationDuration = '1s'
  document.getElementsByClassName('after')[0].style.animationTimingFunction = 'ease-out'

  document.getElementsByClassName('before')[0].style.animationName = 'name_before_right'
  document.getElementsByClassName('before')[0].style.animationDuration = '1s'
  document.getElementsByClassName('before')[0].style.animationTimingFunction = 'ease-out'

  // console.log(now.value);
  // console.log(document.getElementsByClassName('now')[0]);

  // console.log(after.value);
  // console.log(document.getElementsByClassName('after')[0]);

  // console.log(before.value);
  // console.log(document.getElementsByClassName('before')[0]);

  // vue3 实现（废除，ref封装过的dom节点是实时获取的，原js是存在延迟的.大概是这样）
  // aaaaleft.value = 1
  // if (aaaa.value == 1) {
  //   // 第一次点击时设置初始值
  //   now.value.style.animationName = 'name_now_right'
  //   now.value.style.animationDuration = '1s'
  //   now.value.style.animationTimingFunction = 'ease-out'

  //   after.value.style.animationName = 'name_after_right'
  //   after.value.style.animationDuration = '1s'
  //   after.value.style.animationTimingFunction = 'ease-out'

  //   before.value.style.animationName = 'name_before_right'
  //   before.value.style.animationDuration = '1s'
  //   before.value.style.animationTimingFunction = 'ease-out'
  //   aaaa.value += 1
  // } else {
  //   let item_animation = now.value.style.animationName
  //   now.value.style.animationName = after.value.style.animationName
  //   after.value.style.animationName = before.value.style.animationName
  //   before.value.style.animationName = item_animation
  // }

  if (now_page_start.value == datas.value.length) {
    console.log('右边到头了');
  }
}

// 内容点击事件
let beforeHtmlElement: HTMLElement | null = null
const classNameZeusClickFunc = (event: any, target: string, item: object) => {
  // 控制点击
  if (calss_name[target] != 'now') {
    console.log('不能点');
    return
  }
  router.push({
    path: `/project/${item.url}`,
    query: {
    }
  })
}

// 处理静态图片
const get_img_url = (url: string | URL) => {
  return new URL(url, import.meta.url).href
}
onMounted(() => {
  datas.value = home_data
  now_datas.value = datas.value.slice(now_page_start.value, now_page_end.value)
  after_datas.value = datas.value.slice(now_page_start.value - 4, now_page_end.value - 4)
  before_datas.value = datas.value.slice(now_page_start.value + 4, now_page_end.value + 4)
  // 给左按钮绑定左点击事件
  document.getElementsByClassName('button_left')[0].addEventListener('click', throttle(leftClickFunc, 500))
  // 给右按钮绑定右点击事件
  document.getElementsByClassName('button_right')[0].addEventListener('click', throttle(rightClickFunc, 500))
})

onBeforeRouteUpdate(() => {
})
onBeforeRouteLeave(() => {

})
</script>

<style lang="scss" >
.home {

  --opacity_now: 1;
  --opacity_not_now: .2;

  --width_now: 1080px;
  --padding_left_right_now: 0px;
  --position_left_now: 1080px;
  --position_right_now: -1080px;
  width: 100vw;
  height: 100vh;

  header {
    width: 100vw;
    height: 70px;
    background-color: rgb(231, 231, 231);
    box-shadow: 0px 0px 20px 7px #8e8e8e;
  }

  .main {
    height: calc(100vh - 70px);
    background-color: #19191d;
    perspective: 600px;

    .button {

      &_left,
      &_right {
        width: 50px;
        height: 75px;
        // border: 2px solid #FFFFFF;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color: #3f4863;
        z-index: 60;

        svg {
          width: 20px;
          height: 20px;
        }
      }

      // &_left:hover,
      // &_right:hover {
      //   background-color: #47cf73;
      // }

      &_left {
        left: -50px;
      }

      &_right {
        right: -50px;
      }
    }

    .now {
      left: 0;
      opacity: var(--opacity_now);

      .zeus:hover {
        .heracles {
          width: 500px;
          height: 350px;
        }

        .apollo {
          height: 25px;

          ul {
            li {
              opacity: 1;
              transform: translateY(0);
            }
          }
        }
      }
    }

    .after {
      left: var(--position_right_now);
      opacity: var(--opacity_not_now);
    }

    .before {
      left: var(--position_left_now);
      opacity: var(--opacity_not_now);
    }

    .concomitant {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      width: var(--width_now);
      padding: 0px var(--padding_left_right_now);
      position: absolute;
      top: 0;
      // background-color: black;

      .zeus {
        &:nth-child(-n + 2) {
          margin: 0 20px 20px 20px;
        }

        &:nth-child(n + 3) {
          margin: 20px 20px 0 20px;
        }

        width: 500px;
        height: 350px;
        position: relative;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        // background-color: black;

        .heracles {
          width: 450px;
          height: 280px;
          border-radius: 10px;
          background-color: #1c1c25;
          transition: width .2s ease-out, height .2s ease-out;
        }

        .themis {
          position: absolute;
          top: 20px;
          left: 50%;
          border-radius: 10px;
          transform: translateX(-50%);
          width: 450px;
          height: 260px;
          background-color: #373743;
          overflow: hidden;

          img {
            width: 450px;
            height: 260px;
            border-radius: 10px;
          }
        }

        .hermes {
          position: absolute;
          top: 280px;
          left: 50%;
          transform: translateX(-50%);
          width: 450px;
          height: 45px;
          line-height: 45px;
          font-size: 1.4rem;
          color: #FFFFFF;
          // background-color: #373737;
        }

        .themis:hover,
        .hermes:hover {
          cursor: pointer;
        }

        .apollo {
          position: absolute;
          top: 325px;
          left: 50%;
          transform: translateX(-50%);
          width: 450px;
          height: 0px;
          transition: height .2s ease-out 0.1s;
          font-size: 1rem;
          // background-color: #373737;

          ul {
            li {
              border-radius: 5px;
              margin: 0px 5px;
              padding: 0 5px;
              background-color: #a8a8e1;
              transform: translateY(-25px);
              transition: transform .2s ease-out var(--delay, 0s), opacity .3s ease-out var(--delay, 0s);
              opacity: 0;
            }

            li:hover {
              cursor: pointer;
            }
          }
        }
      }
    }
  }

  // element 组件样式
  .demo-tabs {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 30px;
    overflow: hidden;

    .el-tabs__header {
      width: var(--position_left_now);
      margin-bottom: 45px;
    }

    .el-tabs__item {
      font-size: 1.6rem;
      color: #717790;
    }

    .el-tabs__item:hover {
      color: #AAAEBC;
    }

    .is-active {
      color: #FFFFFF;
    }

    .el-tabs__active-bar {
      background-color: #47cf73;
    }

    .el-tabs__content {
      overflow: visible;
      color: #000000;
      font-size: 32px;
      font-weight: 600;
      // background-color: red;

      .el-tab-pane:nth-child(2n-1) {}

      .el-tab-pane:nth-child(2) {
        position: relative;
        width: var(--position_left_now);
        height: 740px;
      }

    }
  }
}

// 右点击事件动画
@keyframes name_after_right {
  0% {
    opacity: 0;
    left: var(--position_right_now);
  }

  50% {
    opacity: 0;
    left: var(--position_left_now);
  }

  100% {
    opacity: var(--opacity_not_now);
    left: var(--position_left_now);
  }
}

@keyframes name_before_right {

  0% {
    opacity: var(--opacity_not_now);
    left: var(--position_left_now);
  }

  50% {
    opacity: var(--opacity_now);
    left: 0px;
  }

  100% {
    opacity: var(--opacity_now);
    left: 0px;
  }
}

@keyframes name_now_right {

  0% {
    opacity: var(--opacity_now);
    left: 0px;
  }

  50% {
    opacity: var(--opacity_not_now);
    left: var(--position_right_now);
  }

  100% {
    opacity: var(--opacity_not_now);
    left: var(--position_right_now);
  }
}

// 左点击事件动画
@keyframes name_before_left {

  0% {
    opacity: 0;
    left: var(--position_left_now);
  }

  50% {
    opacity: 0;
    left: var(--position_right_now);
  }

  100% {
    opacity: var(--opacity_not_now);
    left: var(--position_right_now);
  }
}

@keyframes name_after_left {

  0% {
    opacity: var(--opacity_not_now);
    left: var(--position_right_now);
  }

  50% {
    opacity: var(--opacity_now);
    left: 0px;
  }

  100% {
    opacity: var(--opacity_now);
    left: 0px;
  }
}

@keyframes name_now_left {

  0% {
    opacity: var(--opacity_now);
    left: 0px;
  }

  50% {
    opacity: var(--opacity_not_now);
    left: var(--position_left_now);
  }

  100% {
    opacity: var(--opacity_not_now);
    left: var(--position_left_now);
  }
}
</style>