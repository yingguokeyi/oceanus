window.jsel = JSONSelect;
//分类
function linkPage(datavalue) {
	sStorage = window.localStorage; //本地存题目
	sStorage.uri_list = datavalue;
	location.href = 'goods_list.html?dictDataValue=' + datavalue;
}
$(function() {
	var yiji = [];
	var erji = [];
	/*底部增加class*/
	$(".footer_ul li").click(function() {
		$(this).children("a").addClass("style").parent().siblings().find("a").removeClass("style");
	});
	var selectOne = function(id) {
		var listhtml = '';
		for(var i = 0; i < erji[id].length; i++) {
			var name_erji = erji[id][i].dict_data_name;
			listhtml += '<section class="section_right hs_content ">' +
				'					<h5>'+name_erji+'</h5>';
			var name_erji_next = erji[id][i].next_data;
			for(var h = 0; h < name_erji_next.length; h++) {
				var name_sanji = name_erji_next[h].dict_data_name;
				var img_url = name_erji_next[h].image_url;
				var datavalue = name_erji_next[h].dict_data_value;
				listhtml += '			<ul class="section_right_ul" onclick="linkPage(' + datavalue + ')">' +
					'						<li class="section_right_ul_li">' +
					'							<a href="javascript:;">' +
					'								<img src=' + img_url + ' />' +
					'								<br />' +
					'								<span>' + name_sanji + '</span>' +
					'							</a>' +
					'						</li>' +
					'					</ul>';
			}
			listhtml += '</section>';
			$(".section_list").html(listhtml)
		}
	};
	$.ajax({
		url: domain_name_url + "/classify",
		type: "GET",
		dataType: "jsonp", //指定服务器返回的数据类型
		data: {
			method: 'classifyGoods'
		},
		success: function(data) {
			data.forEach(function(value, index) {
				yiji.push(value.dict_data_name);
				erji.push(value.next_data)
			})
			//一级标题
			var listhtml = '';
			$(yiji).each(function(key, value) {
				if(key == 0) {
					listhtml += '<li class="active_li xuanzhong_style" id=' + key + '>' +value +'</li>';
				} else {
					listhtml += '<li class="active_li" id=' + key + '>' +value +'</li>';
				}
				selectOne(0);
			});
			$(".aacon").html(listhtml);
			//二级标题
			$(".active_li").click(function(e) {
				$(this).addClass('xuanzhong_style').siblings('li').removeClass('xuanzhong_style');
				selectOne(e.target.id);
			})
		}

	});
});