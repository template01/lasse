<template>
<section :class="loading?'loading':''" class="siteContent container">
  <div class="mainContent">
    <header v-if="mobile" class="">
      <div v-if="loading" class="loadlogo" style=""></div>

      <img v-else style="margin:0 auto; display:block; max-width:300px" width="80%" :src="'/sun.svg'" />
      <p style="text-align: ;margin-top:40px">
        <span>Hello Sunshine,</span>
      </p>
    </header>
    <div class="mainContentInner" v-html="mainContent">
    </div>
  </div>
  <div v-if="!mobile" class="desktopSide">
    <div class="sideContentShadow">
      <img @click="setContact" :style="!contactDisplayed ?{ 'transform': 'translateX(-160px)'} :{}" width="60px" :src="'mailblack2.svg'" />
    </div>
    <div class="sideContentOuter">
      <div class="sideContent" :style="!contactDisplayed ? { 'justify-content': 'center'} :{}">
        <div v-if="loading">
          <div>

            <div class="contact">
              <div class="loadlogo" style=""></div>

              <p style="margin-top:40px">
                <span>Say Hi back?</span>
              </p>
              <div style="margin-top:40px">
                <p v-show="media.contact[0].details.phone" v-html="'<span>'+media.contact[0].details.phone+'</span>'"></p>
                <p v-show="media.contact[0].details.mail" v-html="'<span>'+media.contact[0].details.mail+'</span>'"></p>
              </div>
            </div>
          </div>
        </div>

        <transition name="fade">
          <div v-if="slideInSidebar">
            <div v-for="(item,index) in sideContent.content" :key="String(item.id)+index">
              <div v-if="item.image">
                <img :src="item.image.src" />
                <p class="desc" v-show="item.image.desc" v-html="item.image.desc"></p>
              </div>
              <div class="contact" v-if="item.details">
                <img style="margin:0 auto; display:block; max-width:300px" width="80%" :src="'/sun.svg'" />
                <p style="margin-top:40px">
                  <span>Say Hi back?</span>
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
  </div>
  <transition name="fade">
    <div v-if="mobile && mobileSideOpen" class="mobileSide">
      <div class="mobileSideContentOuter">
        <div class="mobileSideContentOuterClose noselect">
          <div @click="mobileSideOpen = false">✗</div>
        </div>
        <div class="sideContentMobile">
          <div v-if="slideInSidebar">
            <div v-for="(item,index) in sideContent.content" :key="String(item.id)+index">
              <div v-if="item.image">
                <img :src="item.image.src" />
                <p class="desc" v-show="item.image.desc" v-html="item.image.desc"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>

</section>
</template>

<script>
import lasseText from '../assets/lasse.md'
import mediaData from '../assets/media.json'


