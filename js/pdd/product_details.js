var token = localStorage.getItem('token');
var swiper = new Swiper('.swiper-container', {
	pagination: {
		el: '.swiper-pagination',
	},
	observer: true, //修改swiper自己或子元素时，自动初始化swiper
	observeParents: true, //修改swiper的父元素时，自动初始化swiper
	autoplay: true, //自动切换
	onSlideChangeEnd: function(swiper) {
		swiper.update(); //swiper更新
	}
});

var imgs = JSON.parse(localStorage.getItem('Pimg'));
var name = localStorage.getItem('Pname');
var desc = localStorage.getItem('Pdesc');
var num = localStorage.getItem('Pnum');
var price = localStorage.getItem('Pprice');
var dprice = localStorage.getItem('Pdprice');
var jprice = localStorage.getItem('Pjprice');
var startTime = localStorage.getItem('PstartTime');
var endTime = localStorage.getItem('PendTime');
// 轮播图
var listhtml = '';
for(var i = 0; i < imgs.length; i++) {
	listhtml += '<div class="swiper-slide showimg">';
	listhtml += '<img src=' + imgs[i] + ' alt="" class="pimg" />';
	listhtml += '</div>';
}
$(".swiper-wrapper").html(listhtml);
$('.product_intro_img ul').html(listhtml);
// 商品信息
function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = date.getDate() + ' ';
    return Y+M+D;
}
var stime = timestampToTime(startTime);
var etime = timestampToTime(endTime)
$('.product_price i').html((price/100).toFixed(2));
$('.product_num i').html(num);
$('.product_title_txt').html(name);
$('#arch_pr').html(dprice/100);
$('.product_right-price').html((jprice/100).toFixed(2));
$('.startime').html(stime);
$('.endtime').html(etime);
$('.product_intro').html(desc);
// 回到顶部
$(window).scroll(function() {
	if($(window).scrollTop() > 300) {
		$('.go_top').fadeIn(300);
	} else {
		$('.go_top').fadeOut(200);
	}
});
$('.go_top').click(function() {
	$('body,html').animate({
		scrollTop: 0
	}, 300);
})
//回到首页
$(document).on("click", ".go_back", function() {
	window.location.href='../index.html';
})
$(document).on("click", ".go_buy", function() {
	var id = localStorage.getItem('Pid');
	var phoneval = localStorage.getItem('nameval');
	//判断是否登录
	if(token == null) {
		layer.open({
			content: '请先登录',
			skin: 'msg',
			time: 2
		});
		var url = window.location.href;
		setTimeout("location.href='../login.html?url=" + url + "'", 1000);
		localStorage.setItem('url', window.location.href);
	} else {
		//跳转拼多多
		 $.ajax({
		    url: domain_name_url + "/pdd",
		    type: "GET",
		    dataType: "jsonp", //指定服务器返回的数据类型
		    data: {
		        method:'getUrlGenerate',
		        goods_id_list:'['+id+']',
		        phone:phoneval,
		        url_type:'pdd'
		    },
		    success: function(data) {
		    	if(data.success==1){
		    		var mobile_url = data.result.rs[0].result.goods_promotion_url_generate_response.goods_promotion_url_list[0].mobile_url;
		    		console.log(mobile_url);
		    		window.location.href=mobile_url;
		    	}
		    }
		})    
	}
})
