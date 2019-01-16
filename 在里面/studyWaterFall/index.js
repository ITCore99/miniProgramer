let col1H=0;
let col2H=0;
/**注意这里是通过image图片缓存的方法来实现获取图片的宽高，如果是要获取文档节点的的宽高使用wx.createSelectorQuery()api */

Page({

  /**
   * 页面的初始数据
   */
  data: {
   scrollH:0,
   imgWidth:0, /**图片的宽度 */
   loadingCount:0,
   images:[],
   col1:[],
   col2:[],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) 
  {
     
     let that=this;
     wx.getSystemInfo({
       success:(res) => {
         let ww = res.windowWidth;
         let wh = res.windowHeight;
         let imgWidth = ww*0.48;
         let scrollH = wh;

         console.log("我执行了",ww,wh,imgWidth,scrollH,that);

         that.setData({
           scrollH,         
           imgWidth
         })
         that.loadImages();
       }
     })
  },
  /**
   * 图片进行处理
   */
  loadImages:function(){
     
   
    let images = [
      { pic: "../../images/1.png", height: 0 },
      { pic: "../../images/2.png", height: 0 },
      { pic: "../../images/3.png", height: 0 },
      { pic: "../../images/4.png", height: 0 },
      { pic: "../../images/5.png", height: 0 },
      { pic: "../../images/6.png", height: 0 },
      { pic: "../../images/7.png", height: 0 },
      { pic: "../../images/8.png", height: 0 },
      { pic: "../../images/9.png", height: 0 },
      { pic: "../../images/10.png", height: 0 },
      { pic: "../../images/11.png", height: 0 },
      { pic: "../../images/12.png", height: 0 },
      { pic: "../../images/13.png", height: 0 },
      { pic: "../../images/14.png", height: 0 }
    ];

    let baseId="img-"+(+new Date());

    for(let i=0;i<images.length;i++)
    {
      images[i].id=baseId+"-"+i;  
    };
    this.setData({
      loadingCount:images.length,
      images:images
    })
  },
  /**
   * 图片加载完执行的方法
   */
  onImageLoad:function(e)
  {
    console.log("我是事件对象e",e);
    let imageId=e.currentTarget.id;//图片的id
    let oImgW=e.detail.width;//图片原本的宽度
    let oImgH = e.detail.height;//图片原本的高度
    let imgWidth=this.data.imgWidth;//图片设置宽度
    let scale= imgWidth/oImgW;  //比例计算
    let imgHeight=oImgH*scale;//自适应高度

    let images=this.data.images; //获取到所有的图片
    let imageObj=null;

    for(let i=0;i<images.length;i++)
    {
      let img=images[i];
      if(img.id===imageId)
      {
        imageObj=img;
        break;
      }
    }
    imageObj.height = imgHeight
    
    let loadingCount=this.data.loadingCount-1;
    let col1=this.data.col1;
    let col2=this.data.col2;

    if (col1H <= col2H)
    {
      col1H +=  imgHeight ;
      col1.push(imageObj)
    }else{

      col2H +=imgHeight;
      col2.push(imageObj);
    }
   
    let data = {
      loadingCount: loadingCount,
      col1: col1,
      col2: col2
    }; 
    //当这组图片加载完时将图片缓存区清空
    if (!loadingCount) {
      data.images = [];
    }

    this.setData(data)
  }
})