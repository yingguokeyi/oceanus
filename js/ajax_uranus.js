function ajax_group(dataParam,urlParam,typeParam,func){
	var flag;
	$.ajax({
				url: urlParam,
				type: typeParam,
				dataType: "jsonp", //指定服务器返回的数据类型
				data: dataParam,
				success: function (resp){
					func(resp);
				}
			});
			
}


 function ajax_datatypeByXml(type, url, Xml_data, func) {//data数据可以为空  
                $.ajax({  
                    type: type,  
                    url: url,  
                    dataType: "json",  
                    data: Xml_data,  
                    beforSend: function () {  
                        // 禁用按钮防止重复提交  
                        $("#submit").attr({disabled: "disabled"});  
                    },  
                    error: function (data) {  
                        //请求失败时被调用的函数   
                        alert("传输失败:" + data);  
                    },  
                    success: function (data) {  
                        func(data);  
                    }  
                });  
            }  
              