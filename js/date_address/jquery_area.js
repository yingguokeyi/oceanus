var expressArea,areaCont, areaList = $("#areaList");
/*初始化省份*/
function intProvinceM() {
	areaCont = "";
	for(var i=0;i<chineseCountryStr.length;i++){
		if(chineseCountryStr[i].level==1){
			areaCont += '<li onClick="selectPM(' + chineseCountryStr[i].sheng + ');">' + chineseCountryStr[i].name + '</li>';
		}
	}
	areaList.html(areaCont);
	$("#areaBox").scrollTop(0);
	$("#backUp").removeAttr("onClick").hide();
};
intProvinceM();

/*选择省份*/
function selectPM(p) {
	areaCont = "";
	areaList.html("");
	for(var i=0;i<chineseCountryStr.length;i++){
		if(chineseCountryStr[i].sheng==p){
			if(chineseCountryStr[i].level==2){
				areaCont += '<li onClick="selectCM(' + chineseCountryStr[i].sheng + ',' + chineseCountryStr[i].di + ');">' + chineseCountryStr[i].name + '</li>';
			}
			if(chineseCountryStr[i].level==1){
				expressArea = chineseCountryStr[i].name + " > ";
			}
		}
	}
	areaList.html(areaCont);
	$("#areaBox").scrollTop(0);
	$("#backUp").attr("onClick", "intProvinceM();").show();
}

/*选择城市*/
function selectCM(p,j) {
	areaCont = "";
	for(var i=0;i<chineseCountryStr.length;i++){
		if(chineseCountryStr[i].sheng==p){
			if(chineseCountryStr[i].di==j){
				if(chineseCountryStr[i].level==3){
					areaCont += '<li onClick="selectDM(' + chineseCountryStr[i].sheng + ',' + chineseCountryStr[i].di + ',' + chineseCountryStr[i].xian + ');">' + chineseCountryStr[i].name + '</li>';
				}
				if(chineseCountryStr[i].level==2){
					expressArea += chineseCountryStr[i].name+ " > ";
				}
			}
		}
	}
	areaList.html(areaCont);
	$("#areaBox").scrollTop(0);
	$("#backUp").attr("onClick", "selectPM(" + p + ");");
}

/*选择区县*/
function selectDM(p,j,x) {
	var code = "";
	console.log("p:"+p+"j:"+j+"x:"+x+"...code");
	clockAreaM();
	var def;
	for(var i=0;i<chineseCountryStr.length;i++){
		if(chineseCountryStr[i].sheng==p){
			if(chineseCountryStr[i].di==j){
				if(chineseCountryStr[i].xian==x){
					if(chineseCountryStr[i].level==3){
						expressArea += chineseCountryStr[i].name;
						code = chineseCountryStr[i].code;
					}
				}
			}
		}
	}
	console.log("...code"+code);
	sStorage = window.localStorage; //本地存题目
	sStorage.yard = code;
	console.log(code)
	$("#expressArea dl dd").html(expressArea);
	console.log(expressArea)
}

/*关闭省市区选项*/
function clockAreaM() {
	$("#areaMask").fadeOut();
	$("#areaLayer").animate({"bottom": "-100%"});
	intProvinceM();
}

$(function() {
	/*打开省市区选项*/
	$("#expressArea").click(function() {
		$("#areaMask").fadeIn();
		$("#areaLayer").animate({"bottom": 0});
	});
	/*关闭省市区选项*/
	$("#areaMask, #closeArea").click(function() {
		clockAreaM();
	});
});