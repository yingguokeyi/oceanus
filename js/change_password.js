$(function(){
	$(document).on("blur", "#original_pass", function() {
		if($(this).val()==''){
			layer.open({
				content: '请输入现在密码',
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
		}
	})
	$(document).on("blur", "#new_pass", function() {
		if($(this).val()==''){
			layer.open({
				content: '请输入新密码',
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
		}else{
			if($(this).val().length<6 || $(this).val().length>20){
				layer.open({
					type: 1,
					content: $('.warm').html(),
					anim: 'up',
					scrollbar: false,
					shadeClose: false,
					style: 'position:fixed;bottom:50%;left: 8%; right:8%;height: auto;border:none;border-radius:6px'
					
				});
				$(document).on("click", ".warm_login", function() {
					layer.closeAll('page');

				});
			}
			}
		
	})
	$(document).on('input','#original_pass',function(){
		if($(this).val()!='' && $(this).val().length>0){
			$("#btn").removeAttr("disabled");
			$('#btn').css({'background':'#b61c25','color':'#fff'});
		}else{
			$("#btn").attr("disabled");
			$('#btn').css({'background':'#ebebeb','color':'#b3b3b3'});
		}
	})
	$(document).on('input','#new_pass',function(){
		if($(this).val()!='' && $(this).val().length>0){
			$("#btn").removeAttr("disabled");
			$('#btn').css({'background':'#b61c25','color':'#fff'});
		}else{
			$("#btn").attr("disabled");
			$('#btn').css({'background':'#ebebeb','color':'#b3b3b3'});
		}
	})

})
