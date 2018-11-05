var token = localStorage.getItem('token');
var gradesVal = localStorage.getItem('member_level');
$('#btn_join').removeAttr("disabled","disabled");
$(document).on('click','#btn_join',function(){
	if(gradesVal == '1'){
		$.ajax({
			url: domain_name_url + "/myself",
			type: "GET",
			dataType: "jsonp", //指定服务器返回的数据类型
			data: {
				method: 'addApplyMemberLevel',
				token: token,
				applyLevel:2,//要申请的等级
				url_type:"myself"
			},
			success: function(data) {
				console.log(data);
				if(data.success==1){
					layer.open({
						content: '提交成功',
						skin: 'msg',
						time: 2 //2秒后自动关闭
					});
					$('#btn_join').attr("disabled","disabled");
					$('#btn_join').css({'background':'#ebebeb','color':'#b3b3b3'});
				}else if(data.success==2){
					layer.open({
						content: '亲，您的拉粉数量不足5个',
						skin: 'msg',
						time: 2 //2秒后自动关闭
					});
				}else if(data.success==3){
					layer.open({
						content: '亲，请先完成一条订单在申请',
						skin: 'msg',
						time: 2 //2秒后自动关闭
					});
				}
			}
		})
	}
	if(gradesVal == '2'){
		layer.open({
			content: '您已是小掌柜',
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	}
	if(gradesVal == '3'){
		layer.open({
			content: '您已是大掌柜',
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	}	
})