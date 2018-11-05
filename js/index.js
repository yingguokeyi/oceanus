window.jsel = JSONSelect;
var seckillid='';
window.onload = function() {
	function accDiv(arg1, arg2) {
		var t1 = 0,
			t2 = 0,
			r1, r2;
		try {
			t1 = arg1.toString().split(".")[1].length;
		} catch(e) {}
		try {
			t2 = arg2.toString().split(".")[1].length;
		} catch(e) {}
		with(Math) {
			r1 = Number(arg1.toString().replace(".", ""));
			r2 = Number(arg2.toString().replace(".", ""));
			return(r1 / r2) * pow(10, t2 - t1);
		}
	}
	var swiper = new Swiper('header .swiper-container', {
		spaceBetween: 30,
		centeredSlides: true,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		observer: true, //调完接口不能翻页解决方法，修改swiper自己或子元素时，自动初始化swiper  
		observeParents: true, //调完接口不能翻页解决方法，修改swiper的父元素时，自动初始化swiper 

	});
	$.ajax({
		url: domain_name_url + "/index",
		type: "GET",
		dataType: "jsonp", //指定服务器返回的数据类型
		data: {
			method: 'getAdvertBanner',
			page_location:'1',
			url_type:'index'
		},
		success: function(data) {
			if(data.success == 1) {
				var res = data.result.rs[0].result.result.rs;
				var imgList = '' //顶部轮播图
				for(var i=0; i<res.length;i++){
					//顶部轮播图
					imgList += '<div class="swiper-slide">';
					imgList += '<img src='+res[i].image+' onclick="linkPage(' + res[i].category + ',' + res[i].url_link + ')" alt="" />';
					imgList += '</div>';
					
				}
				$('#lunboIdIn').html(imgList); //顶部轮播图

			} else {
				//alert("返回失败！");
			}

		}

	});
	// 秒杀时间
    $.ajax({
		url:domain_name_url + "/recommen",
		type:"GET",
		dataType:"jsonp",
		data:{
			method:'getColumnListInfo',
			url_type:'recommen',
		},
		success: function(data) {
			// console.log(data)
			var that = this;
			var resultLis =data.result.rs;
			var listhtml = '';
			var message = resultLis[0].planGroup0.message;
			if(message == 1 ){
				//  获取id
				seckillid = resultLis[0].planGroup0.seckillid;
				//console.log(seckillid)
				//获取时间
				
				//开始时间
				var sekillStartTime = resultLis[0].planGroup0.sekillStartTime;
				var startTimetm = "20" + sekillStartTime.substring(0, 2) + "/" + sekillStartTime.substring(2, 4) + "/" + sekillStartTime.substring(4, 6) + " " + sekillStartTime.substring(6, 8) + ":" + sekillStartTime.substring(8, 10) + ":" + sekillStartTime.substring(10, 12);
				var startDate = new Date(startTimetm).getTime();
				//结束时间
				var sekillEndTime = resultLis[0].planGroup0.sekillEndTime;
				sekillEndTime = "20" + sekillEndTime.substring(0, 2) + "/" + sekillEndTime.substring(2, 4) + "/" + sekillEndTime.substring(4, 6) + " " + sekillEndTime.substring(6, 8) + ":" + sekillEndTime.substring(8, 10) + ":" + sekillEndTime.substring(10, 12);
				var endTDate = new Date(sekillEndTime).getTime();
				//获取系统当前时间
				var currentDate = new Date();
				    currentDate = currentDate.getTime()
				//秒抢的开始时间
				var newTime = sekillStartTime.substring(6, 8) + ":" + sekillStartTime.substring(8, 10) + ':' + sekillStartTime.substring(10, 12);
				//时间段要注意两种情况一种是刚进来就已经开始倒计时，还有就是到页面还没有倒计时，就用结束的时间减去当前的时间
				var totalSecond;
				var totalSeconds;//还没有倒计时
				   //秒抢开始时间减去当前时间就是当前时间到开始倒计时之间的时间段
				var startSecond = startDate - currentDate;
				if (startSecond <= 0) {//已经在倒计时了
					totalSecond = parseInt((endTDate - currentDate) / 1000);
					setTimeout(function () {
						             countdown(totalSecond)
						           }, startSecond)

				}else if (startSecond > 0) {//还没有倒计时
					totalSeconds = parseInt((endTDate - startDate) / 1000);
					console.log(totalSeconds,'78')
					var howmany = parseInt(startSecond / 1000);//当前时间到开始倒计时之间的时间段
					countdowns(howmany)
					//倒计时开始时间
					  setTimeout(function () {
						countdowns(totalSeconds)
						}, startSecond) 
						
				}
				
			    listhtml+='<image class="word"  src='+resultLis[0].planGroup0.imagePath+' alt=""/>'
						+'<div class="bonus_s">'+newTime+'开抢</div>'	
				$(".bonus").html(listhtml);
			}else if(message == 2){
				listhtml+='<image class="word"  src='+resultLis[0].planGroup0.imagePath+' alt="" />'
				         +'<div class="bonus_s">今日场次已结束</div>'	
					$(".bonus").html(listhtml)
					$('.countdown').css("display","none");
					$('.partition').css("display","none");
					$('.sec').css("display","none");
			}else if(message == 3){
				$("#show").css("display","none");
				$(".goods_bottom").css("display","none");
			}
		}
	});
	
	// 秒杀商品
	/*套餐推荐 grounpID=3*/
	/*free模式*/
	var myswiper = new Swiper('.goods_bottom .swiper-container', {
		slidesPerView: 6,
		spaceBetween: 30,
		freeMode: true,
		// 如果需要前进后退按钮
		// nextButton: '.swiper-button-next',
		// prevButton: '.swiper-button-prev',
		pagination: '.swiper-pagination',
		observer: true, //修改swiper自己或子元素时，自动初始化swiper 
		observeParents: true, //修改swiper的父元素时，自动初始化swiper 
		onSlideChangeEnd: function(swiper) {
			swiper.update(); //swiper更新
		}
	});
	$.ajax({
		url: domain_name_url + "/index",
		type: "GET",
		dataType: "jsonp", //指定服务器返回的数据类型
		data: {
			method: 'getBanner',
			url_type:'index',
		},
		success: function(data) {
			console.log(data,'56')
			var list = data.result.rs;
			var listhtml = '';
			for(var i = 0; i < list.length; i++) {
				var plan_group = list[i].plan_group;
				if(plan_group==1){
					listhtml += '<div class="swiper-slide">'
					    +'<div onclick="logout()"  class="swiper-slide_a">'
						+'<img src=' + list[i].image + ' alt="">'
						+'<div class="setMeal-text">￥' +((list[i].market_price)/100).toFixed(2) + '</div>'
						+'<div class="setMeal-textt">￥' +((list[i].original_price)/100).toFixed(2) + '</div>'
					   +'</div>' 
			           +'</div>';
	                  $(".goods_bottom .swiper-wrapper").html(listhtml);
				}
				
			}
		}
	});
}; 
// 跳转到限时秒杀列表
function logout(){ 
	sStorage = window.localStorage; //本地存题目
	sStorage.seckillId=seckillid;
	window.location.href="secondsToTakeGoods.html?seckillId=" +seckillid;
};
function linkPage(category, url_link) {
	if(category == 1) {
		sStorage = window.localStorage; //本地存题目
		sStorage.uri_goods = url_link;
		location.href = 'goods_details.html?spuId=' + url_link;
	} else if(category == 2) {
		sStorage = window.localStorage; //本地存题目
		sStorage.uri_list = url_link;
		location.href = 'goods_list.html?dictDataValue=' + url_link;
	} else if(category == 3) {
		
	}
}
var page;
var urlStatus;
page = 1;
//商品分类接口
function ask(page,urlStatus){
	$.ajax({
	    url: domain_name_url + "/classify",
	    type: "GET",
	    dataType: "jsonp", //指定服务器返回的数据类型
	    data: {
	        method:'getPddGoodsByMenu',
	        page:page,
	        limit:12,
	        menuId:urlStatus,
	        url_type:'classify'
	    },
	    success: function(data) {
	    	if(data.success==1){
	    		var res = data.result.rs[0].pddGoods.result.rs;
	    		var totalStatusOrder = data.result.rs[0].pddGoods.result.total;
	    		if(res.length!=0){
		        	var goodListHtml = '';
		        	for(var i=0;i<res.length;i++){
				    	var startTime = res[i].coupon_start_time;
				    	var endtime = res[i].coupon_end_time;
				    	var desc = res[i].goods_desc.replace(/[\r\n\s\+\&]/g,"");
				    	var descs = desc.replace(/<.*?>/ig,"");
				    	// console.log(descs)
				    	if(descs.indexOf('>>>>>>>>>>>') ==-1){
				    		descs.replace('>>>>>>>>>>>','');
				    		var descss = descs.replace('>>>>>>>>>>>','');
				    		// console.log(descss)
				    		if(descss.indexOf('>') ==-1){
				    			var descsss = descss.replace('>','');
				    		}
				    	}
				        goodListHtml += '<li class="product" data-id='+res[i].goods_id+' data-source='+res[i].source_code+' data-name='+res[i].goods_name+' data-endtime='+endtime+' data-startime='+startTime+' data-img='+res[i].goods_gallery_urls+' data-price='+res[i].min_group_price+' data-dprice='+res[i].coupon_discount+' data-jprice='+(res[i].min_group_price-res[i].coupon_discount)+' data-num='+res[i].sold_quantity+'  data-desc='+descsss+' >';
				        goodListHtml += '<p class="allGoods_img">';
				        goodListHtml += '<img src='+res[i].goods_thumbnail_url+' >';
				        goodListHtml += '</p>';
				        goodListHtml += '<p class="allGoods_title">'+res[i].goods_name+'</p>';
				        goodListHtml += '<p class="allGoods_price">';
				        goodListHtml += '<span style="float:left;">';
				        goodListHtml += '<span class="allGoods_price_init">券后</span>';
				        goodListHtml += '<span class="allGoods_price_num">￥'+((res[i].min_group_price-res[i].coupon_discount)/100).toFixed(2)+'</span>';
				        goodListHtml += '</span>';
				        goodListHtml += '<span style="float:right;">';
				        goodListHtml += '<del style="color:#999">原价:￥'+(res[i].min_group_price/100).toFixed(2)+'</del>';
				        goodListHtml += '</span>';
				        goodListHtml += '</p>';
				        goodListHtml += '<p class="allGoods_discount">';
				        goodListHtml += '<span style="float:left; position:relative; width:.9rem;height:.29rem;">';
				        goodListHtml += '<img src="img/quan.png" style="width:100%;height:100%;">';
				        goodListHtml += '<span class="allGoods_discount_reduce">'+res[i].coupon_discount/100+'元券</span>';
				        goodListHtml += '</span>';
				        goodListHtml += '<span style="float:right;color:#999;font-size:.2rem;">'+res[i].sold_quantity+'人购买</span>'
				        goodListHtml += '</p></li>';
				    }
				    if(12*page>12){
				   		$('#orderContent ul').append(goodListHtml);
				    }else{
				   		$('#orderContent ul').html(goodListHtml);
				    }
			    	proClick();
		    	}
	    	}
	    }
	})
}
// 商品导航栏
$.ajax({
    url: domain_name_url + "/classify",
    type: "GET",
    dataType: "jsonp", //指定服务器返回的数据类型
    data: {
        method:'getPddMenu',
        page:page,
        limit:12,
        url_type:'classify'
    },
    success: function(data) {
	    if(data.success==1){
	    	// 导航条
	    	var menuRes = data.result.rs[1].pddMenu.result.rs;
	    	var menuListHtml = '';
	    	urlStatus = menuRes[0].opt_id;
	    	for(var i=0;i<menuRes.length;i++){
	    		var opt_id = menuRes[i].opt_id;
	    		menuListHtml += '<li style="margin-left: 0px; margin-right: 0px;" status='+opt_id+'>';
	    		menuListHtml += '<a href="javascript:void(0)">'+menuRes[i].opt_name+'</a>';
	    		menuListHtml += '</li>';
	    	}
	    	$('.scroller ul').html(menuListHtml);
	    	$('.scroller ul').find('li:first-child').addClass('cur');
	    	ask(1,urlStatus);
		    $.fn.navbarscroll = function (options) {
		        //各种属性、参数
		        var _defaults = {
		            className:'cur', //当前选中点击元素的class类名
		            clickScrollTime:300, //点击后滑动时间
		            duibiScreenWidth:0.4, //单位以rem为准，默认为0.4rem
		            scrollerWidth:3, //单位以px为准，默认为3,[仅用于特殊情况：外层宽度因为小数点造成的不精准情况]
		            defaultSelect:0, //初始选中第n个，默认第0个
		            fingerClick:0, //目标第0或1个选项触发,必须每一项长度一致，方可用此项
		            endClickScroll:function(thisObj){}//回调函数
		        }
		        var _opt = $.extend(_defaults, options);
		        this.each(function () {
		            //插件实现代码
		            var _wrapper = $(this);
		            var _win = $(window);
		            var _win_width = _win.width(),_wrapper_width = _wrapper.width(),_wrapper_off_left = _wrapper.offset().left;
		            var _wrapper_off_right=_win_width-_wrapper_off_left-_wrapper_width;
		            var _obj_scroller = _wrapper.children('.scroller');
		            var _obj_ul = _obj_scroller.children('ul');
		            var _obj_li = _obj_ul.children('li');
		            var _scroller_w = 0;
		            _obj_li.css({"margin-left":"0","margin-right":"0"});
		            for (var i = 0; i < _obj_li.length; i++) {
		                _scroller_w += _obj_li[i].offsetWidth;
		            }
		            _obj_scroller.width(_scroller_w+_opt.scrollerWidth);
		            var myScroll = new IScroll('#'+_wrapper.attr('id'), {
		                eventPassthrough: true,
		                scrollX: true,
		                scrollY: false,
		                preventDefault: false
		            });
					_init(_obj_li.eq(_opt.defaultSelect));
					// 点击切换
		            _obj_li.click(function(){
		            	page = 1;
						urlStatus = $(this).attr("status");						
						_init($(this));						
		                if($('#list #retr').hasClass('active')){
							$('html,body').animate({
								scrollTop: $("#orderContent").offset().top,
								duration:0
							}, 0);
						}
						ask(page,urlStatus);					
					});
					
		            //解决PC端谷歌浏览器模拟的手机屏幕出现莫名的卡顿现象，滑动时禁止默认事件（2017-01-11）
		            _wrapper[0].addEventListener('touchmove',function (e){e.preventDefault();},false);
		            function _init(thiObj){
		                var $this_obj=thiObj;
		                var duibi=_opt.duibiScreenWidth*_win_width/10,this_index=$this_obj.index(),this_off_left=$this_obj.offset().left,this_pos_left=$this_obj.position().left,this_width=$this_obj.width(),this_prev_width=$this_obj.prev('li').width(),this_next_width=$this_obj.next('li').width();
		                var this_off_right=_win_width-this_off_left-this_width;
		                if(_scroller_w+2>_wrapper_width){
		                    if(_opt.fingerClick==1){
		                        if(this_index==1){
		                            myScroll.scrollTo(-this_pos_left+this_prev_width,0, _opt.clickScrollTime);
		                        }else if(this_index==0){
		                            myScroll.scrollTo(-this_pos_left,0, _opt.clickScrollTime);
		                        }else if(this_index==_obj_li.length-2){
		                            myScroll.scrollBy(this_off_right-_wrapper_off_right-this_width,0, _opt.clickScrollTime);
		                        }else if(this_index==_obj_li.length-1){
		                            myScroll.scrollBy(this_off_right-_wrapper_off_right,0, _opt.clickScrollTime);
		                        }else{
		                            if(this_off_left-_wrapper_off_left-(this_width*_opt.fingerClick)<duibi){
		                                myScroll.scrollTo(-this_pos_left+this_prev_width+(this_width*_opt.fingerClick),0, _opt.clickScrollTime);
		                            }else if(this_off_right-_wrapper_off_right-(this_width*_opt.fingerClick)<duibi){
		                                myScroll.scrollBy(this_off_right-this_next_width-_wrapper_off_right-(this_width*_opt.fingerClick),0, _opt.clickScrollTime);
		                            }
		                        }
		                    }else{
		                        if(this_index==1){
		                            myScroll.scrollTo(-this_pos_left+this_prev_width,0, _opt.clickScrollTime);
		                        }else if(this_index==_obj_li.length-1){
		                            if(this_off_right-_wrapper_off_right>1||this_off_right-_wrapper_off_right<-1){
		                                myScroll.scrollBy(this_off_right-_wrapper_off_right,0, _opt.clickScrollTime);
		                            }
		                        }else{
		                            if(this_off_left-_wrapper_off_left<duibi){
		                                myScroll.scrollTo(-this_pos_left+this_prev_width,0, _opt.clickScrollTime);
		                            }else if(this_off_right-_wrapper_off_right<duibi){
		                                myScroll.scrollBy(this_off_right-this_next_width-_wrapper_off_right,0, _opt.clickScrollTime);
		                            }
		                        }
		                    }
		                }
		                $this_obj.addClass(_opt.className).siblings('li').removeClass(_opt.className);
		                _opt.endClickScroll.call(this,$this_obj);
		            }
		        });
		    };
			$('.wrapper').navbarscroll();
	    }
	}
});	
//获取滚动条当前的位置
function getScrollTop() {
    var scrollTop = 0;
    if(document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if(document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}
// 获取当前可视范围的高度
function getClientHeight() {
    var clientHeight = 0;
    if(document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
    } else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
    }
    return clientHeight;
}
// tips：Math.min是两个值取最小的值，Math.max则相反。
// 获取文档完整的高度
function getScrollHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}
// 实现下拉刷新
window.onscroll = function(){
	if(getScrollTop() + getClientHeight() == getScrollHeight()) {
		setTimeout(function () {
			page++;
			ask(12*page+1,urlStatus);
		},0)
	}
	var navH = $("#list").offset().top;
	var scroH = $(this).scrollTop();
	if(scroH>=navH){
		$("#list #retr").addClass('active')
	
	}else if(scroH<navH){
		$("#list #retr").removeClass('active');
	}

	// 回到顶部
	if($(window).scrollTop() > 800) {
		$('.go_top').fadeIn(300);
	} else {
		$('.go_top').fadeOut(200);
	}
	$('.go_top').click(function() {
		$('body,html').animate({
			scrollTop: 0
		}, 300);
	})
}

