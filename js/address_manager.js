var ids_zhi = localStorage.getItem('gong');
var token = localStorage.getItem('token');
$(document).on('click','.deleteGoodsAddress',function(){
	var _this = this;
	var num = $(this).data("id");
	$('.modal').show();
	$('#sure').click(function(){
		$.ajax({
			url: domain_name_url + "/my",
			type: "GET",
			dataType: "jsonp", //指定服务器返回的数据类型
			data: {
				method: 'delAddress',
				addressId: num,
				token: token,
				url_type:'my'
			},
			success: function(data) {
				console.log(data)
				var da_success = data.success;
				if(da_success == 1) {
					console.log($(_this).parent().parent())
					$(_this).parent().parent().prev().remove();
					// window.location.reload();
					$('.modal').hide();
					window.location.reload();
				} else {

				}

			}

		});
	})
	
})
$(document).on('click','#cancel',function(){
	$('.modal').hide();
})

//编辑收货地址
function compileGoodsAddress(num) {
	sStorage = window.localStorage; //本地存题目
	sStorage.id_num = num;
	window.location.href = 'adress_compile.html?numId=' + num;
}
//设为默认地址
$(document).on('click','.morenGoodsAddress',function(){
	var _this = this;
	var num = $(this).data("id");
	console.log(num);
	$.ajax({
		url: domain_name_url + "/my",
		type: "GET",
		dataType: "jsonp", //指定服务器返回的数据类型
		data: {
			method: 'serDefault',
			addressId: num,
			token: token,
			url_type:'my'
		},
		success: function(data) {
			console.log(data)
			var da_success = data.success;
			if(da_success == 1) {
				$(_this).parent().parent().css("background-image","url(../img/selectf.png)");
				$(_this).parents('.main_address').find('.address_defalut').css('display','block');
			} else {

			}

		}

	});
})
//从别的页面跳转到地址管理页面(订单页面、去支付页面)
$(document).on('click','#each_out_div',function(){
	var addid = $(this).data('id');
	var addname = $(this).data('name');
	var addphone = $(this).data('phone');
	var addsite = $(this).data('site');
	var addsites = $(this).data('sites');
	sStorage = window.localStorage; //本地存题目
	sStorage.addid = addid;
	sStorage.addname = addname;
	sStorage.addphone = addphone;
	sStorage.addsite = addsite;
	sStorage.addsites = addsites;
})