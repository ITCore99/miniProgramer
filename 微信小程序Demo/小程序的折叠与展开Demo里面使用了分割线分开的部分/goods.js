var app = getApp();
var WxParse = require('../../lib/wxParse/wxParse.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var consts = require('../../config/commonConsts.js');
Page({
  data: {
    winHeight: "",
    id: 0,
    goods: {}, /***获取商品的详情 */
    gallery: [],
    attribute: [],
    issueList: [],
    comment: [],
    brand: {},
    specificationList: [],/***规格列表 */
    productList: [],/***产品列表 里面是不同规格的产品 */
    relatedGoods: [],
    cartGoodsCount: 0,/***购物车的数量 */
    userHasCollect: 0,
    number: 1,
    checkedSpecText: '请选择规格数量',
    openAttr: false, /***判断左侧第一个是收藏还是返回按钮 规格切换*/
    noCollectImage: "/static/images/icon_collect.png",   /***收藏按钮的图**/
    hasCollectImage: "/static/images/icon_collect_checked.png",/***收藏按钮被选中图 */
    collectBackImage: "/static/images/icon_collect.png",
    displayPrice:"", /**选择规格时的零售价 用于根据规格动态的显示价格 */
    displayPriceMarket:"",/**市场价展示 */
    vipFlage:false,/**卡会员标识符 */
    temporaryVipFlag:false,/***临时会员标识符*/
    shareId:"",
    inventory:1,//更具价格更新库存
    //handlerCabin:{},/**仓房处理*/
    // renderFlage:true
    // goHomeFlage:false /**home图标显示控制 */
    priceDiffere:0, //优惠差价
    cabinCategoryData: [
      { title: "内舱房", url:"http://hldfiles.oss-cn-qingdao.aliyuncs.com/selectholiday/upload/20190125/1026351120a1d2.png"},
      { title: "阳台房", url:"http://hldfiles.oss-cn-qingdao.aliyuncs.com/selectholiday/upload/20190125/102221187b8664.png" },
      { title: "海景房", url:"http://hldfiles.oss-cn-qingdao.aliyuncs.com/selectholiday/upload/20190125/102350886f1b57.png" },
      { title: "套房", url:"http://hldfiles.oss-cn-qingdao.aliyuncs.com/selectholiday/upload/20190125/102421756b6f1e.png" },],
    journeyData:[
      {
        dayName: "D2", desc: "海上巡游", url:"http://hldfiles.oss-cn-qingdao.aliyuncs.com/selectholiday/upload/20190125/115744221e2594.png"},
      {
        dayName: "D3", desc: "福冈 （日本） 抵港时间15:00 离港时间23:00", url:"http://hldfiles.oss-cn-qingdao.aliyuncs.com/selectholiday/upload/20190125/1159204835f1ad.png"
      },
      {
        dayName: "D4", desc: "佐世保（日本） 抵港时间08:00 离港时间16:00", url:"http://hldfiles.oss-cn-qingdao.aliyuncs.com/selectholiday/upload/20190125/1159204835f1ad.png"
      },
      {
        dayName: "D5", desc: "海上巡游", url: "http://hldfiles.oss-cn-qingdao.aliyuncs.com/selectholiday/upload/20190125/115744221e2594.png"
      },
      {
        dayName: "D6", desc: "天津靠港时间", url: "http://hldfiles.oss-cn-qingdao.aliyuncs.com/selectholiday/upload/20190125/11561385842a90.png"
      },],
    reserveData:[
      { content:"邮轮舱位有限，请提早报名。"},
      { content: "报价均以两人一间为准，若出现单人情况，请另付单房差（船票的200%）。" },
      { content: "船票, 一旦付款确认, 则不能改期、退票、改签。" },
      { content: "景点内之考古学遗迹如果需要使用摄像机或照相机, 可能要求收取附加费。" },
      { content: "本报价包含邮轮上绝大部分餐饮及休闲娱乐，另有部分餐饮及服务需额外付费，详情请咨询。" },
      { content: "因不可抗拒之客观原因或不可抗力 (如天灾、战争、罢工等)或航空公司航班延误或取消、领馆签证延误、我公司有权取消或变更行程, 一切超出费用(如在外延期签证费、住、食、及交通费、国家航空运价调整等), 我公司有权追加差价；以上行程仅供参考，请以出团前的出发行程为准，我社保留对行程做出更改的权利。" },
      { content: "到预定的航次结束之日前已经怀孕24周的游客不能登船；参加邮轮旅行的儿童登船时最小年龄为6个月。" },
      { content: "请随身携带国际信用卡（船上用），美元现金（船上和岸上用），日元（岸上用）。" },
      { content: "自由行客人，请保证起航前2小时回船。船不等人，未按时归船者，责任自负。" },
      { content: "出团前，请认真阅读《出团通知》。" },],
      feesData:[
        { title:"费用包含：",list:[
          {content:"1.船票邮轮5晚住宿及免费餐厅用餐。"},
          { content: "2.邮轮上提供的免费娱乐设施。" },
          { content: "3.邮轮停靠港口港务税费。" },
          { content: "4.全程领队服务费。" },
          { content: "5.日本岸上游览观光免费行程【如因个人原因取消岸上观光行程，需补交境外地接签证名单及领队费用，￥500元/人】。" },
          { content: "6.日本团队出入境名单及登录许可证的费用。" },
          { content: "7.旅行社责任险。" },
          ]
        },
        {
          title: "费用不含：", list: [
            { content: "1.岸上游为赠送项目，如不参加，不可退还岸上观光费用。且需补交岸上游管理费500元/人。" },
            { content: "2.因交通延误、战争、政变、罢工、自然灾害、飞机故障、航次取消或更改时间等不可抗力原因所致的额外费用。" },
            { content: "3.特色餐厅或饮料酒水所需额外付费等项目。" },
            { content: "4.服务项目未提到的一切费用。" },
            { content: "5.邮轮服务费 船上自付：13周岁及以上乘客：(普通房型14.5美金/每人/每晚，套房房型：17.5美金/每人/每晚);4-12周岁儿童：(普通房型7.25美金/每人/每晚; 套房房型：8.75美金/每人/每晚); 4 周岁以下儿童：免收服务费。" },
            { content: "6.北京-天津往返大巴200元/人。" },
            { content: "7.旅游意外险（自选）70元/人。" },
          ]
        },
        {
          title: "邮轮船票取消原则：", list: [
            { content: "因邮轮产品特殊性，如果客人签署合同后，开船前解约的，旅行社向邮轮所支付的船票费用、港务费及燃油附加费等实际发生费用船方将不予退还，该部分费用将做为实际损失由客人承担。" },
            { content: "1.开船前60天（不含60天）以外取消，收取3000元作为损失费。" },
            { content: "2.开船前59天-45天取消，收取全款的50%作为损失费。" },
            { content: "3.开船前44~30天内取消，收取全款的80%作为损失费。" },
            { content: "4.开船前30天（含第30天）以内告知取消，或在开船前没有及时出现，或在开船之后无论以任何理由放弃旅行的客人，收取全款的100%作为损失费；以上任一情况均无权要求退还任何票款且应支付船票全价票款。" },
          ]
        },
        ],
		-------------------------------------------------------下面是程序的折叠和展开思路----------------------------
    objElementInfo: {}, //获取元素的高度
    ElementHeight: {},  //
    wantGetElement: ["journey", "equipment", "reserve","feesDescription"]/**需要获取高度的元素节点id */
-------------------------------------------------------下面是程序的折叠和展开思路----------------------------
    },
    /**
     * 获取商品详情 
     */
    getGoodsInfo: function () {
    let that = this;
    util.request(api.GoodsDetail, { id: that.data.id }).then(function (res) { 
      wx.hideLoading();
      if (res.errno === 0) {   
        switch (res.data.info.category_id)
        {
          case 1036013:
            res.data.specificationList.forEach((item,index)=>{
              if (item.specification_id==2)
              {
                item.name="舱型";

              } else if (item.specification_id ==4){
                item.name = "日期"
              } else if (item.specification_id == 1){
               item.name=""; 
              }
            });
            break;
          case 1036014:
            res.data.specificationList.forEach((item, index) => {
              if (index == 0) {
                item.name = "";
              } else {
                item.name = "选择"
              }
            });
            break;
          default:
            res.data.specificationList.forEach((item, index) => {
              if (index == 1) {
                item.name = "日期";
              } 
            });
            break;  
        } 
        let displayPrice=""
        let displayPriceMarket="" 
        displayPrice= res.data.info.retail_price;
        displayPriceMarket = res.data.info.market_price;
        
        // res.data.specificationList.forEach(item=>{
        //   if (item.specification_id==2)
        //   {
             
        //      item.valueList.forEach(temp=>{
        //        that.Handler(temp,temp.seq)
               
        //      });
        //     let newArry=[];
        //     for(let key in that.data.handlerCabin)
        //     {
        //       newArry.push({ name: key, value: that.data.handlerCabin[key]});
        //     }
        //     item.valueList=newArry;

        //   }
        // });
        res.data.specificationList.forEach(item=>{
          if (item.specification_id == 2)
          {
            item.valueList.forEach(temp=>{
              temp.iconUrl = that.Handler(temp.seq);
            })
          }
        })
        console.log("我处理过后的数据", res.data.specificationList);
        let priceDiffere = (Number(res.data.info.market_price * 1000) - Number(res.data.info.retail_price*1000))/1000;
        that.setData({     
          goods: res.data.info,
          gallery: res.data.gallery, /**产品展示图即轮播图*/
          attribute: res.data.attribute,
          issueList: res.data.issue, /***常见问题 */
          comment: res.data.comment,
          brand: res.data.brand,
          specificationList: res.data.specificationList,/***产品规格 */
          productList: res.data.productList, /***规格列表 */
          userHasCollect: res.data.userHasCollect,/**是否收藏 */
          displayPrice,
          displayPriceMarket,
          priceDiffere,
        });
          //设置默认值
          that.setDefSpecInfo(that.data.specificationList);

        if (res.data.userHasCollect == 1) {
          that.setData({
            'collectBackImage': that.data.hasCollectImage
          });
        } else {
          that.setData({
            'collectBackImage': that.data.noCollectImage
          });
        }
        WxParse.wxParse('goodsDetail', 'html', that.data.goods.goods_desc, that,5);
        that.getGoodsRelated();
      }
    });

  },
  getGoodsRelated: function () { //商品详情页的关联商品（大家都在看）
    let that = this;
    util.request(api.GoodsRelated, { id: that.data.id }).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          relatedGoods: res.data.goodsList,
        });
      }
    });

  },
  /**
   * 点击规格item
   */
  clickSkuValue: function (event)
   {
    let that = this;
    let specNameId = event.currentTarget.dataset.nameId;  //规格id
    let specValueId = event.currentTarget.dataset.valueId;//规格下面的子规格id
    let index=event.currentTarget.dataset.index;
    console.log("点击的规格item", index,this.data.specificationList[index]);
    console.log("点击的传过来的参数", "specNameId", specNameId, "specValueId", specValueId, "index", index);
    /**切换分类时将计数器重置*/
    this.setData({   
      number:1
    })
    //判断是否可以点击

    //TODO 性能优化，可在wx:for中添加index，可以直接获取点击的属性名和属性值，不用循环
    let _specificationList = this.data.specificationList;
    for (let i = 0; i < _specificationList.length; i++)
     {
      if (_specificationList[i].specification_id == specNameId) 
      {
        for (let j = 0; j < _specificationList[i].valueList.length; j++) 
        {
          if (_specificationList[i].valueList[j].id == specValueId) 
          {
            //如果已经选中，则反选
            if (_specificationList[i].valueList[j].checked) 
            {
              _specificationList[i].valueList[j].checked = false;
             
                this.setData({
                  displayPrice: this.data.goods.retail_price,
                  displayPriceMarket: this.data.goods.market_price
                })
            } else 
            {
              _specificationList[i].valueList[j].checked = true;
              let that=this;
              setTimeout(()=>{
                let that = this;
                this.changePrice()
              },100)
             
            }
          } else 
          {
            _specificationList[i].valueList[j].checked = false;
            
          }
        }
      }
    }
    this.setData({
      'specificationList': _specificationList
    });
    //重新计算spec改变后的信息
    this.changeSpecInfo();

    //重新计算哪些值不可以点击
  },

  //获取选中的规格信息
  getCheckedSpecValue: function (flage) 
  {
    let checkedValues = [];
    let _specificationList = this.data.specificationList;
    for (let i = 0; i < _specificationList.length; i++) 
    {
      let _checkedObj = {
        nameId: _specificationList[i].specification_id,
        valueId: 0,
        valueText: ''
      };
      for (let j = 0; j < _specificationList[i].valueList.length; j++) 
      {
        
        if (_specificationList[i].valueList[j].checked) 
        {
            _checkedObj.valueId = _specificationList[i].valueList[j].id;
            _checkedObj.valueText = _specificationList[i].valueList[j].value;
        }
      }
      checkedValues.push(_checkedObj);
    }

    return checkedValues;

  },
  //根据已选的值，计算其它值的状态
  setSpecValueStatus: function () {

  },
  //判断规格是否选择完整
  isCheckedAllSpec: function () {
    return !this.getCheckedSpecValue().some(function (v) {
      if (v.valueId == 0) {
        return true;
      }
    });
  },

  /**得到具体的规格id */
  getCheckedSpecKey: function () {
    let checkedValue = this.getCheckedSpecValue().map(function (v) {
      return v.valueId;
    });
    return checkedValue.join('_');
  },
 /**
  * 改变规格文本
  */
  changeSpecInfo: function (flage) 
  {
    let checkedNameValue = this.getCheckedSpecValue();
    console.log("选中的规格信息", checkedNameValue);

    //设置选择的信息
    let checkedValue = checkedNameValue.filter(function (v) {
      if (v.valueId != 0) 
      {
        return true;
      } else 
      {
        return false;
      }
    }).map(function (v) {
      return v.valueText;
    });
    if (checkedValue.length > 0) {
      this.setData({
        'checkedSpecText': checkedValue.join('　')
      });
    } else {
      this.setData({
        'checkedSpecText': '请选择规格数量'
      });
    }

  },
  getCheckedProductItem: function (key) {  /***获取库存 */
    return this.data.productList.filter(function (v) {
      if (v.goods_specification_ids.indexOf(key) > -1) {
        return true;
      } else {
        return false;
      }
    });
  },
  onLoad: function (options) 
  {
    this.setData({
      id: parseInt(options.id),
      shareId: options.shareId || wx.getStorageSync("shareId") || ""
    });
	-------------------------------------------------------下面是程序的折叠和展开思路----------------------------
    this.getElementHeight(this.data.wantGetElement).then(res=>{
      let ElementHeight = { journey: { value: 75, state: true }, equipment: { value: 75, state: true }, reserve: { value: 75, state: true }, feesDescription: { value: 75, state: true }};
       this.setData({
         objElementInfo:res,
         ElementHeight,
       });
    });
  },
  -------------------------------------------------------下面是程序的折叠和展开思路----------------------------
  onReady: function () {  // 页面渲染完成
     //获得组件
    // this.gohome = this.selectComponent("#goHome");
  },
  // handClickGoHome()
  // {
  //   this.gohome.goHome();
  // },
  onShow: function ()
  {
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    util.request(api.CartGoodsCount).then(function (res) {
    
      if (res.errno === 0) {
        that.setData({
          cartGoodsCount: res.data.cartTotal.goodsCount
        });
        that.judgeVip();
        that.isTemporyVip();
      }
    });

    var that = this
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,/**得到设备的实际高度 */
          clientWidth = res.windowWidth,/**得到设备的实际宽度*/
          rpxR = 750 / clientWidth;   /**逻辑/实际**/
        var calc = clientHeight * rpxR - 100;
        that.setData({
          winHeight: calc
        });
      }
    });

  },
  /**
   * 分享
   */
  onShareAppMessage: function () {
    return {
      title:`${this.data.goods.name}` ,
      imageUrl: this.data.gallery[0].img_url,
      path: `/pages/index/index?id=${this.data.id}&shareId=${wx.getStorageSync("userId")}&flage=${consts.PRODUCT_SHARE}`
    }
  },
  /**
   * 切换规格和详情
   */
  switchAttrPop: function () {
    if (this.data.openAttr == false) {
      this.setData({
        openAttr: !this.data.openAttr,
        collectBackImage: "http://hldfiles.oss-cn-qingdao.aliyuncs.com/selectholiday/upload/20190109/150241347e7301.png"
      });
    }
  },
  closeAttrOrCollect: function () {
    let that = this;
    if (this.data.openAttr) {
      this.setData({
        openAttr: false,
      });
      if (that.data.userHasCollect == 1) {
        that.setData({
          'collectBackImage': that.data.hasCollectImage
        });
      } else {
        that.setData({
          'collectBackImage': that.data.noCollectImage
        });
      }
    } else {
      //添加或是取消收藏
      util.request(api.CollectAddOrDelete, { typeId: 0, valueId: this.data.id }, "POST", "application/json")
        .then(function (res) {
          let _res = res;
          if (_res.errno == 0) {
            if ( _res.data.type == 'add') {
              that.setData({
                'collectBackImage': that.data.hasCollectImage
              });
            } else {
              that.setData({
                'collectBackImage': that.data.noCollectImage
              });
            }

          } else {
            wx.showToast({
              image: '/static/images/icon_error.png',
              title: _res.errmsg,
              mask: true
            });
          }

        });
    }

  },
  openCartPage: function () {
    wx.switchTab({
      url: '/pages/cart/cart',
    });
  },

  /**
   * 直接购买
   */
  buyGoods: function () {
    var that = this;
    if (this.data.openAttr == false) {
      //打开规格选择窗口
      this.setData({
        openAttr: !this.data.openAttr,
        collectBackImage: "http://hldfiles.oss-cn-qingdao.aliyuncs.com/selectholiday/upload/20190109/150241347e7301.png"
      });
    } else
     {

      //提示选择完整规格
      if (!this.isCheckedAllSpec()) {
        wx.showToast({
          title: '请选择完整的规格',
          icon:'none'
        })
        return false;
      }

      //根据选中的规格，判断是否有对应的sku信息
      console.log("我是getCheckedSpecKey", this.getCheckedSpecKey());
      let checkedProduct = this.getCheckedProductItem(this.getCheckedSpecKey());//参数是商品库存id goods_specification_ids
     
      if (!checkedProduct || checkedProduct.length <= 0) {
        //找不到对应的product信息，提示没有库存
        wx.showToast({
          title: '库存不足',
          icon: 'none'
        })
        return false;
      }

      //验证库存
      if (checkedProduct.goods_number < this.data.number) {
        //找不到对应的product信息，提示没有库存
        wx.showToast({
          title: '库存不足',
          icon:  'none',
        })
        return false;
      }
      console.log("我是productId", checkedProduct);  
      let goodsType="";
      switch (this.data.goods.category_id)
      {
        case 1036015: /**优选产品*/
          goodsType = consts.ORDER_GOODS_TYPE_01
          break;
        case 1036014 : /**签证 */
          goodsType = consts.ORDER_GOODS_TYPE_04;
          break;  
        case 1036017 : /**活动*/  
          goodsType = consts.ORDER_GOODS_TYPE_03;
          break;  
        default:
          goodsType = consts.ORDER_GOODS_TYPE_02; 
          break;       
      }
      // 直接购买商品(添加缓存)
      util.request(api.BuyAdd, { goodsId: this.data.goods.id, number: this.data.number, productId: checkedProduct[0].id}, "POST",'application/json')
        .then(function (res) {  
          console.log("直接购买",res);
          let _res = res;
          if (_res.errno == 0) {
            that.setData({
              openAttr:!that.data.openAttr,
            },function(){
              wx.navigateTo({
                url: `/pages/shopping/checkout/checkout?isBuy=true&goodsType=${goodsType}&vipFlage=${that.data.vipFlage}`,
              });
            });
           
          } else {
            wx.showToast({
              image: '/static/images/icon_error.png',
              title: _res.errmsg,
              mask: true
            });
          }

        });

    }
  },

  /**
   * 添加到购物车
   */
  addToCart: function () {
    var that = this;
    if (this.data.openAttr == false)
     {
      //打开规格选择窗口
      this.setData({
        openAttr: !this.data.openAttr,  //为true是表示是选择规格
        collectBackImage: "http://hldfiles.oss-cn-qingdao.aliyuncs.com/selectholiday/upload/20190109/150241347e7301.png"
      });
      wx.setNavigationBarTitle({
        title:'选择规格'
      })
    } else {

      //提示选择完整规格
      console.log("选择的规格状态", this.isCheckedAllSpec());
      if (!this.isCheckedAllSpec()) {
          wx.showToast({
              title: '请选择完整规格'
          });
        return false;
      }

      //根据选中的规格，判断是否有对应的sku信息
      let checkedProduct = this.getCheckedProductItem(this.getCheckedSpecKey());//goods_specification_ids 验证是否有此类型的产品
      console.log("库存状态", checkedProduct);  
      if (!checkedProduct || checkedProduct.length <= 0) {
        //找不到对应的product信息，提示没有库存
        wx.showToast({
          title: '库存不足',
          icon: 'none'
        })
        return false;
      }

      //验证库存
      console.log("库存验证状态", checkedProduct.goods_number < this.data.number);
      if (checkedProduct.goods_number < this.data.number) {
        //找不到对应的product信息，提示没有库存
        return false;
        wx.showToast({
          title: '库存不足',
          icon: 'none'
        })
        return false;
      }
         
      //添加到购物车
      util.request(api.CartAdd, { goodsId: this.data.goods.id, number: this.data.number, productId: checkedProduct[0].id }, 'POST', 'application/json')
        .then(function (res) {  
          let _res = res;
          if (_res.errno == 0) {
            wx.showToast({
              title: '添加成功'
            });
            that.setData({
              openAttr: !that.data.openAttr,
              cartGoodsCount: _res.data.cartTotal.goodsCount
            });
            if (that.data.userHasCollect == 1) {
              that.setData({
                'collectBackImage': that.data.hasCollectImage
              });
            } else {
              that.setData({
                'collectBackImage': that.data.noCollectImage
              });
            }
          } else {
            wx.showToast({
              image: '/static/images/icon_error.png',
              title: _res.errmsg,
              mask: true
            });
          }

        });
    }

  },
  cutNumber: function () {
    this.setData({
      number: (this.data.number - 1 > 1) ? this.data.number - 1 : 1
    });
  },
  addNumber: function () {
    if(this.data.number+1>this.data.inventory) /***库存不足 */
    {
      console.log("库存不足了", this.data.number + 1, this.data.inventory);
      wx.showToast({
        title:"库存不足",
        icon:"none",
      })
      return;
    }
    this.setData({
      number: this.data.number + 1
    });
  },
    setDefSpecInfo: function (specificationList) {
        //未考虑规格联动情况
        let that = this;
        if (!specificationList)return;
        for (let i = 0; i < specificationList.length;i++){
            let specification = specificationList[i];
            let specNameId = specification.specification_id;
            //规格只有一个时自动选择规格
            if (specification.valueList && specification.valueList.length == 1){
                let specValueId = specification.valueList[0].id;
                that.clickSkuValue({ currentTarget: { dataset: { "nameId": specNameId, "valueId": specValueId } } });
            }
        }
        specificationList.map(function(item){

        });

    },
    /**
     * 根据选择不同的规格来动态显示价格
     */
  changePrice:function()
  { 
      //提示选择完整规格
      if (!this.isCheckedAllSpec()) {
        return false;
      }
      let that=this;
      let checkedProduct = this.getCheckedProductItem(this.getCheckedSpecKey());
      this.setData({
        inventory:checkedProduct[0].goods_number||0
      });
      console.log("更改后的inventory",this.data.inventory);
      if (!checkedProduct || checkedProduct.length <= 0)
      {
      }
      //验证库存
      if (checkedProduct.goods_number < this.data.number) 
      {
        return wx.showToast({
          title: '库存不足',
          icon: 'none',
        });
      }
    console.log("checkedProduct",checkedProduct)
      util.request(api.BuyAdd, { goodsId: that.data.goods.id, number: that.data.number, productId: checkedProduct[0].id }, "POST", 'application/json')
        .then(function (res) {
          console.log("res",res);
          if (res.errno == 0)
          {
              util.request(api.CartCheckout, { addressId:0, couponId: 0,type: "buy"}).then(function (res) {
              if (res.errno === 0) 
              {
                  that.setData({
                    displayPrice:checkedProduct[0].retail_price,
                    displayPriceMarket: checkedProduct[0].market_price
                  });
              }
            });
          }
        }).catch(err=>{
          wx.showToast({
            title: '库存不足',
            icon: 'none'
          })
        });
    },
  // /**
  //  * 活动报名
  //  */
  // goOrder()
  // {
  //   let that=this;
  //   util.request(api.BuyAdd, { goodsId: this.data.goods.id, number: 1, productId: that.data.productList[0].id }, "POST", 'application/json').then(function (res) {
  //     console.log("活动直接购买", res);
  //     let _res = res;
  //     if (_res.errno == 0) {
  //         wx.navigateTo({
  //           url: `/pages/shopping/checkout/checkout?isBuy=true&goodsType=${consts.ORDER_GOODS_TYPE_03}&vipFlage=${that.data.vipFlage}`,
  //         });
  //     } else {
  //       wx.showToast({
  //         image: '/static/images/icon_error.png',
  //         title: _res.errmsg,
  //         mask: true
  //       });
  //     }
  //   });
  // },
  /**
   * 判断用户是否是会员
   */
  judgeVip()
  {
    let that=this;
    util.request(api.JudgeVip).then(res=>{
      console.log("判断是不是卡会员",res);
        if(res.errno==0)
        {
          that.setData({
            vipFlage:true,
          })
        }
       this.getGoodsInfo();
    })
  
  },
  /**
   * 判断舱型
   *
   */
  Handler(seq)
  {
    
    switch (seq > 100 ? (seq>200 ? (seq>300 ? (seq>400 ?(seq>500 ?(seq >600 ? 7 :5) :4) :3) :2):1): 0){
      case 0:
        return ""; 
        break; 
      case 1:
        return consts.INSIDE_CABIN_ICON;
        break;
      case 2:
        return consts.BALCONY_ROOM_ICON;
        break; 
      case 3:
        return consts.SEA_VIEW_ICON;
        break;   
      case 4:
        return consts.SUITE_ROOM_ICON
        break;   
      case 5:
        return consts.OTHER_ICON
        break; 
      default:
        return ""; 
        break;      
  } 
},
/**
 *判断是不是临时会员
 */
