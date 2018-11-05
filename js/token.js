var token = null;
function fangfa() {
	$(document).on("click", ".mian_btn_login", function() {
		var name = document.getElementById("uname").value;
		sStorage = window.localStorage;
		sStorage.nameval = name;
		var newpwd = document.getElementById("pwdnew").value;
		if(name==''){
			layer.open({
				content: '请输入手机号',
				skin: 'msg',
				time: 2
			});
			return false;
		}
		if(newpwd==''){
			layer.open({
				content: '请输入密码',
				skin: 'msg',
				time: 2
			});
			return false;
		}	
		$.ajax({
			url: domain_name_url + "/user",
			type: "GET",
			dataType: "jsonp", //指定服务器返回的数据类型
			data: {
				method: 'getUser',
				loginName: name,
				pwd: newpwd,
				url_type:'user'
			},
			success: function(data) {
				// console.log(data)
				var result = JSON.stringify(data); //json对象转成字符串
				var da_success = data.success;
				if(da_success == 1) {
					$('.mian_btn_login').attr("disabled",true);
					$('.mian_btn_login').css({'background':'#ebebeb','color':'#b3b3b3'});
					layer.open({
						content: '登录成功',
						skin: 'msg',
						time: 2 //2秒后自动关闭
					});
					// localStorage.setItem('memberLevel', data.result.rs[0].memberLevel);
					localStorage.setItem('parentUserHasMark', data.result.rs[1].parentUserHasMark);
					localStorage.setItem('token', data.result.rs[2].token);
					localStorage.setItem('da_login', da_success);
					var lurl = window.location.href;
					var url = localStorage.getItem('url');
					if(lurl.indexOf("url") >= 0){
						$('.mian_btn_login').attr('disabled',true);
						$('.mian_btn_login').css({'background':'#ebebeb','color':'#b3b3b3'});
						window.location.href=url;
						
					}else{
						$('.mian_btn_login').attr('disabled',true);
						$('.mian_btn_login').css({'background':'#ebebeb','color':'#b3b3b3'});
						setTimeout("location.href='index.html'", 500);
						// window.location.href='index.html';
					}
				} else {
					layer.open({
						content: '用户名密码错误',
						skin: 'msg',
						time: 2 //2秒后自动关闭
					});
				}
			}
		});

	});

}