<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryPrice}}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"> </i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>
    <transition
      name="fade"
      enter-class="fade-in-enter"
      enter-active-class="fade-in-active"
      leave-class="fade-out-enter"
      leave-active-class="fade-out-active"
    >
      <div class="detail" v-show="detailSlow" >
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠消息</div>
              <div class="line"></div>
            </div>
            <ul class="supports" v-if="seller.supports">
              <li class="support-item" v-for="(item, index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>

  </div>
</template>
<script type="text/ecmascript-6">
  import star from '../star/star';
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailSlow: false
      };
    },
    methods: {
      showDetail() {
        this.detailSlow = true;
      },
      hideDetail() {
        this.detailSlow = false;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
      star
    }
  };
</script>
<style>
  /*@import "../../common/stylus/jj.styl";*/
 body,html{
   line-height:1;
   font-weight: 200;
   font-family: 'PingFang SC','STHeitiSC-Light','Helvetica-Light',Arial,sans-serif;
 }
  .header{
    position: relative;
    font-size: 0;
    color: #ffffff;
    background:rgba(7,17,27,.5);
    overflow: hidden;
  }
  .header .content-wrapper{
    padding: 24px 12px 18px 24px;
    position: relative;
  }
  .header .content-wrapper .avatar{
    vertical-align: top;
    display: inline-block;
  }
  .header .content-wrapper .avatar img{
    border-radius:2px;
  }
  .header .content-wrapper .content{
    display: inline-block;
    margin-left: 16px;
    font-size: 14px;
  }
  .header .content-wrapper .content .title{
    margin: 2px 0 8px 0;
  }
  .header .content-wrapper .content .title .brand{
    display: inline-block;
    vertical-align: top;
    width: 30px;
    height:18px;
    background-image: url(brand@2x.png);
    background-repeat: no-repeat;
    background-size: 30px 18px;
  }
  .header .content-wrapper .content .title .name{
    margin-left:6px ;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
  }
  .header .content-wrapper .content .description{
     margin-bottom: 10px;
    line-height: 12px;
    font-size: 12px;
  }
  .header .content-wrapper .content .support{
    font-size: 0;
  }
  .header .content-wrapper .content .support .icon{
    display: inline-block;
    vertical-align: top;
    width: 12px;
    height:12px;
    margin-right: 4px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
  }
  .header .content-wrapper .content .support .text{
    line-height: 12px;
    font-size: 12px;
  }
  .header .content-wrapper .content .support .decrease{
      background-image: url(decrease_1@2x.png);
  }
  .header .content-wrapper .content .support .discount{
    background-image: url(discount_1@2x.png);
  }
  .header .content-wrapper .content .support .guarantee{
    background-image: url(guarantee_1@2x.png);
  }
  .header .content-wrapper .content .support .invoice{
    background-image: url(invoice_1@2x.png);
  }
  .header .content-wrapper .content .support .special{
    background-image: url(special_1@2x.png);
  }
  .header .content-wrapper .support-count{
    position: absolute;
    right: 12px;
    bottom: 18px;
    padding: 2px 8px 0 8px;
    height: 24px;
    line-height: 24px;
    border-radius: 16px;
    background: rgba(0, 0, 0, 0.2);
    text-align: center;
    cursor: pointer;
  }
  .header .content-wrapper .support-count .count{
      font-size: 10px;
      line-height:24px;
       vertical-align: top;
  }
  .header .content-wrapper .support-count .icon-keyboard_arrow_right{
    font-style:normal;
    font-size: 10px;
    line-height:24px;
    margin-left: 2px;
  }
  .header .bulletin-wrapper{
    position: relative;
    font-size: 12px;
    height:28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: rgba(7,17,27,0.2);
    cursor: pointer;
  }
  .header .bulletin-wrapper .bulletin-title{
    display: inline-block;
    vertical-align: top;
    margin-top:7px;
    width: 22px;
    height:12px;
    background-image: url(brand@2x.png);
    background-repeat: no-repeat;
    background-size: 22px 12px;
  }
  .header .bulletin-wrapper .bulletin-text{
    vertical-align: top;
    font-size: 10px;
    margin: 0 4px;
  }
  .header .bulletin-wrapper .icon-keyboard_arrow_right{
    position: absolute;
    font-style:normal;
    font-size: 10px;
    right: 12px;
    top: 8px;
  }
  .header  .background{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);    /*背景图芜湖*/
  }
  .header .detail{
    position: fixed;
    z-index: 100;
    top:0;
    left: 0;
    width:100%;
    height:100%;
    overflow: auto;
    background: rgba(7,17,27,.9);
    backdrop-filter:blur(10px);/*背景芜湖在ios下有效*/
  }
  .fade-in-active, .fade-out-active{
    transition: all 0.5s;
  }
 .fade-in-enter, .fade-out-active{
    opacity: 0;
 }
  .header .detail .detail-wrapper{
    width: 100%;
    min-height: 100%;
  }
  .header .detail .detail-wrapper .detail-main{
    margin-top: 64px;
    padding-bottom: 64px;
  }
  .header .detail .detail-wrapper .detail-main .name{
    line-height: 16px;
    text-align: center;
    font-size: 16px;
    color: rgb(255,255,255);
    font-weight: 700;
  }
  .header .detail .detail-close{
    position: relative;
    width: 32px;
    height: 32px;
    margin: -64px auto 0 auto;
    clear: both;
    font-size: 32px;
  }
  .header .detail .detail-close .icon-close{
    font-style:normal;
  }
  .header .detail .clearfix{
    display: inline-block;
  }
  .header .detail .clearfix:after{
    display: block;
    content:".";
    height:0;
    line-height: 0;
    clear: both;
    visibility: hidden;
  }
  .header .detail .detail-wrapper .detail-main .star-wrapper{
    margin-top: 18px;
    padding: 2px 0;
    text-align: center;
  }
  .header .detail .detail-wrapper .detail-main .title{
    display: flex;
    width: 88%;
    margin: 28px auto 24px auto;
  }
  .header .detail .detail-wrapper .detail-main .title .line{
    flex: 1;
    position: relative;
    top: -6px;
    border-bottom: 1px solid rgba(255,255,255,.2);
  }
  .header .detail .detail-wrapper .detail-main .title .text{
    padding: 0 12px;
    line-height: 14px;
    font-weight: 700;
    font-size: 14px;
    color:rgb(255,255,255);
  }
  .header .detail .detail-wrapper .detail-main .supports{
    width: 80%;
    margin: 0 auto;
  }
  .header .detail .detail-wrapper .detail-main .supports .support-item{
    padding: 0 12px;
    margin-bottom: 12px;
    font-size: 0;
  }
  .header .detail .detail-wrapper .detail-main .supports .support-item:last-child{
    margin-bottom: 0;
  }
  .header .detail .detail-wrapper .detail-main .supports .support-item .icon{
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: top;
    margin-right: 6px;
    background-size: 16px 16px;
    background-repeat: no-repeat;
  }
  .header .detail .detail-wrapper .detail-main .supports .support-item .decrease{
    background-image: url(decrease_2@2x.png);
  }
  .header .detail .detail-wrapper .detail-main .supports .support-item .discount{
    background-image: url(discount_2@2x.png);
  }
  .header .detail .detail-wrapper .detail-main .supports .support-item .guarantee{
    background-image: url(guarantee_2@2x.png);
  }
  .header .detail .detail-wrapper .detail-main .supports .support-item .invoice{
    background-image: url(invoice_2@2x.png);
  }
  .header .detail .detail-wrapper .detail-main .supports .support-item .special{
    background-image: url(special_2@2x.png);
  }
  .header .detail .detail-wrapper .detail-main .supports .support-item .text{
    line-height: 16px;
    font-size: 12px;
    color: rgb(255,255,255);
    font-weight:200;
  }
  .bulletin{
    width: 80%;
    margin: 0 auto 0 auto;
  }
  .bulletin .content{
    padding: 0 12px;
    line-height:24px;                                                 ;
    font-size: 12px;
    font-weight: 200;
    color: rgb(255,255,255);

  }
</style>
