$(document).on('click','.single_choose',function(){
	$('.product_name').toggle();
})

//选择商品
$.ajax({
	url: domain_name_url + "/classify",
	type: "GET",
	dataType: "jsonp", //指定服务器返回的数据类型
	data: {
		method:'getZhangDZGoods',
		url_type: 'classify'
	},
	success: function(data) {
		if(data.success==1){
			var res = data.result.rs[0].zhangDZGoods.result.rs;
			var listhtml = '';
			for(var i=0;i<res.length;i++){
				listhtml += '<li data-id='+res[i].id+'>'+res[i].sku_name+'</li>';
			}
			$('.product_name ul').html(listhtml);
		}
	}
})
var id;//商品id

$(document).on('click','.product_name ul li',function(){
	id=$(this).data('id');
	$('.choose_commodity').val($(this).html());
	
	
	$('.choose_commodity').css('color','#333');
	$('.product_name').hide();
})
//下面用于图片上传预览功能
function setImagePreview(avalue) {
    //input
    var docObj = document.getElementById("doc");
    //img
    var imgObjPreview = document.getElementById("preview");
    //div
    var divs = document.getElementById("localImag");
    var add = document.getElementById("add");
        if (docObj.files && docObj.files[0]) {
            //火狐下，直接设img属性
            imgObjPreview.style.display = 'block';
            imgObjPreview.style.width = '1.8rem';
            imgObjPreview.style.height = '1.8rem';
            //imgObjPreview.src = docObj.files[0].getAsDataURL();
            //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
            imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
            add.style.display="none";
            $("#btn").removeAttr("disabled");
			$('#btn').css({'background':'#b61c25','color':'#fff'});
        } else {
            //IE下，使用滤镜
            docObj.select();
            var imgSrc = document.selection.createRange().text;
            var localImagId = document.getElementById("localImag");
            //必须设置初始大小
            localImagId.style.width = "1.8rem";
            localImagId.style.height = "1.8rem";
            //图片异常的捕捉，防止用户修改后缀来伪造图片
            try {
                localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
                add.style.display="none";
                $("#btn").removeAttr("disabled");
				$('#btn').css({'background':'#b61c25','color':'#fff'});
            } catch(e) {
                alert("您上传的图片格式不正确，请重新选择!");
                return false;
            }
            imgObjPreview.style.display = 'none';
            document.selection.empty();
        }
    return true;
}
//回填单信息
var oddTxt;
$(document).on("blur", "#odd_numbers", function() {
	oddTxt = $(this).val();
	var reg = /^\d{18}$/;
	var numbers = $(this).val().replace(/\s+/g, "");
	// console.log(numbers);
	if(oddTxt=="") {
		layer.open({
			content: '请输入订单号',
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	}else{
		if(!reg.test(numbers)) {
			layer.open({
				content: '请输入18位纯数字',
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
		}
	}
	$("#btn").removeAttr("disabled");
	$('#btn').css({'background':'#b61c25','color':'#fff'});
	
});
//上传订单号和商品
var remark=$("#remark").val();
var token = localStorage.getItem('token');
//没有图片的时候提交
function nopic(){
	var chooseTxt=$('.choose_commodity').val();	
	if(oddTxt==""){
		layer.open({
			content: '请输入订单号',
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
		return false;
	}
	if(chooseTxt==""){
		layer.open({
			content: '请选择商品',
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
		return false;
	}

	$.ajax({
		url: domain_name_url + '/order',
		type: "GET",
		dataType: "jsonp", //指定服务器返回的数据类型
		data: {
			method: 'addZhangDZOrder',
			token: token,
			orderNo:oddTxt,
			goodsName:chooseTxt,
			remark:remark,
			skuid:id,
			url_type: 'order'

		},
		success: function(data) {
			if(data.success==1){
				layer.open({
					content: '提交成功',
					skin: 'msg',
					time: 2 //2秒后自动关闭
				});
				$("#btn").attr("disabled");
				$('#btn').css({'background':'#ebebeb','color':'#b3b3b3'});
				$('#odd_numbers').val("");
				$('.choose_commodity').val("");
			}
			if(data.success==2){
				layer.open({
					content: '该订单号已存在',
					skin: 'msg',
					time: 2 //2秒后自动关闭
				});
				$("#btn").attr("disabled");
				$('#btn').css({'background':'#ebebeb','color':'#b3b3b3'});
			}

		}
	})
}
$(document).on("click", "#btn", function() {
	var chooseTxt=$('.choose_commodity').val();
    var fileObj = document.getElementById("doc").files[0];
    console.log(fileObj) // js 获取文件对象
       if (typeof (fileObj) == "undefined" || fileObj.size <= 0) {
           nopic();
       }else{
       	//有图片的时候提交
       	var formFile = new FormData();
           formFile.append("method", "addZhangDZOrderImg");  
           formFile.append("file", fileObj); //加入文件对象
           formFile.append("token", token);
           formFile.append("url_type", 'order');
           formFile.append("orderNo", oddTxt);
           formFile.append("goodsName", chooseTxt);
           formFile.append("remark", remark);
           formFile.append("skuid", id);
	       $.ajax({
	           url: domain_name_url + '/order?method=addZhangDZOrderImg',
	           data:formFile,
	          //  data:{
		         //   	'method':'addZhangDZOrderImg',
			        // 'token': token,
			        // 'url_type':'order',
			        // 'orderNo':oddTxt,
			        // 'goodsName':chooseTxt,
			        // 'remark':remark,
			        // 'skuid':id,
	          //  },
	           type: "Post",
	           dataType: "jsonp",
	           cache: false,//上传文件无需缓存
	           processData: false,//用于对data参数进行序列化处理 这里必须false
	           contentType: false, //必须
	           success: function (data) {
	               alert("上传完成!");
	           },
	       })
       }
})