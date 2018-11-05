const App = getApp()
const api = require('../../../../utils/api.js');



//area
var area = require('../../../../utils/area.js')
var areaInfo = [];//所有省市区县数据
var provinces = [];//省
var citys = [];//城市
var countys = [];//区县
var index = [0, 0, 0];
var cellId;
var t = 0;
var show = false;
var moveY = 200;
//area end 




Page({
  data: {

    showDefault: !0,

    addressId: '',

    address:'',

/*     form: {
      //name: '',
      //tel: '',
      region: '',
      address: '',
      //is_def: !1,
    },  */

    //area
    show: show,
    provinces: provinces,
    citys: citys,
    countys: countys,
    value: [0, 0, 0],
    areaCode: '000000',
    //area end 
    confirms: false,
    disabled: false,


  },





  //滑动事件
  bindChange: function (e) {
    var val = e.detail.value

    //判断滑动的是第几个column
    //若省份column做了滑动则定位到地级市和区县第一位
    if (index[0] != val[0]) {
      val[1] = 0;
      val[2] = 0;
      getCityArr(val[0], this);//获取地级市数据
      getCountyInfo(val[0], val[1], this);//获取区县数据
    } else {    //若省份column未做滑动，地级市做了滑动则定位区县第一位
      if (index[1] != val[1]) {
        val[2] = 0;
        getCountyInfo(val[0], val[1], this);//获取区县数据
      }
    }
    index = val;

    console.log(index + " => " + val);

    console.log(provinces)
    console.log(countys)
    console.log(countys[val[2]].code)

    //获取省市区code
    var areaCode;
    if (countys[val[2]].code == undefined){
      areaCode = provinces[val[0]].code;
    }else{
      areaCode = countys[val[2]].code;
    }

    //判断 如果选择“市辖区”的话，给后台 省和市的数据就行，不传"市辖区" 
    if (countys[val[2]].name == '市辖区'){
      areaCode = citys[val[1]].code;
    }

    console.log(">>>>>>>>>>>>>")
    console.log(areaCode)
    console.log(countys[val[2]].name)

    //更新数据
    this.setData({
      value: [val[0], val[1], val[2]],
      areaCode: areaCode,
      province: provinces[val[0]].name,
      city: citys[val[1]].name,
      county: countys[val[2]].name
    })

  },



  onLoad(options) {
    this.WxValidate = App.WxValidate({
      consignee: {
        required: true,
        minlength: 2,
        maxlength: 10,
        username:true,
      },
      mobile: {
        required: true,
        tel: true,
      },
      // region: {
      //   required: true,
      //   minlength: 2,
      //   maxlength: 20,
      // },
      address: {
        required: true,
        minlength: 2,
        maxlength: 100,
      },
    }, {
        consignee: {
          required: '请输入收货人姓名',
        },
        mobile: {
          required: '请输入收货人电话',
        },
        // region: {
        //   required: '请输入省市区',
        // },
        address: {
          required: '请输入收货人详细地址',
        },
      })


    //area
    cellId = options.cellId;
    var that = this;
    //var date = new Date()
    //console.log(date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日");

    //获取省市区县数据
    area.getAreaInfo(function (arr) {
      areaInfo = arr;
      //获取省份数据
      getProvinceData(that);
    });
    //area end

    console.log("--------------------")
    console.log(options)
    console.log("--------------------")

    if (options.addressId != null) {
      this.getAddressInfo(options)
    } else {
      this.newAddressInfo(options)
    }

  },






  getAddressInfo: function (options) {
    console.log(options.addressId)

    this.setData({
      addressId: options.addressId,    //放置addressId
    })

    const paramsData = {
      consumer_id: App.globalData.memberInfo.member_id,
      address_id: options.addressId,
    }
    //门店收藏接口
    const data = {
      service: 'member.consumerAddressFind',
      params: JSON.stringify(paramsData),
      url_type: 'member',

      app_token: App.globalData.app_token,
      security_code: App.globalData.security_code

    }



    console.log("----------三个参数----------")
    console.log(this.data.province)
    console.log(this.data.city)
    console.log(this.data.county)

    console.log(data)

    api.reqData({
      data,
      success: (res) => {
        console.log("返回 res.data>>>" + res.data);
        var resData = res.data;

        console.log("@@@@@@@@@@@@  area_desc  @@@@@@@@@@@@")
        console.log(resData.data[0].area_desc);
        console.log(resData);



        //可以更精细地处理一下 province  city county

        this.setData({
          province: resData.data[0].area_desc,
          city: '',
          county: '',
          areaCode: resData.data[0].area_id,//放置areaCode
          address:resData.data[0].address,
          form: resData.data[0]
        })


      },
      fail: (res) => {
        console.log(res.data);
      }
    })
  },





  newAddressInfo: function (e) {
    this.setData({
      form: [],
      addressId: '0000'
    })
  },


  // ------------------- 分割线 --------------------
  onReady: function () {
    this.animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 0,
      timingFunction: "ease",
      delay: 0
    }
    )
    this.animation.translateY(200 + 'vh').step();
    this.setData({
      animation: this.animation.export(),
      show: show
    })
  },



  //移动按钮点击事件
  translate(e) {

    if (t == 0) {
      moveY = 0;
      show = false;
      t = 1;
    } else {
      moveY = 200;
      show = true;
      t = 0;
    }
    // this.animation.translate(arr[0], arr[1]).step();
    animationEvents(this, moveY, show);

  },



  //隐藏弹窗浮层
  hiddenFloatView(e) {
    console.log(e);
    moveY = 200;
    show = true;
    t = 0;
    animationEvents(this, moveY, show);

  },
  //页面滑至底部事件
  onReachBottom: function () {
    // Do something when page reach bottom.
  },


  submitForm(e) {


    const params = e.detail.value

        console.log("-------------------------submitForm params---------------------------------------")
        console.log(params)
        console.log(params.region)
        console.log("-------------------------   areaCode  --------------------------------------")
        console.log(this.data.areaCode)
        console.log("-------------------------分隔线---------------------------------------") 


    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      App.WxService.showModal({
        title: '友情提示',
        content: `${error.msg}`,
        showCancel: !1,
      })
      return false
    }

    
    //验证省市区有没有选择
    if (this.data.areaCode == '000000') {
      App.WxService.showModal({
        title: '友情提示',
        content: `请选择省、市、区`,
        showCancel: !1,
      })
      return false
    }

  


    //保存数据

    //var addressId = e.target.dataset.addressid;

    const paramsData = {

      consignee: params.consignee,
      address: params.address,
      mobile: params.mobile,
      area_desc: params.region,
      area_id: this.data.areaCode,
      consumer_id: App.globalData.memberInfo.member_id,
      //address_id: this.data.addressId,
    }

    var data = {
      url_type: 'member',
      app_token: App.globalData.app_token,
      security_code: App.globalData.security_code
    }



    if (this.data.addressId == '0000') {//新增收货地址

      paramsData.is_major_addr = 'N'
      //新增收货地址接口
      data.service = 'member.consumerAddressCreate'
      data.params = JSON.stringify(paramsData)


    } else {//编辑

      paramsData.address_id = this.data.addressId
      //编辑收货地址接口
      data.service = 'member.consumerAddressEdit'
      data.params = JSON.stringify(paramsData)
    }

    console.log("********************************************")
    console.log(paramsData)
    console.log("********************************************")

    api.reqData({
      data,
      success: (res) => {
        console.log("返回 res.data>>>" + res.data);
        var resData = res.data;
        console.log(resData);

        wx.navigateBack({
          delta: 1
        })

      },
      fail: (res) => {
        console.log(res.data);
      }
    })   