//点击商品中的li
function proClick(){
	$('.product').click(function(){
		var id = $(this).data('id'); //商品id
		var img = JSON.stringify($(this).data('img')); //商品图片
		var name = $(this).data('name'); //商品名称
		var desc = $(this).data('desc'); //商品介绍
		var num = $(this).data('num'); //商品已售数量
		var price = $(this).data('price'); //商品价格
		var dprice = $(this).data('dprice'); //商品优惠券价格
		var jprice = $(this).data('jprice'); //商品优惠后价格
		var source = $(this).data('source'); //商品来源
		var startTime = $(this).data('startime'); //优惠开始时间
		var endTime = $(this).data('endtime'); //优惠结束时间
		sStorage = window.localStorage; //本地存题目
		sStorage.Pid = id;
		sStorage.Pimg = img;
		sStorage.Pname = name;
		sStorage.Pdesc = desc;
		sStorage.Pnum = num;
		sStorage.Pprice = price;
		sStorage.Psource = source;
		sStorage.Pdprice = dprice;
		sStorage.Pjprice = jprice;
		sStorage.PstartTime = startTime;
		sStorage.PendTime = endTime;
		location.href = 'pdd/product_details.html?spuId=' + id;
	})
}
/*点击切换增加class样式*/
$(".footer_ul li").click(function() {
    $(this).children("a").addClass("style").parent().siblings().find("a").removeClass("style");
});
//获取当前定位城市
var localName = localStorage.getItem('cityName');
// console.log(localName)
$('.city').html(localName);
//  倒计时方法---已经开始
function countdown (totalSecond){
	console.log(totalSecond,'pp')
    var that=this;
    clearInterval(that.interval);
    that.interval = setInterval(function () {
	    // 总秒数
	    var second = totalSecond;
	    // 天数位
	    var day = Math.floor(second / 3600 / 24);
	    var dayStr = day.toString();
	    if (dayStr.length == 1) dayStr = '0' + dayStr;
	    // 小时位
	    var hr = Math.floor((second - day * 3600 * 24) / 3600);
	    var hrStr = hr.toString();
	    if (hrStr.length == 1) hrStr = '0' + hrStr;
	    // 分钟位
	    var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
	    var minStr = min.toString();
	    if (minStr.length == 1) minStr = '0' + minStr;
	    // 秒位
	    var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;;
	    var secStr = sec.toString();
		if (secStr.length == 1) secStr = '0' + secStr;
		//将倒计时赋值到div中
	    document.getElementById("_h").innerHTML = hrStr;  
		document.getElementById("_m").innerHTML = minStr;  
		document.getElementById("_s").innerHTML = secStr; 
	    totalSecond--;
	    if (totalSecond <= 0) {
	        clearInterval(that.interval);
			// hrStr="00";
			// minStr="00";
			// secStr="00";

	    }
    }.bind(that), 1000);

}
// 倒计时方法---还没开始
function countdowns (totalSeconds){
	console.log(totalSeconds,'98')
    var that=this;
    clearInterval(that.intervals);
    that.intervals = setInterval(function () {
	    // 总秒数
	    var second = totalSeconds;
	    // 天数位
	    var day = Math.floor(second / 3600 / 24);
	    var dayStr = day.toString();
	    if (dayStr.length == 1) dayStr = '0' + dayStr;
	    // 小时位
	    var hr = Math.floor((second - day * 3600 * 24) / 3600);
	    var hrStr = hr.toString();
	    if (hrStr.length == 1) hrStr = '0' + hrStr;
	    // 分钟位
	    var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
	    var minStr = min.toString();
	    if (minStr.length == 1) minStr = '0' + minStr;
	    // 秒位
	    var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;;
	    var secStr = sec.toString();
		if (secStr.length == 1) secStr = '0' + secStr;
		//将倒计时赋值到div中
	    document.getElementById("_h").innerHTML = hrStr;  
		document.getElementById("_m").innerHTML = minStr;  
		document.getElementById("_s").innerHTML = secStr; 
	    totalSeconds--;
	    if (totalSeconds <= 0) {
	        clearInterval(that.intervals);
			// hrStr="00";
			// minStr="00";
			// secStr="00";

	    }
    }.bind(that), 1000);

}
$('.search_new').click(function(){
	window.location.href='personal/message.html';
})