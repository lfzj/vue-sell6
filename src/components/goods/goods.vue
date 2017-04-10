<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item" :class="{'current':currentIndex === index}" @click="slelectMenu(index,$event)">
          <!-- :class="{'curren':currentIndex===index}"-->
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li class="foods-list food-list-hook" v-for="item in goods">
          <h2 class="title">{{item.name}}</h2>
          <ul>
            <li class="foods-item" v-for="food in item.foods">
              <div class="icon">
                <img :src="food.icon" alt="" width="57" height="57">
              </div>
              <div class="content">
                <h3 class="name">{{food.name}}</h3>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :select-foods="selectFoods"></shopcart>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart';
  import cartcontrol from '../cartcontrol/cartcontrol';
  const ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
      };
    },
    //    computed 要计算的函数在这里
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
//    方法
    created() {
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      });
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },

    methods: {
      slelectMenu(index, event) {
        if (!event._constructed) {
          return;
        };
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      _initScroll() {
        this.meunScroll = new BScroll(this.$refs.menuWrapper, {
//         click: true 在移动端的点击
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        });
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }
    },
//
    components: {
      shopcart,
      cartcontrol
    }
  };
</script>
<style>
  .goods{
    width: 100%;
    display:flex;
    position: absolute;
    overflow: hidden;
    top: 174px;
    bottom: 46px;
  }
  .goods .menu-wrapper{
    flex:0 0 80px;
    width: 80px;
    background: #f3f5f7;
  }
  .goods .menu-item{
    display: table;
    height:54px;
    width: 56px;
    padding: 0 12px;
    line-height: 14px;
    font-size: 0;
  }
  .goods .menu-wrapper .current{
    position: relative;
    z-index: 10;
    margin-top: -1px;
    background: #fff;
    font-weight: 700;
  }
  .goods .menu-wrapper .current .text{
    border-bottom:none;
  }
  .goods .menu-item .text{
    display: table-cell;
    width: 56px;
    vertical-align: middle;
    border-bottom: 1px solid rgba(7,17,27,.1);
    font-size: 12px;
  }
  .goods .menu-wrapper .menu-item .text .icon{
    display: inline-block;
    vertical-align: top;
    width: 12px;
    height:12px;
    margin-right: 3px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
  }
  .goods .menu-wrapper .text .decrease{
    background-image: url(decrease_1@2x.png);
  }
  .goods .menu-wrapper .text .discount{
    background-image: url(discount_1@2x.png);
  }
  .goods .menu-wrapper .text .guarantee{
    background-image: url(guarantee_1@2x.png);
  }
  .goods .menu-wrapper .text .invoice{
    background-image: url(invoice_1@2x.png);
  }
  .goods .menu-wrapper .text .special{
    background-image: url(special_1@2x.png);
  }
  .goods .foods-wrapper{
    flex: 1;
  }
  .goods .foods-wrapper .foods-list>h2{
    padding-left: 14px;
    height: 26px;
    line-height: 26px;
    border-left: 2px solid #d9dde1;
    font-size: 12px;
    color: rgb(147,153,159);
    background: #f3f5f7;
  }
  .goods .foods-wrapper .foods-list .foods-item{
    display: flex;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    margin: 18px;
    padding-bottom:18px;
  }
  .goods .foods-wrapper .foods-list ul li:last-child{
    border-bottom: none;
    margin-bottom: 0;
  }
  .goods .foods-wrapper .foods-list .foods-item .icon{
    flex: 0 0 57px;
    margin-right: 10px;
  }
  .goods .foods-wrapper .foods-list .foods-item .content{
    flex: 1;
    position: relative;
  }
  .goods .foods-wrapper .foods-list .foods-item .content .name{
    margin: 2px 0 8px 0;
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    color: rgb(7,17,27);
  }
  .goods .foods-wrapper .foods-list .foods-item .content .desc,.foods-item .content .extra{
    line-height: 10px;
    font-size: 10px;
    color: rgb(147,153,159);
  }
  .goods .foods-wrapper .foods-list .foods-item .content .desc{
    line-height: 12px;
    margin-bottom: 8px;
  }
  .goods .foods-wrapper .foods-list .foods-item .content .extra .count{
    margin-right: 12px;
  }
  .goods .foods-wrapper .foods-list .foods-item .content .price{
    font-weight: 700;
    line-height: 24px;
  }
  .goods .foods-wrapper .foods-list .foods-item .content .price .now{
    margin-right: 8px;
    font-size: 14px;
    color: rgb(240,20,20);
  }
  .goods .foods-wrapper .foods-list .foods-item .content .price .old{
    font-size: 10px;
    color: rgb(147,153,159);
    text-decoration: line-through;
  }
  .goods .foods-wrapper .foods-list .foods-item .content .cartcontrol-wrapper{
    position: absolute;
    right: 0;
    bottom: -8px;
  }
</style>
