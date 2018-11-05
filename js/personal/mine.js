var token = localStorage.getItem('token');
var da_login = localStorage.getItem("da_login");
// var member_level='';
if(token == null) {
	$('#third_a').show();
	layer.open({
		type: 1,
		content: $('.warm').html(),
		anim: 'up',
		scrollbar: false,
		shadeClose: false,
		style: 'position:fixed;bottom:50%;left: 8%; right:8%;height: auto;border:none;border-radius:6px'
	});
	$(document).on("click", ".warm_login", function(){
		window.location.href = 'login.html';
	});
	$(document).on("click", ".warm_cancel", function() {
		layer.closeAll('page');
	});
	$(document).on("click", ".hea_ul", function(){
		window.location.href = 'login.html';
	});
}else{
	$.ajax({
		url: domain_name_url + "/myself",
		type: "GET",
		dataType: "jsonp", //指定服务器返回的数据类型
		data: {
			method: 'inviteFriends',
			token: token,
			url_type:"myself"
		},
		success: function(data) {
			// console.log(data)
			if(data.success==1){
				$('#third_a').hide();
				$('#nickname').show();
				$('.sec_span').show();
				$('#grade').show();
				var data_zong = data.result.rs[0];
				var inviteCode = data_zong.inviteCode;
				var InvitationCode = inviteCode[0].InvitationCode;
				$('#nickname').html(InvitationCode);
				$('.sec_span i').html(InvitationCode);
				localStorage.setItem('InvitationCode',data_zong.inviteCode[0].InvitationCode);
			}else if(data.success==2){
				$('#third_a').show();
				$('#nickname').hide();
				$(document).on("click", "#third_a", function(){
					$('#third_a').css('cursor','pointer');
					window.location.href = 'login.html';
				});
			}

		},
		error:function(){
			
		}

	});
	//判断是普通会员？小掌柜？大掌柜？
	$.ajax({
		url: domain_name_url + "/myself",
		type: "GET",
		dataType: "jsonp", //指定服务器返回的数据类型
		data: {
			method: 'getMemberLevel',
			token: token,
			url_type:"myself"
		},
		success: function(data) {
			if(data.success==1){
				var meRes = data.result.rs[0].result.result.rs;
				if(meRes.length!=0){
					var member_level = meRes[0].member_level;
					localStorage.setItem("member_level", meRes[0].member_level);
					if(member_level ==1){
						$('.third_span i').html('普通会员');
					}
					if(member_level ==2){
						$('.third_span i').html('小掌柜');
					}
					if(member_level ==3){
						$('.third_span i').html('大掌柜');
					}
				}
			}

		}
	})
	//粉丝人数
	$.ajax({
		url: domain_name_url + "/myself",
		type: "GET",
		dataType: "jsonp", //指定服务器返回的数据类型
		data: {
			method: 'getLevelCount',
			token: token,
			url_type:"myself"
		},
		success: function(data) {
			if(data.success==1){
				var fanCount = data.result.rs[0].result.result.rs;
				if(fanCount.length != 0){
					$('#regular_member span').html(fanCount[0].levelA);
					$('#small_shopkeeper span').html(fanCount[0].levelB);
					$('#big_shopkeeper span').html(fanCount[0].levelC);
				}
			}
		}
	})	
	// 跳转个人中心页面	
	$(document).on('click','#fir_per',function(){
		window.location.href = 'personal/per_details.html';
	})
	// 跳转等级页面
	$(document).on('click','#grade',function(){
		window.location.href = 'personal/my_grades.html';
	})
}
//消息
$(document).on("click", ".unopen", function() {
	if(da_login == 1) {
		window.location.href = 'personal/message.html';
	} else {
		window.location.href = 'login.html';
	}

});
//钱包
$(document).on("click", ".fun_wallet", function() {
	if(da_login == 1) {
		window.location.href = 'member_html/wallet.html';
	} else {
		window.location.href = 'login.html';
	}

});
//投诉建议
$(document).on("click", ".complaint_login", function() {
	layer.open({
		content: '暂未开放',
		skin: 'msg',
		time: 2 //2秒后自动关闭
	});
});
//联系客服
$(document).on("click", ".relation_login", function() {
	layer.open({
		type: 1,
		content: $('.service').html(),
		anim: 'up',
		scrollbar: false,
		shadeClose: false,
		style: 'position:fixed;bottom:50%;left: 8%; right:8%;height: auto;border:none;border-radius:6px'
	});
	$(document).on("click", ".service_cancel", function() {
		layer.closeAll('page');
	});
})
/*点击切换增加class样式*/
$(".footer_ul li").click(function() {
	$(this).children("a").addClass("style").parent().siblings().find("a").removeClass("style");
});

$(".back_list").click(function() {
	if(da_login == 1) {
		window.location.href = 'personal/apply_stok.html';
	} else {
		window.location.href = 'login.html';
	}

});
$(".yaoqing_login").click(function() {
	if(da_login == 1) {
		window.location.href = 'personal/yaoqing.html';
	} else {
		window.location.href = 'login.html';
	}

});
// 我的订单
$("#order_img").click(function() {
	if(da_login == 1) {
		window.location.href = 'order_list.html?currentType=0';
	} else {
		window.location.href = 'login.html';
	}

});
$(".no_pay").click(function() {
	if(da_login == 1) {
		window.location.href = 'order_list.html?currentType=1';
	} else {
		window.location.href = 'login.html';
	}

});
$(".wait_shou").click(function() {
	if(da_login == 1) {
		window.location.href = 'order_list.html?currentType=2';
	} else {
		window.location.href = 'login.html';
	}

});
$(".yi_ok").click(function() {
	if(da_login == 1) {
		window.location.href = 'order_list.html?currentType=3';
	} else {
		window.location.href = 'login.html';
	}

});
$(".yi_quxiao").click(function() {
	if(da_login == 1) {
		window.location.href = 'order_list.html?currentType=4';
	} else {
		window.location.href = 'login.html';
	}

});
// 我的粉丝
$("#mine_fans").click(function() {
	if(da_login == 1) {
		window.location.href = 'personal/my_fans.html?currentType=0';
	} else {
		window.location.href = 'login.html';
	}

});
$("#regular_member").click(function() {
	if(da_login == 1) {
		window.location.href = 'personal/my_fans.html?currentType=0';
	} else {
		window.location.href = 'login.html';
	}

});
$("#small_shopkeeper").click(function() {
	if(da_login == 1) {
		window.location.href = 'personal/my_fans.html?currentType=1';
	} else {
		window.location.href = 'login.html';
	}

});
$("#big_shopkeeper").click(function() {
	if(da_login == 1) {
		window.location.href = 'personal/my_fans.html?currentType=2';
	} else {
		window.location.href = 'login.html';
	}

});
// 复制功能
var clipboard = new ClipboardJS('.copy');
clipboard.on('success', function(e) {
    // console.log(e);
});

clipboard.on('error', function(e) {
    // console.log(e);
});

