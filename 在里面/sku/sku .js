Page({

  /**
   * 页面的初始数据
   */
  data: {
    commodityAttr: [ /**原始的库存型号 */
      {
        priceId: 1,
        price: 35.0,
        "stock": 8,
        "attrValueList": [
          {
            "attrKey": "型号",
            "attrValue": "2"
          },
          {
            "attrKey": "颜色",
            "attrValue": "白色"
          },
          {
            "attrKey": "大小",
            "attrValue": "小"
          },
          {
            "attrKey": "尺寸",
            "attrValue": "S"
          }
        ]
      },
      {
        priceId: 2,
        price: 35.1,
        "stock": 9,
        "attrValueList": [
          {
            "attrKey": "型号",
            "attrValue": "1"
          },
          {
            "attrKey": "颜色",
            "attrValue": "黑色"
          },
          {
            "attrKey": "大小",
            "attrValue": "小"
          },
          {
            "attrKey": "尺寸",
            "attrValue": "M"
          }
        ]
      },
      {
        priceId: 3,
        price: 35.2,
        "stock": 10,
        "attrValueList": [
          {
            "attrKey": "型号",
            "attrValue": "1"
          },
          {
            "attrKey": "颜色",
            "attrValue": "绿色"
          },
          {
            "attrKey": "大小",
            "attrValue": "大"
          },
          {
            "attrKey": "尺寸",
            "attrValue": "L"
          }
        ]
      },
      {
        priceId: 4,
        price: 35.2,
        "stock": 10,
        "attrValueList": [
          {
            "attrKey": "型号",
            "attrValue": "1"
          },
          {
            "attrKey": "颜色",
            "attrValue": "绿色"
          },
          {
            "attrKey": "大小",
            "attrValue": "小"
          },
          {
            "attrKey": "尺寸",
            "attrValue": "L"
          }
        ]
      }
    ],
    attrValueList: [], /***存放规格 */
    selectedAttr: [],
    match_sku: [],
  },
  onShow: function () {
    this.setData({
      includeGroup: this.data.commodityAttr,
      /***所有的规格列表*/      /**0 表示未选中 1表示选中  2禁用状态*/
      attrValueList: [
        { attrKey: "型号", attrValues: [{ name: 1, checked: 0 }, { name: 2, checked: 0 }] },
        { attrKey: "颜色", attrValues: [{ name: "白色", checked: 0 }, { name: "黑色", checked: 0 }, { name: "绿色", checked: 0 }] },
        { attrKey: "大小", attrValues: [{ name: "小", checked: 0 }, { name: "大", checked: 0 }] },
        { attrKey: "尺寸", attrValues: [{ name: "S", checked: 0 }, { name: "M", checked: 0 }, { name: "L", checked: 0 }] },
      ],
      /**所有的sku列表 */
      skuArr: ["1_绿色_大_L", "2_白色_小_S", "1_黑色_小_M", "1_绿色_小_L"]
    });
  },
  /**
   * item点击函数
   */
  selected(e) {
    let row = e.currentTarget.dataset.row; //获取行
    let colom = e.currentTarget.dataset.colom;//获取列
    let checkState = e.currentTarget.dataset.checked;
    console.log(row, colom, checkState);

    this.itemSelectedFun(row, colom, checkState);
    this.matchSkuFun();/**统计被匹配到的sku*/
    this.zhiHuiFun(row);/**对没有库存的属性进行禁用置灰 */

  },
  itemSelectedFun(row, colom, checkState) {
    let attrValueList = this.data.attrValueList; /**清除当前行的其他选中状态*/
    for (let i = 0; i < attrValueList[row].attrValues.length; i++) {
      attrValueList[row].attrValues[i].checked = 0;
    }
    this.setData({
      attrValueList,
    })

    if (checkState == 1)  /**已是选中状态 */ {
      let attrValueList = this.data.attrValueList;
      attrValueList[row].attrValues[colom].checked = 0; /**已经是选中的则置成非选中 */
      this.setData({
        attrValueList,
      })
    } else if (checkState == 0)  /**未选中状态 */ {
      let attrValueList = this.data.attrValueList;
      attrValueList[row].attrValues[colom].checked = 1; /**未选中的则置成选中 */
      this.setData({
        attrValueList,
      })
    }
  },
  matchSkuFun() 
  {
    /**每次点击统一的收集已选中的属性 */
    let selectedAttr = [];
    for (let i = 0; i < this.data.attrValueList.length; i++) {
      for (let j = 0; j < this.data.attrValueList[i].attrValues.length; j++) {
        if (this.data.attrValueList[i].attrValues[j].checked == 1) /***选中的属性存储起来*/ {
          this.data.attrValueList[i].attrValues[j].row = i;
          selectedAttr.push(this.data.attrValueList[i].attrValues[j]);
        }
      }
    }
    this.setData({  /**将选中的存储到data中 */
      selectedAttr,
    });
    console.log("数组我的长度", this.data.selectedAttr.length);
    let selectedAttrNameArrTemp = [];
    for (let n = 0; n < this.data.selectedAttr.length; n++) {
      selectedAttrNameArrTemp.push(this.data.selectedAttr[n].name);
    }
    let selectedAttrStr = selectedAttrNameArrTemp.join("_");
    console.log("我拼接的选中状态", selectedAttrStr);
    //判断哪个商品被选中
    let match_skuPre = this.data.skuArr.map(item => {  /**存在undefined */
      console.log("item", item);
      console.log("111", item.includes(selectedAttrStr))
      if (item.includes(selectedAttrStr)) {
        return item;
      }
    });
    let match_sku = [];
    match_skuPre.forEach(item => {  /**清除undefined */
      if (item) {
        match_sku.push(item)
      }
    })
    console.log("我匹配到的sku", match_sku, match_sku.length);
    this.setData({
      match_sku,
    })

  },
  zhiHuiFun(row) 
  {
    /**除去选中的全部只灰 */
    let attrValueList = this.data.attrValueList;
    for (let p = 0; p < attrValueList.length; p++) 
    {
      //  if(p==row) //有问题 如果不置空的话 可能当行里面的属性与前面的规格组合没库存，本应该是点击行的属性如果可以和已选的属性组合的话是可以选的，如果不能组合就不可以选，闲下来在优化，大体成了。
      //  {
      //      continue;/**选中的当前行的属性不置灰 */
      //  }
      for (let l = 0; l < attrValueList[p].attrValues.length; l++) 
      {
        if (!(attrValueList[p].attrValues[l].checked==1))
         {
          attrValueList[p].attrValues[l].checked = 2;
          console.log("我置灰的", attrValueList[p].attrValues[l].name)
        }
      }
    }
    this.setData({
      attrValueList
    })

    /**开始遍历选中的属性存在的置为正常状态 */

    let attrValueList2 = this.data.attrValueList
    for (let n = 0; n < this.data.match_sku.length; n++) /**匹配到sku的个数 */ 
    {
      let matchSkuArr = this.data.match_sku[n].split("_");
      console.log("我的matchSkuArr", matchSkuArr[0]);
      for (let m = 0; m < matchSkuArr.length; m++)  /**将匹配到规格字符串转化为数组 */ 
      {   
        for (let j = 0; j < attrValueList2.length; j++) /***产品规格第一层 */ 
        {
          console.log("1");
          for (let k =0 ; k < attrValueList2[j].attrValues.length; k++) /**产品规格第二层 */ 
          {
            console.log("attrValueList2[j].attrValue[k]", attrValueList2[j].attrValues[k])
            if (attrValueList2[j].attrValues[k].name == matchSkuArr[m]) /**存在的规格 */ 
            {   
              if (!(attrValueList2[j].attrValues[k].checked==1))
              {
                console.log("我执行了", matchSkuArr[m]);
                console.log("matchSkuArr", matchSkuArr[m])
                attrValueList2[j].attrValues[k].checked ="0";
                console.log("我置正常的", attrValueList2[j].attrValues[k])
              }
            }
          }
        }
      }
    }
    this.setData({
      attrValueList: attrValueList2
    })
  }
})