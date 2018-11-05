//存储
function setCookie(name, value) {
	var exp = new Date();
	exp.setTime(exp.getTime() + 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
}
//获取
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

	if(arr = document.cookie.match(reg))

		return unescape(arr[2]);
	else
		return null;
}
//删除
function delCookie(name) { //删除一个cookie  
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if(cval != null)
		document.cookie = name + "=" + escape(cval) + ";expires=" + exp.toGMTString() + ";path=/";
}