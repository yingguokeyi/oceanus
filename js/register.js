var imageCodeKey;
function example() {
	imageCodeKey="";
	//...do something
	var str = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
	for(var i = 0; i < 32; i++) {
		var r = Math.floor(Math.random() * 32); //取得0-32间的随机数，目的是以此当下标取数组data里的值！ 
		imageCodeKey += str[r]; //输出20次随机数的同时，让rrr加20次，就是20位的随机字符串了。 
	}
	console.log("111111111111111")
	console.log("imageCodeKey..."+imageCodeKey)
	sStorage = window.localStorage; //本地存题目
	sStorage.imagecode = imageCodeKey;
	// console.log(imageCodeKey);
}