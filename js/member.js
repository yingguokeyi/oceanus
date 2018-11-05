/*点击切换增加class样式*/
$(function(){
	$(".footer_ul li").click(function(){
		$(this).children("a").addClass("style").parent().siblings().find("a").removeClass("style");
	});
});
//判断是不是为会员
// var memberLevel = JSON.parse(localStorage.getItem('memberLevel'));
var token = localStorage.getItem('token');
window.jsel = JSONSelect;
// 邀请码
$.ajax({
	url: domain_name_url + "/myself",
	type: "GET",
	dataType: "jsonp", //指定服务器返回的数据类型
	data: {
		method:'inviteFriends',
        token:token,
		url_type:'myself'
	},
	success: function(data) {
		if(data.success ==1){
			var data_zong = data.result.rs[0];
			var inviteCode = data_zong.inviteCode;
			var InvitationCode = inviteCode[0].InvitationCode;
			var listhtml = '';
				for(var i = 0; i < inviteCode.length; i++) {
					listhtml += '<li class="first">';
					listhtml += '<a href="javascript:;">';
					listhtml += '<img src="img/mine_photo.png" />';
					listhtml += '</a></li>';
					listhtml += '<li class="second">';
					listhtml += '<span class="sec_span first_sec_span">昵称 '+InvitationCode+' ';
					listhtml += '</span>';
					listhtml += '<span class="sec_span">邀请码：'+InvitationCode+'<button class="btn">分享</button></span>';
					listhtml += '</span>';

				}
				$(".hea_ul").html(listhtml);
		}else if(data.success==2){
			
		}
	}
})
// 可提现金额 回填单累计收益
$.ajax({
	url: domain_name_url + "/myself",
	type: "GET",
	dataType: "jsonp", //指定服务器返回的数据类型
	data: {
		method:'findMyself',
        token:token,
		url_type:'myself'
	},
	success: function(data) {
		var rs = data.result.rs[0].result.result.rs;
		if(data.success==1){
			if(rs.length!=0){
				var money = rs[0].money;//可提现金额
				var totalIncome = rs[0].totalIncome;//累计效益
				var totalPreIncome = rs[0].totalPreIncome;//可提现金额
				$('.font_money').html((money/100).toFixed(2));
				$('.withdraw_price span').html((totalPreIncome/100).toFixed(2));
				$('.single_price span').html((totalIncome/100).toFixed(2));
			}else{
				$('.font_money').html('0.00');
				$('.withdraw_price span').html('0.00');
				$('.single_price span').html('0.00');
			}
			
		}
	}
})		
// 收益
$.ajax({
	url: domain_name_url + "/myself",
	type: "GET",
	dataType: "jsonp", //指定服务器返回的数据类型
	data: {
		method:'findMember',
        token:token,
		url_type:'myself'
	},
	success: function(data) {
		if(data.success==1){
			var canPutForward = data.result.rs[0].result.result.rs[0].canPutForward;//可提现金额
			var cashBack = data.result.rs[0].result.result.rs[0].cashBack;//返现
			var commission = data.result.rs[0].result.result.rs[0].commission;//佣金
			var orderAmount = data.result.rs[0].result.result.rs[0].orderAmount;//订单金额
			var orderNum = data.result.rs[0].result.result.rs[0].orderNum;//订单量
			var preMonthMoney = data.result.rs[0].result.result.rs[0].preMonthMoney;//预估本月收入
			var preTodayMoney = data.result.rs[0].result.result.rs[0].preTodayMoney;//预估今日收入
			var putForward = data.result.rs[0].result.result.rs[0].putForward;//提现
			var totalIncome = data.result.rs[0].result.result.rs[0].totalIncome;//累计效益
			var totalPreIncome = data.result.rs[0].result.result.rs[0].totalPreIncome;//累计预估收
			var memberList = '';
			memberList += '<div class="main_bootom">';
			memberList += '<p class="main_bootom_top">我的收入</p>';
			memberList += '<ul class="main_bootom_ul">';
			memberList += '<li>';
			memberList += '<a href="member_html/member_earn.html">';
			memberList += '<span class="main_bootom_ul_span">￥'+(preTodayMoney/10000).toFixed(2)+'</span><br />';
			memberList += '<span class="main_bootom_ul_spansec">今日</span><br />';
			memberList += '<span class="main_bootom_ul_spanthird">预估收入</span>';
			memberList += '</a></li>';
			memberList += '<li>';
			memberList += '<a href="member_html/member_earn.html">';
			memberList += '<span class="main_bootom_ul_span">￥'+(preMonthMoney/10000).toFixed(2)+'</span><br />';
			memberList += '<span class="main_bootom_ul_spansec">本月</span><br />';
			memberList += '<span class="main_bootom_ul_spanthird">预估收入</span>';
			memberList += '</a></li>';
			memberList += '<li>';
			memberList += '<a href="javascript:;" class="style">';
			memberList += '<span class="main_bootom_ul_span">￥0.00</span><br />';
			memberList += '<span class="main_bootom_ul_spansec">累计</span><br />';
			memberList += '<span class="main_bootom_ul_spanthird">实际收益</span>';
			memberList += '</a></li>';
			memberList += '</ul></div>';
			memberList += '<div class="main_top">';
			memberList += '<p class="main_bootom_top">分享赚钱</p>';
			memberList += '<ul class="main_top_ul">';
			memberList += '<li>';
			memberList += '<a href="member_html/click_num.html">';
			memberList += '<span class="main_top_ul_span">';
			memberList += '<img src="img/member/dianji.png" />';
			memberList += '</span><br />';
			memberList += '<span class="main_top_ul_spansec">点击量</span><br />';
			memberList += '<span class="main_top_ul_spanthird">0</span>';
			memberList += '</a></li>';
			memberList += '<li>';
			memberList += '<a href="member_html/dingdan_num.html">';
			memberList += '<span class="main_top_ul_span">';
			memberList += '<img src="img/member/ddl.png" />';
			memberList += '</span><br />';
			memberList += '<span class="main_top_ul_spansec">订单量</span><br />';
			memberList += '<span class="main_top_ul_spanthird">'+orderNum+'</span>';
			memberList += '</a></li>';
			memberList += '<li>';
			memberList += '<a href="javascript:;" class="style">';
			memberList += '<span class="main_top_ul_span">';
			memberList += '<img src="img/member/ddje.png" />';
			memberList += '</span><br />';
			memberList += '<span class="main_top_ul_spansec">订单金额</span><br />';
			memberList += '<span class="main_top_ul_spanthird">￥'+(orderAmount/10000).toFixed(2)+'</span>';
			memberList += '</a></li>';
			memberList += '<li>';
			memberList += '<a href="javascript:;" class="style">';
			memberList += '<span class="main_top_ul_span">';
			memberList += '<img src="img/member/fx.png" />';
			memberList += '</span><br />';
			memberList += '<span class="main_top_ul_spansec">分享收益</span><br />';
			memberList += '<span class="main_top_ul_spanthird">￥0.00</span>';
			memberList += '</a></li></ul></div>';
			$('.member').html(memberList);
		
		}else if(data.success==2){
			
		}
	}
})
//为您推荐
// $.ajax({
// 	url: domain_name_url + "/myself",
// 	type: "GET",
// 	dataType: "jsonp", //指定服务器返回的数据类型
// 	data: {
// 		method:'findGiftGoodList',
//            begin: 1,
//    		end: 10,
// 		url_type:'myself'
// 	},
// 	success: function(data) {
// 		if(data.success == 1){
// 			if(memberLevel == 0){
// 				$('.nonmember').show();
// 				var res = data.result.rs[0].searchGiftGoods.result.rs;
// 				var unmemberList = '';
// 				for(var i=0;i<res.length;i++){
// 					unmemberList += '<li>';
// 					unmemberList += '<div class="nomember_left">';
// 					unmemberList += '<img src='+res[i].image+' alt="">';
// 					unmemberList += '</div>';
// 					unmemberList += '<div class="nomember_right">';
// 					unmemberList += '<p class="nomember_right_title">';
// 					unmemberList += '<span class="nomember_vip">VIP礼包</span>';
// 					unmemberList += '<i class="nomember_text">'+res[i].sku_name+'</i>';
// 					unmemberList += '</p>';
// 					unmemberList += '<p class="nomember_size">'+res[i].spu_attribute+'</p>'
// 					unmemberList += '<p class="nomember_price">';
// 					unmemberList += '<span class="nomember_money">￥<i>'+(res[i].market_price/100).toFixed(2)+'</i></span>';
// 					unmemberList += '<button type="button" class="nomember_buy" onclick="linkPage('+res[i].spu_id+')">购买</button>';
// 					unmemberList += '</p></div></li>'
// 				}
				
// 			  $('.nomember_ul').html(unmemberList);
			 
// 			}
// 		}else if(data.success == 2){
			
// 		}
// 	}
// 	})	
// 		function linkPage(spu_id) {
// 	    sStorage = window.localStorage; //本地存题目
// 		sStorage.uri_goods = spu_id;
// 		location.href = 'confirm_order.html?spuId=' + spu_id;
// 	}