var token = localStorage.getItem('token');
$.ajax({
	url: domain_name_url + '/myself',
	type: "GET",
	dataType: "jsonp", //指定服务器返回的数据类型
	data: {
		method: 'findMyself',
		token: token,
		url_type: 'myself'
	},
	success: function(data) {
		var requestData = data.result.rs[0].result.result.rs;
        if(data.success==1){
        	console.log(requestData.length)
        	if(requestData.length!=0){
        		var balance = requestData[0].money;
		       	localStorage.setItem('balance',requestData[0].money);
		       	$('.balance_num span').html((balance/100).toFixed(2));
        	}else{
        		$('.balance_num span').html('0.00');
        	}
       	  
       }
	}
})	