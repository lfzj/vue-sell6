<template>
  <div class="cartcontrol">
    <!--动画-->
    <transition name="fade1">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>

    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return;
        };
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>
<style>
  .cartcontrol{
    font-size: 0;
  }
  /*vue transition的动画--开头--*/
  .cart-decrease{
    display: inline-block;
    padding: 6px;
    transition: all 0.3s linear;
  }
  .cart-decrease .inner{
    line-height:24px;
    font-size :24px;
    color:rgb(0,160,220);
    transition:all 0.4s linear;
  }
  .fade1-enter-active,.fade1-leave-active{
    transform :translate3d(0,0,0);
  }
  .fade1-enter-active .inner,.fade1-leave-active .inner{
    display:inline-block;
    transform:rotate(0);
  }
  .fade1-enter,.fade1-leave-active{
    opacity: 0;
    transform :translate3d(24px,0,0);
  }
  .fade1-enter .inner,.fade1-leave-active .inner{
    transform:rotate(180deg);
  }
  /*vue transition的动画--结尾--*/
  .cart-count{
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147,153,159);
  }
  .cart-add{
    display: inline-block;
    padding: 6px;
    font-size: 24px;
    line-height: 24px;
    color: rgb(0,160,220);
  }

</style>
