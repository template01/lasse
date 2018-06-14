<template>
  <div>
    <sitecontent  :loading="false"></sitecontent>
    <sitecontent v-if="loading" :loading="true"></sitecontent>
  </div>
</template>

<script>
import sitecontent from '~/components/siteContent.vue'
import lasseText from '../assets/lasse.md'
import mediaData from '../assets/media.json'


export default {
  components: {
    sitecontent
  },
  data: function() {
    return {
      loading: true
    }
  },
  mounted(){
    var vm = this
    setTimeout(function(){
      vm.loading = false
      // alert(vm.loading)
    },2000)
  }
}
</script>

<style>
</style>
