<template>
    <div id="hy-swiper">
      <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
        <slot></slot>
      </div>
      <slot name="indicator">
      </slot>
      <div class="indicator">
        <slot name="indicator" v-if="showIndicator && slideCount>1">
          <div v-for="(item, index) in slideCount" class="indi-item" :class="{active: index === currentIndex-1}" :key="index"></div>
        </slot>
      </div>
    </div>
</template>

<script>
	export default {
		name: "Swiper",
    props: {
      interval: {
		    type: Number,
        default: 3000
      },
      animDuration: {
		    type: Number,
        default: 300
      },
      moveRatio: {
        type: Number,
        default: 0.25
      },
      showIndicator: {
        type: Boolean,
        default: true
      }
    },
    data: function () {
		  return {
        slideCount: 0, // 元素个数
        totalWidth: 0, // swiper的宽度
        swiperStyle: {}, // swiper样式
        currentIndex: 1, // 当前的index
        scrolling: false, // 是否正在滚动
      }
    },
    mounted: function () {
      // 1.操作DOM, 在前后添加Slide
      setTimeout(() => {
        //调用handleDom方法，判断轮播图图片个数是否大于1，如果大于1，在前后个加入最后和第一张图片，重新计算轮播图的宽度和样式
        this.handleDom();

        // 2.开启定时器
        this.startTimer();
      }, 100)
    },
    methods: {
		  /**
       * 定时器操作
       */
      startTimer: function () {
		    this.playTimer = window.setInterval(() => {
		      this.currentIndex++;
		      this.scrollContent(-this.currentIndex * this.totalWidth);
        }, this.interval)
      },
      stopTimer: function () {
        window.clearInterval(this.playTimer);
      },

      /**
       * 滚动到正确的位置
       */
      scrollContent: function (currentPosition) {
        // 0.设置正在滚动
        this.scrolling = true;

        // 1.开始滚动动画
        this.swiperStyle.transition ='transform '+ this.animDuration + 'ms';
        this.setTransform(currentPosition);

        // 2.判断滚动到的位置
        this.checkPosition();

        // 4.滚动完成
        this.scrolling = false
      },

      /**
       * 校验正确的位置
       */
      checkPosition: function () {
        window.setTimeout(() => {
          // 1.校验正确的位置
          this.swiperStyle.transition = '0ms';
          //判断当前图片下标值是否大于或等于slideCount+1
          if (this.currentIndex >= this.slideCount + 1) {
            //当前下标值大于或等于slideCount+1，说明现在该显示第一张图片了
            this.currentIndex = 1;
            this.setTransform(-this.currentIndex * this.totalWidth);
          } else if (this.currentIndex <= 0) {
            //当先下标值小于等于0了，说明此时该显示最后一张图片了
            this.currentIndex = this.slideCount;
            this.setTransform(-this.currentIndex * this.totalWidth);
          }

          // 2.结束移动后的回调
          this.$emit('transitionEnd', this.currentIndex-1);
        }, this.animDuration)
      },

      /**
       * 设置滚动的位置
       */
      setTransform: function (position) {
        this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;
        this.swiperStyle['-webkit-transform'] = `translate3d(${position}px), 0, 0`;
        this.swiperStyle['-ms-transform'] = `translate3d(${position}px), 0, 0`;
      },

      /**
       * 操作DOM, 在DOM前后添加Slide
       */
		  handleDom: function () {
        // 1.获取要操作的元素
        let swiperEl = document.querySelector('.swiper');
        let slidesEls = swiperEl.getElementsByClassName('slide');

        // 2.保存个数
        this.slideCount = slidesEls.length;

        // 3.如果大于1个, 那么在前后分别添加一个slide
        if (this.slideCount > 1) {
          //将slidesEl的第一个节点克隆到cloneFirst中
          let cloneFirst = slidesEls[0].cloneNode(true);
          //将slidesEl的最后一个节点克隆到cloneLast中
          let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true);
          //将cloneLast插入到slidesEl的第一个节点位置
          swiperEl.insertBefore(cloneLast, slidesEls[0]);
          //将cloneFirst插入到slidesEls的最后一个节点位置
          swiperEl.appendChild(cloneFirst);
          //重新计算slidesEl的宽度，offsetWidth返回swiperEl的宽度
          this.totalWidth = swiperEl.offsetWidth;
          //style：设置或返回元素swiperEl的style属性
          this.swiperStyle = swiperEl.style;
          //上边所使用的属性都是HTML DOM Element对象
        }

        // 4.让swiper元素, 显示第一个(目前是显示前面添加的最后一个元素)
        this.setTransform(-this.totalWidth);
      },

      /**
       * 拖动事件的处理
       */
      touchStart: function (e) {
        // 1.如果正在滚动, 不可以拖动
        if (this.scrolling) return;
        //
        // 2.停止定时器
        this.stopTimer();

        // 3.保存开始滚动的位置
        //未开始滚动前，保存初始的触点坐标
        this.startX = e.touches[0].pageX;
      },

      touchMove: function (e) {
        // 1.计算出用户拖动的距离
        //touches是event的一个属性，意思是触摸屏幕的触点，取第一个触点，查看他移动结束时的pageX
        this.currentX = e.touches[0].pageX;
        //用移动接触时的触点坐标减去开始时的触点坐标就是手指移动的距离
        this.distance = this.currentX - this.startX;
        //手指未移动前图片的位置
        let currentPosition = -this.currentIndex * this.totalWidth;
        //未移动前的位置加上手指移动了距离
        let moveDistance = this.distance + currentPosition;

        // 2.设置当前的位置
        this.setTransform(moveDistance);
      },

      touchEnd: function (e) {
        // 1.获取移动的距离的绝对值
        let currentMove = Math.abs(this.distance);

        // 2.判断最终的距离
        //如果移动距离为0说明未移动，什么也不用做
        if (this.distance === 0) {
          return
        //  如果移动位置大于0说明触点向右移动了，并且移动距离绝对值大于整张图片的25%，那么向前移动
        } else if (this.distance > 0 && currentMove > this.totalWidth * this.moveRatio) { // 右边移动超过0.5
          //当前图片下标值减1
          this.currentIndex--
        //  如果移动位置小于0，说明触点向左移动了，并且移动距离的绝对值大于整张图片的25%，那么向后移动
        } else if (this.distance < 0 && currentMove > this.totalWidth * this.moveRatio) { // 向左移动超过0.5
          //当前图片下标值加1
          this.currentIndex++
        }

        // 3.移动到正确的位置
        this.scrollContent(-this.currentIndex * this.totalWidth);

        // 4.移动完成后重新开启定时器
        this.startTimer();
      },

      /**
       * 控制上一个, 下一个
       */
      previous: function () {
        this.changeItem(-1);
      },

      next: function () {
        this.changeItem(1);
      },

      changeItem: function (num) {
        // 1.移除定时器
        this.stopTimer();

        // 2.修改index和位置
        this.currentIndex += num;
        this.scrollContent(-this.currentIndex * this.totalWidth);

        // 3.添加定时器
        this.startTimer();
      }
    }
	}
</script>

<style scoped>
  #hy-swiper {
    overflow: hidden;
    position: relative;
  }

  .swiper {
    display: flex;
  }

  .indicator {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 8px;
  }

  .indi-item {
    box-sizing: border-box;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #fff;
    line-height: 8px;
    text-align: center;
    font-size: 12px;
    margin: 0 5px;
  }

  .indi-item.active {
    background-color: rgba(212,62,46,1.0);
  }
</style>
