window.jsel = JSONSelect;
var runningStatus='';//全局的runing_status
var RunningStatus1='';//resultList[0].runing_status
var RunningStatus2='';//resultList[1].runing_status

 //判断秒抢时间的id
 var id1='';
 var id2='';
var seckillId = localStorage.getItem('seckillId'); //从首页传过来的id
window.onload = function() {

// 开抢时间
  openworking(seckillId);

// 限时秒抢商品
  product(seckillId,runningStatus);

  // 点击判断选择那个时间段
  $('#time').on('click','li',function(){
    var seckillId = $(this).attr('data-id');
    var runningStatus = $(this).attr('data-status');
    $(this).css('background','#ff99a3');
    $(this).siblings().css('background','#ffc2c8');

    product(seckillId,runningStatus)
  })
};
// 开抢时间
 function openworking(seckillId){
   var correr = seckillId;
      $.ajax({
      url: domain_name_url + "/recommen",
      type: "GET",
      dataType: "jsonp", //指定服务器返回的数据类型
      data: {
        method: 'getSeckillTimeList',
        url_type:'recommen'
      },
      success: function(data) {
        var resultList =data.result.rs;
      
        $('#tab1').attr('data-id',resultList[0].id);
        $('#tab2').attr('data-id',resultList[1].id);
        $('#tab1').attr('data-status',resultList[0].runing_status);
        $('#tab2').attr('data-status',resultList[1].runing_status);

        //  首页传进来的id和getSeckillTimeList里的id进行判断，拿到当前的状态值
        for(var i=0 ; i < resultList.length; i ++){
               if(correr == resultList[i].id){
                runningStatus = resultList[i].runing_status;
                product(seckillId,runningStatus); 
               }  
                
        }
         // 遍历id进行判断相等就让那个按钮的颜色改变和显示内容
        for(var i=0 ; i < resultList.length; i ++){
          var llis = document.getElementsByTagName("li");
                var divs = document.getElementsByClassName("tab_css");
              
                for(var i = 0; i < llis.length; i++) {
                  var lli = llis[i];
                  if(seckillId == resultList[i].id){
                    lli.style.backgroundColor = "#ff99a3";
                }
            }
            for(var i = 0; i < divs.length; i++) {
              var divv = divs[i];
              if(seckillId == resultList[i].id){ 
                divv.style.display = "block";
              
              } 
            }
        }
        // 获取不同场次时间段的id
        id1 = resultList[0].id;//上半场的id
        id2 = resultList[1].id;//下半场的id
        // 判断商品显示什么状态
        RunningStatus1= resultList[0].runing_status;
        RunningStatus2= resultList[1].runing_status;
        // 秒抢的时间
        var nowTime = resultList[0].start_time;
        var quickTime = resultList[1].start_time;

        nowTime = nowTime.substring(6, 8) + ":" + nowTime.substring(8, 10) + ':' + nowTime.substring(10, 12);
        quickTime = quickTime.substring(6, 8) + ":" + quickTime.substring(8, 10) + ':' + quickTime.substring(10, 12); 
        document.getElementById("tab1").innerHTML = nowTime + '<text  style="color:#fff;font-size:0.27rem;">开抢</text>'; 
        document.getElementById("tab2").innerHTML = quickTime + '<text  style="color:#fff;font-size:0.27rem;">开抢</text>';
      }

      });
    
}

 // 限时秒抢商品
function product(seckill,runningStatus){
      $.ajax({
        url: domain_name_url + "/recommen",
        type: "GET",
        dataType: "jsonp", //指定服务器返回的数据类型
        data: {
          method: 'getSeckillGoodsList',
          seckillId:seckill,
          url_type:'recommen'
        },
        success: function(data) {
          console.log(data,'45')
          var productList = data.result.rs;
          var productHtml='';
          var vacantDiv ='';
          var divs = document.getElementsByClassName("tab_css");
        if(productList!=''){
          for(var i = 0; i < divs.length; i++) {
            var divv = divs[i];
                for(var i = 0; i < productList.length; i++){
                        productHtml+='<div class="cargo-list"  onclick="linkPage(' + productList[i].category + ',' + productList[i].uri + ',' + productList[i].market_price + ')">';
                        productHtml+='<div class="cargo-pro-image">';
                        productHtml+='<img src='+productList[i].image+' />'
                        productHtml+='</div>';
                        productHtml+='<div class="cargo-solid">';
                        productHtml+='<div class="cargo-pro-list">';
                        productHtml+='<div class="cargo-pro-title">';
                        productHtml+='<text class="cargo-pro-texts">'+productList[i].spu_name+'</text>';
                        productHtml+='</div>';
                        productHtml+='<div class="cargo-pro-desc">';
                        productHtml+='<text> '+productList[i].first_attribute+' '+productList[i].second_attribute+'</text>';
                        productHtml+='</div>'
                        productHtml+='<div class="cargo-pro-money">';
                        productHtml+='<text class="cargo-pro-price">￥' +((productList[i].market_price)/100).toFixed(2) + '</text>';
                        productHtml+='<text class="cargo-pro-cancel">￥' +((productList[i].original_price)/100).toFixed(2) + '</text>';
                        productHtml+='</div>';
                        productHtml+='</div>';

                          if(runningStatus==1){
                            productHtml+='<div class="keypads">未到时间</div>';
                          }
                          if(runningStatus==2){
                            if(productList[i].stock != 0){
                            productHtml +='<div class="keypad">立即购买</div>';
                            }else if(productList[i].stock == 0){
                              productHtml+='<div class="keypads">已售完</div>';
                            }
                          }
                        
                          if(runningStatus==3){
                            productHtml+='<div class="keypads">已结束</div>';
                          }

                    
                        productHtml+='</div>';
                        productHtml+='</div>';
                }
                
                $('.chunk').html(productHtml);
                divv.style.display = "block";
          }
        }else if(productList ==''){
          vacantDiv+='<div>本场次下暂时没有活动商品哦！</div>';
          $('.boring').html(vacantDiv);
          // document.getElementsByClassName("boring").innerHTML =  ' 本场次下暂时没有活动商品哦！';
        }
            
        }

      });
    
} 
  // 判断跳转到商品详情页的方法
  function linkPage(category, url_link,market_price) {
    if(category == 1) {
      sStorage = window.localStorage; //本地存题目
      sStorage.uri_goods = url_link;
      sStorage.market_prices = market_price;
      location.href = 'goods_details.html?spuId=' + url_link +'&primeCost='+market_price;
    } else if(category == 2) {
      sStorage = window.localStorage; //本地存题目
      sStorage.uri_list = url_link;
      location.href = 'goods_list.html?dictDataValue=' + url_link;
    } else if(category == 3) {
      
    }
  }
  
