var token = localStorage.getItem('token');
$(function(){
	var parentList = '';
	if($('#phone').val()==''){
		$('#phone').removeAttr('disabled');
		$('#btn_save').removeAttr('disabled');
	}
	// 验证手机号
	function phoneReg(){
		var reg = /^1(3|4|5|7|8)\d{9}$/;
		var phone = $('#phone').val().replace(/\s+/g, "");
		if(!reg.test(phone)) {
			layer.open({
			content: '手机号格式不正确',
			skin: 'msg',
			time: 2
			});
		}else {

		}
	}
	$(document).on('blur','#phone',function(){
		phoneReg();
	})
	
	//点击保存
	$(document).on('click','#btn_save',function(){
		var phoneVal = $('#phone').val();
		if($('#phone').val()==''){
			layer.open({
			content: '请填写手机号',
			skin: 'msg',
			time: 2
		});
		}else if($('#phone').val()!=''){
			var reg = /^1(3|4|5|7|8)\d{9}$/;
			var phone = $('#phone').val().replace(/\s+/g, "");
			if(!reg.test(phone)) {
				layer.open({
				content: '手机号格式不正确',
				skin: 'msg',
				time: 2
			});
			}else {
				$.ajax({
					url: domain_name_url + "/myself",
					type: "GET",
					dataType: "jsonp", //指定服务器返回的数据类型
					data: {
					method: 'confirmSupmember',
					token: token,
					phone: phoneVal,
					url_type: 'myself'
					},
					success: function(data) {
						if(data.success=="1"){
							layer.open({
								content: '绑定成功',
								skin: 'msg',
								time: 2
							});
							//getPhone();
							parentList = phoneVal.substr(0,3)+ '****'+phoneVal.substr(7);
							console.log(parentList)
							$('#phone').val(parentList);
							localStorage.setItem('phoneVal',$('#phone').val())
							if($('#phone').val()!=''){
								$('#phone').attr("disabled",'true');
							}
							$('#btn_save').attr("disabled");
							$('#btn_save').css({'background':'#ebebeb','color':'#b3b3b3'});
							$('#btn_save').hide();

						}else{
							$('#btn_save').removeAttr("disabled");
							
						}
					}
				})	
			}
		}

	})
});
