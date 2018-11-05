var token = localStorage.getItem('token');
var status = localStorage.getItem('status');//订单状态
var orderNo = localStorage.getItem('orderNo');//订单号
var img = localStorage.getItem('imgs');//商品图片
var skunames = localStorage.getItem('skunames');//商品名称
var size = localStorage.getItem('size');//商品规格
var time = localStorage.getItem('time');//下单时间
var nums = localStorage.getItem('nums');//商品数量
var prices = localStorage.getItem('prices');//商品价格
var names = localStorage.getItem('names');//收货人名字
var phones = localStorage.getItem('phones');//收货人电话
var addressl = localStorage.getItem('addressl');//收货人地址
var back = localStorage.getItem('back');//返现
if(status==101){
	$('.daishouhuo').html("待支付");
}
if(status==102||status==103||status==104||status==105||status==106){
	$('.daishouhuo').html("待收货");
}
if(status==107||status==108||status==205){
	$('.daishouhuo').html("已完成");
}
if(status==109||status==110||status==112){
	$('.daishouhuo').html("已取消");
}
$('.address_loction_li_left span').html(names);
$('.address_loction_li_right').html(phones);
$('.address_loction_lisec span').html(addressl);
$('.main_content_a_left').attr("src","img");
$('.m_c_a_r_top').html(skunames);
$('.cernter_left').html(size);
$('.bottom_font span').html(prices);
$('.bottom_right span').html(back);
$('.goods_money_spanfu span').html(prices);
$('.goods_danhao_li span').html(orderNo);
$('.goods_danhao_lisec span').html(time);
if(back==0){
	$('.bottom_right').hide();
}
$('.title_top_first').click(function(){
	window.location.href = 'order_list.html?currentType=0';
})


