Page({

  /**
   * 这是自己手动实现的一个商品属性选择的sku,起始并不完美，希望在以后的学习中可以改正不合适的地方，
   * 这里我主要说一个实现思路
   * 1、首先我们拿到后台给我们的sku数据我们将有库存的sku拼接成1-绿-大-L把苏偶有的sku字符串放到一个数组中，
   * 我们在把每一个sku的子集(用户选择路径)全部的求出来放到一个数组。
   * 2、但用户点击时我们循环遍历每一个没有选中的元素，和已经选中的元素组成一个路径，再将这条
   */
  data: {
    commodityAttr: [ /**原始的库存型号后台给我们的数据*/
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
    /**
     *所有有库存的sku组合(子集信息)信息
     */
    allSkuPart:[], 
    /**
     * 0 是正常
     * 1 是选中
     * 2 是禁选
     * 用于存放属性行 
     */
    categoryAttrArr: [
    { 
        key: "型号", value: [{ value: 1, checked: "0", sort: 0, row: 0, colum: 0}, { value: 2, checked: "0", sort: 1, row: 0, colum:1}]
    },
    {
      key: "颜色", value: [{ value: "红色", checked: "0", sort: 10, row: 1, colum: 0 }, { value: "黑色", checked: "0", sort: 11, row: 1, colum: 1 }, { value: "绿色", checked: "0", sort: 12, row: 1, colum: 2 },{ value: "白色", checked: "0", sort: 13, row: 1, colum: 3 }]
    },
    {
      key: "大小", value: [{ value: "大", checked: "0", sort: 20, row: 2, colum: 0 }, { value: "小", checked: "0", sort: 21, row: 2, colum: 1 },]
    },
    {
      key: "尺寸", value: [{ value: "M", checked: "0", sort: 30, row: 3, colum: 0 }, { value: "L", checked: "0", sort: 31, row: 3, colum: 1 }, { value: "S", checked: "0", sort: 32, row: 3, colum: 2}]
    }
    ],
    selectedAtt:[],//存放已选中的属性
    unSelectedAtt:[]//存放未选中的元素
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.doWithData();
    // this.getCategoryAttr();

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 将数据处理成我们需要的[1,2,3]的数组然后我们对其进行求子集
   */
  doWithData()
  {
    let sku=[];/**用于存放有库存的sku */
    this.data.commodityAttr.forEach(item=>{
      let skuStr="" ;/**sku属性组成的字符串 */
      item.attrValueList.forEach(temp=>{
        skuStr += temp.attrValue + "-";
      });
      sku.push(skuStr.substring(0,skuStr.length-1));
    })
    console.log("我的sku数组",sku);
    this.generatorPart(sku)
  },
  /**
   * 生成所有sku的子集
   * 实现思路将数组每一个匹配到sku求出所有的子集，最后将每一个sku的所有子集进行整合得到一个所有sku的子集集合 
   */
  generatorPart(sku) 
  {
    console.log("我执行了",sku);
    let that=this;
    let allSkuPart=[];/**用于存放所有sku的子集集合 */
    sku.forEach(item=>{
      let itemArr=item.split("-");
      let itemArrSubset=that.singlePart(itemArr); 
      console.log("itemArrSubset", itemArrSubset);
      allSkuPart = allSkuPart.concat(itemArrSubset); /**得到所有的sku的组合信息（子集）*/
    });
    console.log("我是所有的sku组合子集", allSkuPart);
    /**将所有的sku字节拼接成字符串 */
    let tempAllSkuPart=[];
    allSkuPart.forEach(item=>{
         let str = "";
         item.forEach(temp=>{
           str+=temp+"-"
         })
      tempAllSkuPart.push(str.substring(0,str.length-1));
    })    
    this.setData({
      allSkuPart: tempAllSkuPart
    })
  },
  /**
   * 求所有子集的算法函数：（求出单个）
   */
 singlePart(item)
 {
   var ps = [[]];       /**求出单个子集信息 */
   for(let i=0;i< item.length;i++)
   {
     for (let j = 0, len = ps.length; j < len;j++)
     {
       ps.push(ps[j].concat(item[i]))
     }
   }
   return ps.slice(1,ps.length);/**这种方法获取集合的子集会多出一个空集合所以将空集合去掉 */
 },
  /**
   * 点击事件
   */
  selected(e)
  {
    console.log("事件对象",e)
    let row = e.currentTarget.dataset.row;
    let colum = e.currentTarget.dataset.colom;
    let categoryAttrArr=this.data.categoryAttrArr;
    if (categoryAttrArr[row].value[colum].checked==1)
    {
      categoryAttrArr[row].value[colum].checked = "0"; /**已选中则取消*/


    }else
    {
      categoryAttrArr[row].value[colum].checked = "1"; /**选中当前元素 */

      /**实现单选 */
      categoryAttrArr.forEach((item, index) => {
        if (index == row) {
          item.value.forEach((temp, index2) => {
            if (index2 != colum) {
              temp.checked = "0"
            }
          })
        }
      })

    }
    this.setData({
      categoryAttrArr,
      selectedAtt:[],
    });
    
    let selectedAtt = []; /**存放已选中的属性 */
    let unSelectedAtt=[];/**获取到没选中元素 */
   
    /**
     * 获取已选中和未选中元素
    */
    for (let i = 0; i <categoryAttrArr.length;i++)
    {
      for (let j = 0; j < categoryAttrArr[i].value.length;j++)
      {
        if (categoryAttrArr[i].value[j].checked=="1")
        {
          selectedAtt.push(categoryAttrArr[i].value[j]);
        }else{
          unSelectedAtt.push(categoryAttrArr[i].value[j]);
        }
      }
    };
    if (selectedAtt.length==0)/**没有选中 */
    {
      this.clearAttr(categoryAttrArr);/**将全部属性置空*/
      return;
    }
    this.setData({
      selectedAtt,
      unSelectedAtt
    });
    /**
     * 遍历未选中元素
     */
    for (let n = 0; n < unSelectedAtt.length;n++)
    {
      let newSku = [...selectedAtt]; /**这里要是用拓展运算符不能直接写成newSku=selectedAtt因为后者是浅拷贝但他们指向同一个内存空间，当newSku改变时selectedAtt会变，所以这里要使用拓展运算符来实现深拷贝 */
      let index="null";             /**记录下是同行元素在选中元素中的位置 */
      let row = unSelectedAtt[n].row
      for (let m = 0; m < selectedAtt.length;m++)
      {
        if (row == selectedAtt[m].row) /**如果是同行元素跳过 */
        {
          index=m;
        }
      }
      if(index !="null") /**存在同行则将已选中的同行删除使用同行未选中元素代替*/
      {
        newSku.splice(index, 1);/**删除同行选中元素与其他选中元素组合新的sku */
      }
      newSku.push(unSelectedAtt[n]); /**这里得到一条路径 *//**如果存在将将不变，如果不存在将其置为灰色 */    
      let newSkuStr = this.getSkuStr(newSku); /**获取每一个未选中元素和选中元素组成的路径字符串*/ 
      console.log("我的sku字符串",newSkuStr);
      let flage=this.matchSku(newSkuStr);/**判断在sku子集是否存在这条路径 */
      
      /**进行状态的改变 */
      let categoryAttrArr = this.data.categoryAttrArr;
      let ItemRow = unSelectedAtt[n].row;
      let ItemColum = unSelectedAtt[n].colum;
      if(!flage) /**路径不存在 该禁选*/
      {
        categoryAttrArr[ItemRow].value[ItemColum].checked="2"
      }else
      {
        categoryAttrArr[ItemRow].value[ItemColum].checked = "0"
      }
      this.setData({
        categoryAttrArr
      })
    }
  },
  /**
   * 通过sku进行匹配
   */
  getSkuStr(newSku)
  {
    console.log("排序之前的newSku", newSku)
    newSku.sort((value1,value2)=>{  /**对其进行裴谞 */
      if(value1.sort<value2.sort)
      {
        return -1
      }else if(value1.sort>value2.sort){
         return 1
      }else{
        return 0;
      }
    });
    console.log("我排序之后的newSku",newSku);
    let NewSkuStr=""  /**获取到新的sku */
    newSku.forEach(item=>{
      NewSkuStr += item.value+"-"
    });
    return NewSkuStr = NewSkuStr.substring(0, NewSkuStr.length-1);/**获取到真真的书库字符串 */
  },
  /**
   * 开始进行匹配
   */
  matchSku(NewSkuStr)
  {
    console.log("我拿到的NewSkuStr", NewSkuStr);
    return this.data.allSkuPart.includes(NewSkuStr)
  },
  /**
   * 清空状态
   */
  clearAttr(categoryAttrArr)
  {
    for (let i = 0; i < categoryAttrArr.length; i++) 
    {
      for (let j = 0; j < categoryAttrArr[i].value.length; j++)
      {
        categoryAttrArr[i].value[j].checked="0"
      }
    };
    this.setData({
      categoryAttrArr
    }) 
  }

})