window.onload=function(){
	var token = localStorage.getItem('token');
	$.ajax({
		url: domain_name_url + '/member',
		type: "GET",
		dataType: "jsonp", //指定服务器返回的数据类型
		data: {
			method: 'getWithdrawRecord',
			token: token,
			url_type: 'member'
		},
		success: function(data) {
			var requestData = data.result.rs;
	        if(data.success==1){
	        	if(requestData.length!=0){
	        		$('.withdrawal_record_ul').show();
	        		var timeList1 = [];
	        		var recordListHtml = '';
	        		for(var i=0;i<requestData.length;i++){
	        			if(requestData[i].err_code_des.indexOf('非实名')  != -1){   //有实名两个字
			                requestData[i].err_code_des="温馨提示 : 因为您提现的微信未实名认证，导致我们无法为您打款，建议进行实名认证之后重新提现"
			            }
	        			var num1 = requestData[i].created_date;
						var str = "20" + num1
						var str1 = str.substr(0, 4)
						var str2 = str.substr(4, 2)
						var str3 = str.substr(6, 2)
						var str4 = str.substr(8, 2)
						var str5 = str.substr(10, 2)
						var str6 = str.substr(12, 2)
						var total = str1 + '-' + str2 + '-' + str3 + ' ' + str4 + ':' + str5 + ':' + str6
						timeList1.push(total);
						recordListHtml += '<li>';
						recordListHtml += '<div class="withdrawal_record_top">';
						recordListHtml += '<div class="withdrawal_record_cont">';
						recordListHtml += '<p class="title">微信提现</p>';
						recordListHtml += '<p class="time">'+timeList1[i]+'</p>';
						recordListHtml += '</div>';
						recordListHtml += '<div class="withdrawal_record_price">';
						recordListHtml += '<p class="price_num">-<span>'+(requestData[i].amount/100).toFixed(2)+'</span></p>';
						if(requestData[i].status==1 || requestData[i].status==2){
							recordListHtml += '<p class="price_status">审核中</p>';
						}
						if(requestData[i].status==3){
							recordListHtml += '<p class="price_status">提现失败</p>';
						}
						if(requestData[i].status==5){
							recordListHtml += '<p class="price_status">提现成功</p>';
						}
						if(requestData[i].status==6){
							recordListHtml += '<p class="price_status">提现失败</p>';
						}
						recordListHtml += '</div></div>';
						recordListHtml += '<div class="withdrawal_record_hint">';
						if(requestData[i].status==1 || requestData[i].status==2){
							recordListHtml += '<p>温馨提示 : 您的提现正在审核，正常最迟3个工作日到账。请耐心等待</p>';
						}
						if(requestData[i].status==3){
							recordListHtml += '<p>温馨提示 : 您的该笔订单存在异常，钱已经返回您的账户</p>';
						}
						if(requestData[i].status==5){
							recordListHtml += '<p>温馨提示 : 您的提现已提现成功</p>';
						}
						if(requestData[i].status==6){
							recordListHtml += '<p>温馨提示 : '+requestData[i].err_code_des+'</p>';
						}
						
	        		}
	        		$('.withdrawal_record_ul').html(recordListHtml);
	        	}else{
	        		$('.anonymous').show();
	        	}
	       	  
	       }
		}
	})
	$(document).on('click','#make',function(){
		window.location.href='../index.html'
	})	
}