this.setData({
      disabled: true
    })
    // App.HttpService.postAddress(params)
    /**
		this.address.saveAsync(params)
		.then(res => {
            const data = res.data
            console.log(data)
			if (data.meta.code == 0) {
				this.showToast(data.meta.message)
			}
		})
     */


    /**
    App.WxService.redirectTo('/pages/address/list/index')
     */

  },





  showToast(message) {
    App.WxService.showToast({
      title: message,
      icon: 'success',
      duration: 1500,
    })
      .then(() => App.WxService.navigateBack())
  },

  //选择地点
  chooseLocation() {
    App.WxService.chooseLocation()
      .then(data => {
        
        
        
        console.log("#################################################")
        console.log("#################################################")
        console.log(data)
        console.log("#################################################")



        this.setData({
          //'form.address': data.address，
          address:data.address
        })
      })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    this.setData({
            disabled: false
    })
  },

})


//end Page()













// ---------------- 分割线 ---------------- 



//动画事件
function animationEvents(that, moveY, show) {
  console.log("moveY:" + moveY + "\nshow:" + show);
  that.animation = wx.createAnimation({
    transformOrigin: "50% 50%",
    duration: 400,
    timingFunction: "ease",
    delay: 0
  }
  )
  that.animation.translateY(moveY + 'vh').step()


  that.setData({
    animation: that.animation.export(),
    show: show
  })


}


//获取省份数据
function getProvinceData(that) {
  var s;
  provinces = [];
  var num = 0;
  for (var i = 0; i < areaInfo.length; i++) {
    s = areaInfo[i];
    if (s.di == "00" && s.xian == "00") {
      provinces[num] = s;
      num++;
    }
  }
  that.setData({
    provinces: provinces
  })

  //初始化调一次
  getCityArr(0, that);
  getCountyInfo(0, 0, that);
  that.setData({

    //province: "北京市",
    //city: "市辖区",
    //county: "东城区",

    province: "省、",
    city: "市、",
    county: "区",


  })

}

// 获取地级市数据
function getCityArr(count, that) {
  var c;
  citys = [];
  var num = 0;
  for (var i = 0; i < areaInfo.length; i++) {
    c = areaInfo[i];
    if (c.xian == "00" && c.sheng == provinces[count].sheng && c.di != "00") {
      citys[num] = c;
      num++;
    }
  }
  if (citys.length == 0) {
    citys[0] = { name: '' };
  }

  that.setData({
    city: "",
    citys: citys,
    value: [count, 0, 0]
  })
}

// 获取区县数据
function getCountyInfo(column0, column1, that) {
  var c;
  countys = [];
  var num = 0;
  for (var i = 0; i < areaInfo.length; i++) {
    c = areaInfo[i];
    if (c.xian != "00" && c.sheng == provinces[column0].sheng && c.di == citys[column1].di) {
      countys[num] = c;
      num++;
    }
  }
  if (countys.length == 0) {
    countys[0] = { name: '' };
  }

  that.setData({
    county: "",
    countys: countys,
    value: [column0, column1, 0]
  })
}
