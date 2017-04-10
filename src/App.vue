<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header';
const ERR_OK = 0;
export default {
  data() {
    return {
      seller: {}
    };
  },
  created() {
     this.$http.get('/api/seller').then((response) => {
        response = response.body;
      if (response.errno === ERR_OK) {
        this.seller = response.data;
      }
    });
  },
  components: {
    'v-header': header
  }
};
</script>
<style>
  .tab{
    position: relative;
    display: flex;
    width: 100%;
    height: 40px;
    line-height:40px;
    background: #fff;
    border-bottom: 1px solid rgba(7,17,27,.1);
    z-index: 10;
  }
  .tab .tab-item{
    flex: 1;
    text-align: center;
  }
  .tab .tab-item a{
    text-decoration:none;
    display: block;
    color:rgb(77,85,93);
    font-size: 14px;
  }
  .tab .tab-item .active{
    color:rgb(240,20,20);
  }
</style>
