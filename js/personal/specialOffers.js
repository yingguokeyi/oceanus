$(function(){
    var signFor = localStorage.getItem('member_level');//判断是不是什么用户
    var label = localStorage.getItem('PreferentialSign');//判断消息的
    // console.log(signFor)
    $.ajax({
        url: domain_name_url + '/member',
        type: "GET",
        dataType: "jsonp", //指定服务器返回的数据类型
        data: {
            method: 'getMemberMessagesInfo',
            memberLevel:signFor,//普通会员1  小掌柜2  大掌柜3
            messageSign:label,//系统消息
            url_type: 'member',
        },
        success: function(data) {
            var resList = data.result.rs;
            var htmlList='';
            if(resList != ''){
            for( var i=0; i<resList.length;i++){
                var chronological = resList[i].publish_time;
                var schedule = "20" + chronological.substring(0,2) + '.' + chronological.substring(2,4) + '.' + chronological.substring(4,6) + '  '  + chronological.substring(6,8) + '：' + chronological.substring(8,10) ;
               
                    htmlList+='<ul onclick="linkPage(' +resList[i].link_address + ')">';
                    htmlList+='<li class="timeBucket">'+schedule+'</li>';
                    htmlList+='<li class="map">';
                    htmlList+='<span class="flower">';
                    htmlList+='<img src='+resList[i].imgPath+' />';
                    htmlList+='</span>';
                    htmlList+='<span class="offside">';
                    htmlList+=' <span  class="headline">'+resList[i].message_name + '</span>';
                    htmlList+='<span class="introduction">'+resList[i].message_context + ' </span>';
                    htmlList+='</span>';
                    htmlList+='</li>';
                    htmlList+='</ul>';
                
            }
        }else {
            $(".however").show();    
        }
            $('.discounts').html(htmlList);   
           
        }

    });


})

// 本地存储
function linkPage( link_address) {
        var url = window.location.href;
        console.log(url)
        localStorage.setItem('gurl', window.location.href);
		sStorage = window.localStorage; //本地存题目
		sStorage.uri_goods = link_address;
		location.href = '../goods_details.html?spuId=' + link_address + '&url'+url;
}