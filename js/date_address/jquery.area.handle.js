var expressArea, areaCont, areaList = $("#areaList"), areaTop = areaList.offset().top;

/*初始化省份*/
function intProvince() {
	areaCont = "";
	console.log(chineseCountryStr);
	for (var i=0; i<province.length; i++) {
		areaCont += '<li onClick="selectP(' + i + ');">' + province[i] + '</li>';
	}
	areaList.html(areaCont);
	$("#areaBox").scrollTop(0);
	$("#backUp").removeAttr("onClick").hide();
}
intProvince();

/*选择省份*/
function selectP(p) {
	areaCont = "";
	areaList.html("");
	for (var j=0; j<city[p].length; j++) {
		areaCont += '<li onClick="selectC(' + p + ',' + j + ');">' + city[p][j] + '</li>';
	}
	areaList.html(areaCont);
	$("#areaBox").scrollTop(0);
	expressArea = province[p] + " > ";
	$("#backUp").attr("onClick", "intProvince();").show();
}

/*选择城市*/
function selectC(p,c) {
	areaCont = "";
	for (var k=0; k<district[p][c].length; k++) {
		areaCont += '<li onClick="selectD(' + p + ',' + c + ',' + k + ');">' + district[p][c][k] + '</li>';
	}
	areaList.html(areaCont);
	$("#areaBox").scrollTop(0);
	var sCity = city[p][c];
	if (sCity != "省直辖县级行政单位") {
		if (sCity == "东莞市" || sCity == "中山市" || sCity == "儋州市" || sCity == "嘉峪关市") {
			expressArea += sCity;
			$("#expressArea dl dd").html(expressArea);
			clockArea();
		} else if (sCity == "市辖区" || sCity == "市辖县" || sCity == "香港岛" || sCity == "九龙半岛" || sCity == "新界" || sCity == "澳门半岛" || sCity == "离岛" || sCity == "无堂区划分区域") {
			expressArea += "";
		} else {
			expressArea += sCity + " > ";
		}
	}
	$("#backUp").attr("onClick", "selectP(" + p + ");");
}

/*选择区县*/
function selectD(p,c,d) {
	clockArea();
	expressArea += district[p][c][d];
	$("#expressArea dl dd").html(expressArea);
}

/*关闭省市区选项*/
function clockArea() {
	$("#areaMask").fadeOut();
	$("#areaLayer").animate({"bottom": "-100%"});
	intProvince();
}

$(function() {
	/*打开省市区选项*/
	$("#expressArea").click(function() {
		$("#areaMask").fadeIn();
		$("#areaLayer").animate({"bottom": 0});
	});
	/*关闭省市区选项*/
	$("#areaMask, #closeArea").click(function() {
		clockArea();
	});
});