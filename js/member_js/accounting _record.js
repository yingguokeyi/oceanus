window.onload=function(){
	var token = localStorage.getItem('token');
	$.ajax({
		url: domain_name_url + '/myself',
		type: "GET",
		dataType: "jsonp", //指定服务器返回的数据类型
		data: {
			method: 'getAccountRecordZDZ',
			token: token,
			url_type: 'myself'
		},
		success: function(data) {
			var requestData = data.result.rs[0].result.result.rs;
	        if(data.success==1){
	        	if(requestData.length!=0){
	        		$('.accounting_record_ul').show();
	        		var timeList1 = [];
	        		var timeList2 = [];
	        		var recordListHtml = '';
			        for(var i=0;i<requestData.length;i++){
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
						var num2 = requestData[i].operator_time;
						var str = "20" + num2
						var str1 = str.substr(0, 4)
						var str2 = str.substr(4, 2)
						var str3 = str.substr(6, 2)
						var str4 = str.substr(8, 2)
						var str5 = str.substr(10, 2)
						var str6 = str.substr(12, 2)
						var total = str1 + '-' + str2 + '-' + str3 + ' ' + str4 + ':' + str5 + ':' + str6
						timeList2.push(total);
						recordListHtml += '<li>';
						recordListHtml += '<div class="accounting_record_title">';
						recordListHtml += '<p class="title_text">回填单奖励金</p>';
						recordListHtml += '<p class="title_money">+<span>'+(requestData[i].member_self_money/100).toFixed(2)+'</span></p>';
						recordListHtml += '</div>';
						recordListHtml += '<div class="accounting_record_time">';
						recordListHtml += '<p class="time_earnings">收益时间 :<span>'+timeList1[i]+'</span></p>';
						recordListHtml += '<p class="time_record">入账时间 :<span>'+timeList2[i]+'</span></p>';
						recordListHtml += '</div></li>';
			        }
			        $('.accounting_record_ul').html(recordListHtml);
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
