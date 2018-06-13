<template>
<section class="container">
  <div class="mainContent">
    <div class="mainContentInner" v-html="mainContent">
    </div>
  </div>
  <div class="sideContentShadow">
    <img @click="setContact" :style="!contactDisplayed ?{ 'transform': 'translateX(-160px)'} :{}" width="60px" :src="'mailblack2.svg'" />
  </div>
  <div class="sideContentOuter" :style="contactDisplayed ?{ 'justify-content': 'end'} :{}">
    <div class="sideContent" :style="contactDisplayed ?{ 'justify-content': 'end'} :{}">

      <transition name="fade">
        <div v-if="slideInSidebar">
          <div v-for="(item,index) in sideContent.content" :key="String(item.id)+index">
            <div v-if="item.image">
              <img :src="item.image.src" />
              <p class="desc" v-show="item.image.desc" v-html="item.image.desc"></p>
            </div>
            <div v-if="item.details">
              <img style="margin:0 auto; display:block; max-width:300px" width="80%" :src="'/sun.svg'" />
              <p style="margin-top:40px">
                Say Hi back?
              </p>
              <div style="margin-top:40px">

                <p v-show="item.details.phone" v-html="item.details.phone"></p>
                <p v-show="item.details.mail" v-html="item.details.mail"></p>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import lasseText from '../assets/lasse.md'
import mediaData from '../assets/media.json'


export default {
  components: {
    AppLogo
  },
  // computed: {
  //   postContent() {
  //      // return require(`../../content/posts/${post.id}.md`)
  //     return require('../assets/README.md')
  //   },
  // },
  methods: {
    addThumbnails: function() {
      var vm = this
      var targerSpans = vm.$el.querySelectorAll('span[data-target]')
      for (var i = 0, len = targerSpans.length; i < len; i++) {
        var value = targerSpans[i].getAttribute("data-target");
        if(vm.media[value]){
          var imgSrc = vm.media[value][0].image.src
          var circle = vm.media[value][0].image.circle
          if(imgSrc){
            var DOM_img =  document.createElement("img");
            if(circle){
              DOM_img.className="circle"
            }
            DOM_img.src = imgSrc;
            targerSpans[i].appendChild(DOM_img);
          }
        }

      }
    },
    setContact: function() {
      var vm = this
      vm.slideInSidebar = false
      setTimeout(function() {
        vm.sideContent = {
          "id": "contact",
          "content": vm.media.contact
        }
        vm.contactDisplayed = true
        vm.slideInSidebar = true
      }, 300)


    },
    detectHover: function() {
      var vm = this
      document.addEventListener('mouseover', function(event) {
        var checkEvent = event.target.closest('span[data-target]')
        if (!checkEvent) {
          vm.isHovered = false
        } else {
          vm.isHovered = true
        }
      })
      document.addEventListener('mouseover', function(event) {
        var hoverLink = event.target.closest('span[data-target]');
        if (!hoverLink) return;
        setTimeout(function() {
          if (!vm.isHovered) return;
          var value = hoverLink.getAttribute("data-target");
          vm.sideContent = {
            "id": value,
            "content": vm.media[value]
          }
          vm.slideInSidebar = false
          setTimeout(function() {
            vm.slideInSidebar = true
            if (vm.sideContent != 'contact') {
              vm.contactDisplayed = false
            } else {
              vm.contactDisplayed = true
            }
          }, 300)
        }, 500)

      }, false);
    }
  },
  mounted() {

  // this.$nextTick(() => {
  //   this.$nuxt.$loading.start()
  //
  //   setTimeout(() => this.$nuxt.$loading.finish(), 20000)
  // })
    this.detectHover()
    this.sideContent = {
      "id": "contact",
      "content": this.media.contact
    }
    this.addThumbnails()
  },
  data: function() {
    return {
      isHovered: false,
      contactDisplayed: true,
      slideInSidebar: true,
      media: mediaData,
      sideContent: '',
      mainContent: lasseText
    }
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
