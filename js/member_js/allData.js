window.onload=function(){
	var token = localStorage.getItem('token');
	$.ajax({
		url: domain_name_url + '/order',
		type: "GET",
		dataType: "jsonp", //指定服务器返回的数据类型
		data: {
			method: 'getMonthPddCommission',
			token: token,
			url_type: 'order'
		},
		success: function(data) {
			var rs = data.result.rs[0].result.result.rs;
			if(rs.length!=0){
				$('.all_ul').show();
				var allListHtml = '';
				for(var i=0;i<rs.length;i++){
					var str = rs[i].day_time;
					var str1 = str.substring(0,2);
					var str2 = str.substring(2,4);
					var str3 = str.substring(4,6);
					allListHtml += '<li id="data_revenues" data-str='+str+' data-price='+(rs[i].day_money/100).toFixed(2)+' data-count='+rs[i].day_count+'>';
					allListHtml += '<p class="all_title"><span>'+str2+'月'+str3+'</span>日预估收益<p>';
					allListHtml += '<p class="all_text"><span class="all_price">￥<i>'+(rs[i].day_money/100).toFixed(2)+'</i></span><span class="all_singular"><i>'+rs[i].day_count+'</i>单</span></p>';
					allListHtml += '</li>';
					if((rs[i].day_money/100).toFixed(2)==0.00){
						$('.all_price').css('color','#999');
					}
					if(rs[i].day_count==0){
						$('.all_singular').css('color','#999');
					}
				}
				$('.all_ul').html(allListHtml);
			}else{
				$('.anonymous').show();
			}
			
		}
	})
	$(document).on('click','#data_revenues',function(){
		var str = $(this).data('str');
		var price = $(this).data('price');
		var count = $(this).data('count');
		sStorage = window.localStorage;
		sStorage.str = str;
		sStorage.price = price;
		sStorage.count = count;
		window.location.href='dailyData.html';
	})
	$(document).on('click','#make',function(){
		window.location.href='../index.html'
	})
}