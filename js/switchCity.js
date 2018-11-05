// 热门城市
var hotListhtml = '';
var hotcityList=hotcityList;
for(var i=0;i<hotcityList.length;i++){
	hotListhtml += '<li class="local_cont" data-name='+hotcityList[i].city+'>'+hotcityList[i].city+'</li>';
}
$(".hot_city ul").html(hotListhtml);
//当前热门
// var atListhtml = '';
// var an;
// for(var i=0;i<searchLetter.length;i++){
// 	an=searchLetter[i];
// 	atListhtml += '<li data-letter='+searchLetter[i]+'>';
// 	atListhtml += '<a href="#' + an + '">'+searchLetter[i]+'</a>';
// 	atListhtml += '</li>';
// }
// $(".city_right ul").html(atListhtml);
// 城市列表
var cityList = obj.cityObjs;
var cityObj = {};
var listhtml = '';
cityList.map(function (item) {
	if (!cityObj[item.initial]) {
		cityObj[item.initial] = [];
	};
	cityObj[item.initial].push(item);
})
console.dir(cityObj);
for(var key in cityObj){//遍历对象
	listhtml += '<p class="list_title" data-initial='+key+' id="'+ key +'">'+key+'</p>';
	for(var i=0;i<cityObj[key].length;i++){
		// listhtml += '<ul>';
		listhtml += '<li data-name='+cityObj[key][i].city+' data-id='+cityObj[key][i].id+'>'+cityObj[key][i].city+'</li>';
		// listhtml += '</ul>';

	}
		
}

$('.city_choose ul').html(listhtml);
// console.log(Array.isArray(cityObjs));//检验是不是数组
//点击热门城市更改首页城市名字，当前定位城市
$('.hot_city ul li').click(function(){
	var cityName = $(this).data('name');
	console.log(cityName)
	sStorage = window.localStorage; //本地存题目
	sStorage.cityName = cityName;
	location.href='index.html';
})
// var localName = localStorage.getItem('cityName');
// $('.locating_city .local_cont').html(localName);
//点击城市列表更改首页城市名字，当前定位城市
$('.city_choose ul li').click(function(){
	var cityName = $(this).data('name');
	sStorage = window.localStorage; //本地存题目
	sStorage.cityName = cityName;
	location.href='index.html';
})
var localName = localStorage.getItem('cityName');
$('.locating_city .local_cont').html(localName);
//点击当前热门城市字母，对应的城市列表字母的城市显示
$('.city_right ul li a').click(function(){
	layer.open({
		content: $(this).html(),
		skin: 'msg',
		time: 2 //2秒后自动关闭
	});
})
//城市搜索
var arrName=[];
var arrList = "";
$('#cityName').keyup(function(){
	var value = $(this).val();
	arrName = cityList.filter(function(item) {
		return item.city.indexOf(value) !== -1;
	})
	console.log(arrName);
	for(var i=0;i<arrName.length;i++){
		arrList += '<li data-name='+arrName[i].city+'>'+arrName[i].city+'</li>';
	}
	$('.picture_click ul').html(arrList);
	$('.content_city').hide();
	$('.picture_click ul li').click(function(){
		var cityName = $(this).data('name');
		sStorage = window.localStorage; //本地存题目
		sStorage.cityName = cityName;
		location.href='index.html';
	})
});

