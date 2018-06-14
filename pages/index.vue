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
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s, transform .5s;
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active below version 2.1.8 */

  {
  opacity: 0;
  transform: translateY(-50px);
}

.mainContent {
  width: 60%;
  background: white;
  color: black;
  padding: 80px;
  padding-left: 100px;
  padding-right: 100px;

  /* background: -moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,255,255,1) 100%);
background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%,rgba(0,255,255,1) 100%);
background: linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(0,255,255,1) 100%);
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=0 ); */
}

.mainContentInner {
  max-width: 900px;
  margin: 0 auto;

  /* padding-top: 50px; */
}

.mainContentInner p {
  margin-bottom: 80px;
}
.mainContentInner .smalltext {
  margin-bottom: 80px;
  font-size: 20px;
  column-count: 2;
  column-gap: 40px;
}

.smalltext p{
  margin-bottom: 20px;
  margin-top: 20px;

}

.mainContentInner .smalltext span[data-target]{
  font-weight: 600
}

.mainContentInner .smalltext span[data-target] img{
  height: 40px;
  margin-left: 6px;
  margin-bottom: -15px;
}

.mainContentInner span[data-target] {
  color: black;
  font-weight: 800;
  cursor: pointer;
}

.mainContentInner span[data-target] img{
  height: 80px;
  margin-left: 6px;
  margin-bottom: -25px;
}
.mainContentInner span[data-target] img.circle{
    border-radius: 100%;
}


.sideContentShadow {
  background: red;
  position: fixed;
  width: 40%;
  height: 100%;
  right: 0;
  top: 0;
  padding: 80px;
  padding-top: 20px;
  height: 100%;
}

.sideContentShadow img {
  transition: transform 0.5s;
  position: absolute;
  top: 20px;
  cursor: pointer;
}

.sideContentOuter {
  overflow: hidden;
  background: black;
  position: fixed;
  width: 40%;
  height: 100%;
  right: 0;
  top: 0;
  color: white;
  padding: 80px;
  height: 100%;
}

.sideContent {

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  padding: 40px;
  padding-top: 80px;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.sideContent .desc{
  color: inherit;
  font-size: 20px;
}


.sideContent a{
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid white;
}
.sideContent img{
  width: 100%;
  max-width: 900px;
}
</style>
