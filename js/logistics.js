var numbers = localStorage.getItem('numbers');
var company = localStorage.getItem('company');
$.ajax({
	url: domain_name_url + "/order",
	type: "GET",
	dataType: "jsonp", //指定服务器返回的数据类型
	data: {
		method:'execLookKuaiDi',
	    expressType:company,
	    expressNo:numbers,
	    url_type: 'order'
	},
	success: function(data) {
		if(data.status==200){
			if(data.state==0){
				$('.logistics_title').html('在途中');
			}
			if(data.state==1){
				$('.logistics_title').html('已揽收');
			}
			if(data.state==2){
				$('.logistics_title').html('疑难');
			}
			if(data.state==3){
				$('.logistics_title').html('已签收');
			}
			if(data.state==4){
				$('.logistics_title').html('退签');
			}
			if(data.state==5){
				$('.logistics_title').html('同城派送中');
			}
			if(data.state==6){
				$('.logistics_title').html('退回');
			}
			if(data.state==7){
				$('.logistics_title').html('转单');
			}
			var data=data.data;
			var logListhtml='';
			for(var i=0;i<data.length;i++){
				logListhtml += '<li>';
				logListhtml += '<p class="logistics_time">'+data[i].time+'</p>';
				logListhtml += '<p class="logistics_adress">'+data[i].context+'</p>';
				logListhtml += '</li>';
			}
			$('.logistics_cont').html(logListhtml);
		}else{
			$('.logistics_title').html('在途中');
			layer.open({
				content: '该快递暂不支持查询',
				skin: 'msg',
				time: 2
			});

		}
	}
})	
$(document).on('click','.title_top_first',function(){
	window.location.href='../order_list.html?currentType=2';
})


