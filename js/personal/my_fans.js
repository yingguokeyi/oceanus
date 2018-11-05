var token = localStorage.getItem('token');
$(function(){
	var urlStatus;
	function getParams() {
		var paramsStr = location.search.substr(1);
		var result = {};
		if(/&+/g.test(paramsStr)) {
			var paramsArr = paramsStr.split('&');
			paramsArr.map(function(item) {
				var arr = item.split('=');
				result[arr[0]] = arr[1];
			})
			return result;
		} else {
			var arr = paramsStr.split('=');
			result[arr[0]] = arr[1];
		}
		return result;

	}
	$(".fans_title li").click(function() {
		$(this).children("a").addClass("tabhover").parent().siblings().find("a").removeClass("tabhover");
		$(this).find("a .fans_line").show().parents().siblings().find("a .fans_line").hide();
		urlStatus = $(this).attr("status");
		fansList(urlStatus);
	})
	var oParams = getParams();
	$("#currentType" + oParams.currentType).trigger("click");
	function fansList(status){
		$.ajax({
			url: domain_name_url + "/myself",
			type: "GET",
			dataType: "jsonp", //指定服务器返回的数据类型
			data: {
				method: 'getMyFans',
				token: token,
				memberLevel:status,//要申请的等级
				url_type:"myself"
			},
			success: function(data) {
				if(data.success==1){
					var fanListHtml = '';
					var timeList = [];
					var fanRes = data.result.rs;
					if(fanRes.length != 0){
						var fanNum = fanRes[1].count.result.rs[0];
						var allNum = fanNum.levelAll;
						$('.main_top span').html(allNum);
						$('#pt_num').html(fanNum.levelA);
						$('#samll_num').html(fanNum.levelB);
						$('#big_num').html(fanNum.levelC);
						sStorage = window.localStorage; //本地存题目
						sStorage.fallNum = allNum;
						var fanli = fanRes[0].result.result.rs;
							for(var i=0;i<fanli.length;i++){
								var nick_name = fanli[i].nick_name.substr(0, 3) + '****' +fanli[i].nick_name.substr(7);
								var time = fanli[i].beInvite_date;
								var str = "20" + time
					            var str1 = str.substr(0, 4)
					            var str2 = str.substr(4, 2)
					            var str3 = str.substr(6, 2)
					            var total = str1 + '-' + str2 + '-' + str3;
					            timeList.push(total);
								fanListHtml += '<li>';
								fanListHtml += '<p class="tabcontent_title_name">'+nick_name+'</p>';
								fanListHtml += '<p class="tabcontent_title_time">'+timeList[i]+'</p>';
								fanListHtml += '</li>';
							}
						$('#orderContent ul').html(fanListHtml);
						
					}
				}
			}
		})		
	}
})