export default {
  components: {},
  props: ['loading'],
  // computed: {
  //   postContent() {
  //      // return require(`../../content/posts/${post.id}.md`)
  //     return require('../assets/README.md')
  //   },
  // },
  methods: {

    debounceResize: function() {
      function debounce(func, wait = 100) {
        let timeout;
        return function(...args) {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            func.apply(this, args);
          }, wait);
        };
      }

      // Start
      var vm = this
      const debounced = debounce(vm.checkFormat, 500);
      window.addEventListener('resize', debounced);
    },
    addThumbnails: function() {
      var vm = this
      var targerSpans = vm.$el.querySelectorAll('span[data-target]')
      for (var i = 0, len = targerSpans.length; i < len; i++) {
        var value = targerSpans[i].getAttribute("data-target");
        if (vm.media[value]) {
          var imgSrc = vm.media[value][0].image.src
          var circle = vm.media[value][0].image.circle
          if (imgSrc) {
            var DOM_img = document.createElement("img");
            if (circle) {
              DOM_img.className = "circle"
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
    detectClick: function() {
      var vm = this

      document.addEventListener("click", function(event) {
        var target = event.target.closest('span[data-target]')
        if (target) {
          vm.mobileSideOpen = true
          var value = target.getAttribute("data-target");
          vm.sideContent = {
            "id": value,
            "content": vm.media[value]
          }
        }

      });
    },
    checkFormat: function(){

      if (window.innerWidth > 1024) {
        this.mobile = false
      } else {
        this.mobile = true
      }
      if (!this.mobile) {
        this.detectHover()
        this.sideContent = {
          "id": "contact",
          "content": this.media.contact
        }
      } else {
        this.detectClick()
      }
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

    //determain mobile

    if (!this.loading) {
      this.checkFormat()

      this.debounceResize()
      this.addThumbnails()
    }
  },
  data: function() {
    return {
      mobile: true,
      mobileSideOpen: false,
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
.siteContent {
  position: absolute;
  width: 100%;
  top: 0;
}

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
}

@media screen and (max-width: 1024px) {
  .mainContent {
    width: 100%;
    padding: 30px;
    padding-left: 30px;
    padding-right: 30px;
  }
}

.mainContentInner {
  max-width: 900px;
  margin: 0 auto;

  /* padding-top: 50px; */
}

.mainContentInner p {
  margin-bottom: 80px;
}

@media screen and (max-width: 1024px) {
  .mainContentInner p {
    margin-bottom: 40px;
  }
}



.mainContentInner .smalltext {
  margin-bottom: 80px;
  font-size: 20px;
  column-count: 2;
  column-gap: 40px;
}

@media screen and (max-width: 1024px) {
  .mainContentInner .smalltext {
    column-count: 1;
    font-size: 15px;

  }
}

.smalltext p {
  margin-bottom: 20px;
  margin-top: 20px;

}


.mainContentInner a {
  color: inherit;
  text-decoration: none;
}


.mainContentInner .smalltext span[data-target] {
  font-weight: 600
}

.mainContentInner .smalltext span[data-target] img {
  height: 40px;
  margin-left: 6px;
  margin-bottom: -15px;
}




.mainContentInner span[data-target] {
  color: black;
  font-weight: 800;
  cursor: pointer;
}

.mainContentInner span[data-target] img {
  height: 80px;
  margin-left: 6px;
  margin-bottom: -25px;
}

@media screen and (max-width: 1024px) {

  .mainContentInner span[data-target] img {
    height: 45px;
    margin-left: 4px;
    margin-bottom: -15px;
  }

}


.mainContentInner span[data-target] img.circle {
  border-radius: 100%;
}

.mobileSide {

  overflow: hidden;
  background: black;
  position: fixed;
  width: 100%;
  height: 100%;
  right: 0;
  top: 0;
  color: white;
  padding: 10px;
}

.mobileSideContentOuter {
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  right: 0;
  top: 0;
}

.mobileSideContentOuterClose {
  z-index: 1;
  position: absolute;
  margin: 10px;
  transform: scaleX(1.2);
  line-height: 1;
  font-size: 25px;
  font-weight: 800;
}

.noselect {
  -webkit-touch-callout: none;
  /* iOS Safari */
  -webkit-user-select: none;
  /* Safari */
  -khtml-user-select: none;
  /* Konqueror HTML */
  -moz-user-select: none;
  /* Firefox */
  -ms-user-select: none;
  /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}



.mobileSide .desc {
  position: absolute;
  margin-bottom: 10px;
  bottom: 0;
  line-height: 1;
  font-size: 15px;
}

.sideContentMobile {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 10px;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.sideContentMobile img {
  max-height: 90vh;
  max-width: 100%;
}

.sideContentMobile a {
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid white;
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
  /* justify-content: center; */
  flex-direction: column;
  justify-content: end;
}

.sideContent .contact a {
  text-decoration: none;
  border: 0 !important;
}

.sideContent .desc {
  color: inherit;
  font-size: 20px;
}


.sideContent a {
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid white;
}

.sideContent img {
  width: 100%;
  max-width: 900px;
}

@media screen and (max-width: 1024px) {

  footer,
  header {
    background: black;
    color: white;
    line-height: 1.1;
    padding: 30px;
    margin-top: -30px;
    margin-left: -30px;
    margin-right: -30px;
    margin-bottom: -30px;

  }
  .hideMobile {
    display: none;
  }
}


@media screen and (min-width: 1024px) {
  footer,
  header {
    display: none;
  }
}
</style>
