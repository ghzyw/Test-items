<template>
  <div class="sc0">
    <div class="sc1">test</div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import instance from '@/api/instance.js'

onMounted(() => {
  // login({name:'name'}).then(res=>{
  //   console.log(res)
  // }).catch(err=>{
  //   console.log(err)
  // })
  instance.login({
    firstName: 'Fred',
    lastName: 'Flintstone'
  })

})

</script>

<style>
.sc0 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: black;
}
.sc1{
  width: 200px;
  height: 200px;
  background-color: red;
}
.sc1::after {
  content: '123';
  display: inline-block;
  width: 200px;
  height: 200px;
  background-color: blue;
  position: relative;
  top: 30px;
}
</style>