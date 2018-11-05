$(function(){
    var signFor = localStorage.getItem('member_level');//判断是不是什么用户
    var label = localStorage.getItem('sign');//判断消息的
    //  console.log(signFor,label,'label')
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
            if(resList.length != ''){
                for( var i=0; i<resList.length;i++){
                    var chronological = resList[i].publish_time;
                    var schedule = "20" + chronological.substring(0,2) + '.' + chronological.substring(2,4) + '.' + chronological.substring(4,6) + '  '  + chronological.substring(6,8) + '：' + chronological.substring(8,10) ;
               
                    htmlList+='<ul class="meuyt" >';
                    htmlList+='<li class="timeBucket">'+schedule+'</li>';
                    htmlList+='<li class="hierarchy">';
                    htmlList+='<span class="above">';
                    htmlList+='<span class="flower">';
                    htmlList+='<img src="../img/tutu.png"/>';
                    htmlList+='</span>';
                    htmlList+='<span  class="headline">'+resList[i].message_name+'</span>';
                    htmlList+='</span>';
                    htmlList+='<span class="offside">';
                    htmlList+='<span class="introduction">'+resList[i].message_context +'</span>';
                    htmlList+='</span>';
                    htmlList+='</li>';
                    htmlList+='</ul>';
                } 
            }else{
                $(".however").show();
            }
            $('.meuyt').html(htmlList);
        }

    });
})