isTemporyVip()
{ 
  let that=this;
  util.request(api.TemporyVip).then(res=>{
    console.log("判断是不是临时会员",res);
    if (res.errno==0)
    {
      that.setData({
        temporaryVipFlag:true
      })
    }
  }).catch(err=>{
    console.log(err);
  })
},
-------------------------------------------------------下面是程序的折叠和展开思路----------------------------
/**
 * 获取元素的高
 */
getElementHeight(ids)
{
  return new Promise((resolve,reject)=>{
    let objElementInfo={};
    let count=0;
    ids.forEach(item=>{
      let query=wx.createSelectorQuery();
      query.select(`#${item}`).boundingClientRect();
      query.exec((rect) => {
         if(rect[0]!=null)
         {
           objElementInfo[item] = Math.round(rect[0].height);
           count++; 
           if (count == ids.length)
           {
             resolve(objElementInfo);
           }
         }
      })
    })
   
  })
},
/**
 * 点击展开和收缩
 */
changHeight(e){
 
  let index=e.currentTarget.dataset.index;
  let ElementHeight=this.data.ElementHeight;
  let objElementInfo = this.data.objElementInfo;
  for (let key in ElementHeight)
  {
    if (!ElementHeight[key].state && key != index)
    {
      ElementHeight[key].value=75;
      ElementHeight[key].state=true;
    }
  }
  if (ElementHeight[index].value<100)
  {
    ElementHeight[index].value = objElementInfo[index];
    ElementHeight[index].state =false;
    this.setData({
      ElementHeight,
    })
  }else{
    ElementHeight[index].value =75;
    ElementHeight[index].state = true;
    this.setData({
      ElementHeight,
    })
  }  
}
})