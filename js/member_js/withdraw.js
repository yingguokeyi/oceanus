var balance = localStorage.getItem('balance');
$('#money').html((balance/100).toFixed(2));
$(document).on('click','#all',function(){
	$('#price').val($('#money').html());
	$('#btn').removeAttr('disabled');
	$('#btn').css({'background':'#b61c25','color':'#fff'})
})
$(document).on('click','.right_click',function(){
	layer.open({
		type: 1,
		content: $('.accredit').html(),
		anim: 'up',
		scrollbar: false,
		shadeClose: false,
		style: 'position:fixed;bottom:35%;left: 10%; right:10%;height: auto;border:none;border-radius:6px'
		
	});
	
})
$(document).on("click", ".accredit_allow", function() {
	   // snsapi_base  snsapi_userinfo 第一步用户授权，跳转目标页，在下一页得到code
 // 	var redirect_urls= encodeURIComponent("https://jiangshidi.top/index.html");
 // 	var urls =  "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf2da843fe3bd9967&redirect_uri="+redirect_urls+"&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
	// function mygets() {
	//     window.location.href = urls;
	// }
	// mygets();
	// function getQueryString (name){
 //        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
 //        var r = window.location.search.substr(1).match(reg);
 //        if (r != null) return unescape(r[2]); return null;

 //    }

	// var code = getQueryString('code');
});
$(document).on("click", ".accredit_refuse", function() {
	layer.closeAll('page');

});

