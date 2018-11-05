var token = localStorage.getItem('token');
var parentUserHasMark = JSON.parse(localStorage.getItem('parentUserHasMark'));//上下级
$(function(){
	var parentList = '';
	// 我的邀请码
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
			if(data.success=="1"){
				//我的邀请码
				var data_zong = data.result.rs[0];
				var inviteCode = data_zong.inviteCode;
				var InvitationCode = inviteCode[0].InvitationCode;
				var codeList = '';
					codeList += '<span>'+InvitationCode+'</span>'
				$('.invite_code').html(codeList);
				var orderList = data.result.rs[1];
				if(orderList != '{}'){
					var orderListRes = orderList.OrderList;
					var timeList = [];//时间
					var lowerList = '';
					for(var i=0; i<orderListRes.length;i++){
						var num = orderListRes[i].beInvite_date     //拼接时间
			            var str = "20" + num
			            var str1 = str.substr(0, 4)
			            var str2 = str.substr(4, 2)
			            var str3 = str.substr(6, 2)
			            var str4 = str.substr(8, 2)
			            var str5 = str.substr(10, 2)
			            var str6 = str.substr(12, 2)
			            var total = str1 + '-' + str2 + '-' + str3 + ' ' + str4 + ':' + str5
			            timeList.push(total);
			            lowerList += '<ul class="yaoqing_phone_title_neirong">';
				            lowerList += '<li>'+timeList[i]+'</li>';
				            lowerList += '<li>'+orderListRes[i].beInVite_name+'</li>';
				            lowerList += '<li>'+orderListRes[i].beInVite_phone+'</li>';
				            lowerList += '</ul>';
					}
					$('.yaoqing_phone').html(lowerList);
				}
			}else{

			}	
		}

		
	})
	//我的邀请人
	if(parentUserHasMark==1){
		//说明有上级
		$.ajax({
			url: domain_name_url + "/myself",
			type: "GET",
			dataType: "jsonp", //指定服务器返回的数据类型
			data: {
			method: 'findSupmember',
			token: token,
			url_type:"myself"
		},
		success: function(data) {
			if(data.success=="1"){
				$('#per_btn').show();
				parentList = localStorage.getItem('phoneVal');
				parentList = data.result.rs[0].phone.substr(0, 3) + '****' +data.result.rs[0].phone.substr(7);
				console.log(parentList)
				$('#per_btn').html(parentList);   
			}else{
				$('#per_btnull').show();
			}    
		}

		
	})
	}else{
		$('#per_btnull').show();
	}
	
})