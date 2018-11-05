var members = localStorage.getItem('member_level');
    // 消息的请求数据
    $.ajax({
        url: domain_name_url + '/member',
            type: "GET",
            dataType: "jsonp", //指定服务器返回的数据类型
            data: {
                method: 'messageInfoList',
                memberLevel:members,//普通会员1  小掌柜2  大掌柜3
                url_type: 'member',
            },
            success: function(data) {
            var messageQueue = data.result.rs;
            var grade = messageQueue[0].member_level;
            localStorage.setItem("grade",messageQueue[0].member_level); 
        
                if(messageQueue !=''){
                        // 消息通知
                    var notifierProPlus = messageQueue[0];
                    var information_context = notifierProPlus.message_context;
                    var box = document.getElementById("box");
                    box.innerHTML = information_context;
                   
                }
                if(messageQueue !=''){
                       //优惠活动
                    var specialOffers = messageQueue[1];
                    var special_context = specialOffers.message_context;
                    var boxx = document.getElementById("boxx");
                    boxx.innerHTML = special_context;
                }
           
            }
    });

    // 点击消息通知跳转时获取字段传到notificaionMessage里
        $.ajax({
            url: domain_name_url + '/member',
            type: "GET",
            dataType: "jsonp", //指定服务器返回的数据类型
            data: {
                method:'getMemberMessagesInfo',
                memberLevel:members,//普通会员1  小掌柜2  大掌柜3
                messageSign:'XT',//系统消息
                url_type: 'member',
            },
            success: function(data) {
            
            var resList = data.result.rs;
                for( var i=0; i<resList.length;i++){
                    var sign = resList[i].message_type;
                    var leve = resList[i].member_level;
                    localStorage.setItem("sign",resList[i].message_type);
                }            
            
            }
    
        });

      //优惠活动
      $.ajax({
        url: domain_name_url + '/member',
        type: "GET",
        dataType: "jsonp", //指定服务器返回的数据类型
        data: {
            method: 'getMemberMessagesInfo',
            memberLevel:members,//普通会员1  小掌柜2  大掌柜3
            messageSign:'YH',//系统消息
            url_type: 'member',
        },
        success: function(data) {
            var resList = data.result.rs;
            for( var i=0; i<resList.length;i++){
                var PreferentialSign  = resList[i].message_type;
                var PreferentialPeople = resList[i].member_level;
                localStorage.setItem("PreferentialSign",resList[i].message_type);
                
            }     
           
        }

    });

    // 消息点击事件
    function service(){
        location.href = 'notificationMessage.html';
    }
    
    //优惠活动点击事件
     function activity(){
       location.href = 'specialOffers.html';
    }
    

