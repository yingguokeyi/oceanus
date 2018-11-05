window.onload=function(){
	var str = localStorage.getItem('str');
	var str1 = str.substring(0,2);
	var str2 = str.substring(2,4);
	var str3 = str.substring(4,6);
	var price = localStorage.getItem('price');
	var count = localStorage.getItem('count');
	$('.data_time p').html(str1+'年'+str2+'月'+str3+'日');
	$('.lately_price').html(price);
	$('.order_count').html(count);
	var token = localStorage.getItem('token');
	$.ajax({
		url: domain_name_url + '/order',
		type: "GET",
		dataType: "jsonp", //指定服务器返回的数据类型
		data: {
			method: 'getPddCommissionTest',
			token: token,
			dayTime:str,
			url_type: 'order'
		},
		success: function(data) {
			var res = data.result.rs[0].result.result.rs;
			var timeList = [];//时间
			var dataListHtml = '';
			for(var i=0;i<res.length;i++){
				var num = res[i].order_create_time;     //拼接时间
	            var str =num;
				var total = formatDateTime(str*1000);
	            timeList.push(total);
				dataListHtml += '<li>';
				dataListHtml += '<div class="list_left">';
				if(res[i].status==1){
					dataListHtml += '<div class="left_title">';
					dataListHtml += '<p>订单</p>';
					dataListHtml += '<p>返佣</p>';
					dataListHtml += '</div>';
				}
				if(res[i].status==2){
					dataListHtml += '<div class="left_title">';
					dataListHtml += '<p>粉丝</p>';
					dataListHtml += '<p>奖励</p>';
					dataListHtml += '</div>';
				}
				dataListHtml += '<div class="left_detail">';
				dataListHtml += '<p class="detail_top">';
				dataListHtml += '<span class="detail_phone">'+res[i].custom_parameters.substr(0, 3) + '****' +res[i].custom_parameters.substr(7)+'</span>';
				if(res[i].order_status==0){
					dataListHtml += '<span class="detail_cicting">购买商品</span>';
				}
				if(res[i].order_status==1){
					dataListHtml += '<span class="detail_cicting">购买商品</span>';
				}
				if(res[i].order_status==2){
					dataListHtml += '<span class="detail_cicting">购买商品</span>';
				}
				if(res[i].order_status==3){
					dataListHtml += '<span class="detail_cicting">购买商品</span>';
				}
				if(res[i].order_status==5){
					dataListHtml += '<span class="detail_cicting">购买商品</span>';
				}
				dataListHtml += '</p>';
				dataListHtml += '<p class="detail_time">'+timeList[i]+'</p>';
				dataListHtml += '</div></div>';
				dataListHtml += '<div class="list_right">';
				if(res[i].order_status==0 || res[i].order_status==1 || res[i].order_status==2){
					dataListHtml += '<p class="right_price" style="color:#e40012;">+<span>'+(res[i].commission/100).toFixed(2)+'</span></p>';
					dataListHtml += '<p class="right_hint"></p>';
				}
				if( res[i].order_status==3 || res[i].order_status==5){
					dataListHtml += '<p class="right_price" style="color:#09bd3c;">+<span>'+(res[i].commission/100).toFixed(2)+'</span></p>';
					dataListHtml += '<p class="right_hint">已转入可提现金额</p>';
				}
				if(res[i].order_status==4 || res[i].order_status==10){
					dataListHtml += '<p class="right_price" style="color:#999;">+<span>'+(res[i].commission/100).toFixed(2)+'</span></p>';
					dataListHtml += '<p class="right_hint">审核未通过</p>';
				}
				dataListHtml += '</div></li>';
			}
			$('.data_list').html(dataListHtml);

		}
	})	
}

// 时间的方法
function formatDateTime(str) {
    var date = new Date(str);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return  m + '月' + d+'日'+h+':'+minute;
};