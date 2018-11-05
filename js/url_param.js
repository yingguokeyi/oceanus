function parameter(start, and, equal) {
	var url = location.href;
	var theRequest = {};
	theRequest.counts = 0;
	if(url.indexOf(start) !== -1) {
		var str = url.substr(url.indexOf(start) + 1);
		var strs = str.split(and);
		for(var i = 0; i < strs.length; i++) {
			var ss = strs[i].split(equal);
			theRequest[ss[0]] = ss[1];
			theRequest.counts++;
		}
	}
	return theRequest;
}
function urlparam(){
	return parameter('?', '&', '=')
}
