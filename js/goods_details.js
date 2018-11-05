window.jsel = JSONSelect;
var inventory;//库存
var makepr;//价格
var columnShow;//判断限时秒抢栏目的显示
var token = localStorage.getItem('token');
var uri = localStorage.getItem('uri_goods');
var runing_status='';//判断秒杀进行状态
var enableds='';
var mart='';//秒杀价钱
var markett = localStorage.getItem('market_prices');//秒抢价
function accDiv(arg1, arg2) {
    var t1 = 0,
        t2 = 0,
        r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length;
    } catch(e) {}
    try {
        t2 = arg2.toString().split(".")[1].length;
    } catch(e) {}
    with(Math) {
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return(r1 / r2) * pow(10, t2 - t1);
    }
}
// 商品详情页的头部轮播
var swiper = new Swiper('.swiper-container', {
    pagination: {
        el: '.swiper-pagination',
    },
    observer: true, //修改swiper自己或子元素时，自动初始化swiper
    observeParents: true, //修改swiper的父元素时，自动初始化swiper
    autoplay: true, //自动切换
    onSlideChangeEnd: function(swiper) {
        swiper.update(); //swiper更新
    }
});

// 请求数据
$.ajax({
    url: domain_name_url + "/index",
    type: "GET",
    dataType: "jsonp", //指定服务器返回的数据类型
    data: {
        method: 'getSpu',
        spuId: uri,
        token: token,
        url_type: 'index'
    },
    success: function(data) {
        //商品的展示图
        var imglist = data.result.rs[2];
        var imgurl = jsel.match('.image_path', data.result.rs[2]);
        
        var listhtml = '';
        for(var i = 0; i < imgurl.length; i++) {
            listhtml += '<div class="swiper-slide showimg">' 
                     +'<img src=' + imgurl[i] + ' alt="" class="pimg"/>'
                     +'</div>';

        }
        $(".swiper-wrapper").html(listhtml);
        $(".pimg").click(function(){ 
            var _this = $(this);//将当前的pimg元素作为_this传入函数  
            imgShow("#outerdiv", "#innerdiv", "#bigimg", _this);  
        });
        function imgShow(outerdiv, innerdiv, bigimg, _this){  
            var src = _this.attr("src");//获取当前点击的pimg元素中的src属性  
            $(bigimg).attr("src", src);//设置#bigimg元素的src属性 
                /*获取当前点击图片的真实大小，并显示弹出层及大图*/  
            $("<img/>").attr("src", src).load(function(){  
                var windowW = $(window).width();//获取当前窗口宽度  
                var windowH = $(window).height();//获取当前窗口高度  
                var realWidth = this.width;//获取图片真实宽度  
                var realHeight = this.height;//获取图片真实高度  
                var imgWidth, imgHeight;  
                var scale = 1;//缩放尺寸，当图片真实宽度和高度大于窗口宽度和高度时进行缩放  
                  
                if(realHeight>windowH*scale) {//判断图片高度  
                    imgHeight = windowH*scale;//如大于窗口高度，图片高度进行缩放  
                    imgWidth = imgHeight/realHeight*realWidth;//等比例缩放宽度  
                    if(imgWidth>windowW*scale) {//如宽度扔大于窗口宽度  
                        imgWidth = windowW*scale;//再对宽度进行缩放  
                    }  
                } else if(realWidth>windowW*scale) {//如图片高度合适，判断图片宽度  
                    imgWidth = windowW*scale;//如大于窗口宽度，图片宽度进行缩放  
                    imgHeight = imgWidth/realWidth*realHeight;//等比例缩放高度  
                } else {//如果图片真实高度和宽度都符合要求，高宽不变  
                    imgWidth = realWidth;  
                    imgHeight = realHeight;  
                }  
                    $(bigimg).css("width",imgWidth);//以最终的宽度对图片缩放  
                  
                var w = (windowW-imgWidth)/2;//计算图片与窗口左边距  
                var h = (windowH-imgHeight)/2;//计算图片与窗口上边距  
                $(innerdiv).css({"top":"20%", "left":w});//设置#innerdiv的top和left属性  
                $(outerdiv).fadeIn("fast");//淡入显示#outerdiv及.pimg  
            });  
              
            $(outerdiv).click(function(){//再次点击淡出消失弹出层  
                $(this).fadeOut("fast");  
            });  
        }

        // 倒计时栏目
        var goodTime = data.result.rs[4].planGroupInfo;// 获取倒计时里面的东西
        var plan_group = goodTime[0].plan_group;//判断参加秒杀的商品
        runing_status =  goodTime[0].runing_status;//判断秒杀进行状态
        var Parameter = data.result.rs[5].sku;//商品属性sku
        // console.log(goodTime,plan_group,Parameter,'90')
         //时间的遍历
         if (plan_group == 1 && $(".redSeal").css("display")=='block' && runing_status !=3 ) {//plan_group == 1是参与秒抢的商品，
            for (var i = 0; i < goodTime.length; i++){
                //开始时间
                var startTime = goodTime[i].start_time;
                var startDate = new Date(startTime).getTime();
                startTime = "20" + startTime.substring(0, 2) + "/" + startTime.substring(2, 4) + "/" + startTime.substring(4, 6) + " " + startTime.substring(6, 8) + ":" + startTime.substring(8, 10) + ":" + startTime.substring(10, 12);
                var startDate = new Date(startTime).getTime();
                //结束时间
                var endTime = goodTime[i].end_time;
                endTime = "20" + endTime.substring(0, 2) + "/" + endTime.substring(2, 4) + "/" + endTime.substring(4, 6) + " " + endTime.substring(6, 8) + ":" + endTime.substring(8, 10) + ":" + endTime.substring(10, 12);
                var endDate = new Date(endTime).getTime();
                //获取系统当前时间
                var currentDate = new Date();
                currentDate = currentDate.getTime()
                //时间段要注意两种情况一种是刚进来就已经开始倒计时，还有就是到页面还没有倒计时，就用结束的时间减去当前的时间
                var totalSecond;//已经倒计时的参数
                var notCountdown//还没有倒计时
                //秒抢开始时间减去当前时间就是当前时间到开始倒计时之间的时间段
                var startSecond = startDate - currentDate;
                if (startSecond <= 0 || runing_status ==2) {//已经在倒计时了
                    totalSecond = parseInt((endDate - currentDate) / 1000);
                    // countdown(totalSecond)
                     //倒计时开始时间
                     setTimeout(function () {
                        countdown(totalSecond)
                        }, startSecond)
                    $("#redmark3").css("display","block");
                    $("#redmark2").css("display","none");
                } else if (startSecond > 0 || runing_status ==1) {//还没有倒计时
                    notCountdown = parseInt((endDate - startDate) / 1000);
                    var howmany = parseInt(startSecond / 1000);//当前时间到开始倒计时之间的时间段
                    countdown2(howmany)
                    //倒计时开始时间
                    setTimeout(function () {
                    countdown2(notCountdown)
                    }, startSecond)
                    $("#redmark2").css("display","block");
                    $("#redmark3").css("display","none");
                 }
                
              }
              //获得秒杀的价格
            //   for(var i=0;i<Parameter.length; i++){
            //     var marke =Parameter[i].sprice;
            //     console.log(marke,'oo')
            //      mart =(marke/100).toFixed(2);
            //     console.log(marke,mart,'78')
            //     document.getElementById('wallet').innerHTML= mart;
                
            //   }
    
               // 把秒抢价格加载到页面上
             var  money =(markett/100).toFixed(2);
              document.getElementById('wallet').innerHTML= money;
                $(".redSeal").css("display","block");
            }else{
                $(".redSeal").css("display","none");
            }
        

        //商品名称以及价格
        var spu_name = jsel.match('.spu_name', data.result.rs[1]);
        var makep = data.result.rs[5].sku[0];
        //库存
        inventory = makep.stock;
        localStorage.setItem('inventory',makep.stock);
        makepr = jsel.match('.market_price', makep);
        localStorage.setItem('makepr',makep.market_price);
        //秒杀价
        
        // 非会员
        var outside = jsel.match('.outsider_self', makep);
        // 会员
        var merside = jsel.match('.member_self', makep);
        var memberLevel = JSON.parse(localStorage.getItem('memberLevel'));
        var parentUserHasMark = JSON.parse(localStorage.getItem('parentUserHasMark'));

        // *************  商品信息  ******************************************

        var goodsInfo = '<p class="goods_title_p">' + spu_name[0] + '</p>';
        goodsInfo += '<ul class="price">';
        goodsInfo += '<li class="price_first">';
        goodsInfo += '<font class="price_style">￥<font style="font-size: 0.6rem;">' + accDiv(makepr, 100).toFixed(2) + '</font></font>';
        goodsInfo += '</li>';

        if(memberLevel == 0 && outside != 0) {
            goodsInfo += '<li class="price_third">';
            goodsInfo += '<span style="color:#595757;font-size:.3rem;">返现</span>';
            goodsInfo += '<font class="price_style">￥<font style="font-size: 0.5rem;">' + accDiv(outside, 100).toFixed(2) + '</font></font>';
            goodsInfo += '</li>';
        }

        if(memberLevel != 0 && merside != 0) {
            goodsInfo += '<li class="price_third">';
            goodsInfo += '<span style="color:#595757;font-size:.3rem;">返现</span>';
            goodsInfo += '<font class="price_style">￥<font style="font-size: 0.5rem;">' + accDiv(merside, 100).toFixed(2) + '</font></font>';
            goodsInfo += '</li>';
        }

        goodsInfo += '</ul>';
        goodsInfo += '<ul class="num">';
        goodsInfo += '<li class="num_expressfee">快递：0.00</li>';
        goodsInfo += '<li class="num_inventory">库存：<font>' + inventory + '</font></li>';
        goodsInfo += '</ul>';
        goodsInfo += '<div class="bg"></div>';
        goodsInfo += '<div class="cart_buy">';
        goodsInfo += '<p class="cart_buy_num">数量</p>';
        goodsInfo += '<div class="cart_buy_jianjia">';
        goodsInfo += '<div class="cart_buy_jian">-</div>';
        goodsInfo += '<form>';
        goodsInfo += '<input readonly="readonly" class="input cart_buy_input" value="1" id="goodQuantity">';
        goodsInfo += '</form>';
        goodsInfo += '<div class="cart_buy_jia title_layer" onclick="onIncrease(this)">+</div>';
        goodsInfo += '</div></div>';
        $(".main_center").html(goodsInfo);
        // 给全局的库存赋值
        // 替换佣金
        var spu_name = jsel.match('.spu_name', data.result.rs[5]);

        var oPrice = data.result.rs[5].sku[0];
        var commission;
        if(memberLevel == 0) {
            commission = (oPrice.market_price - oPrice.original_price) * oPrice.outsider_self / 10000;
        } else {
            commission = (oPrice.market_price - oPrice.original_price) * oPrice.member_self / 10000;
        }
        if(commission.toFixed(2) != 0) {
            $('.commission_sum').html('佣金 <i><em>￥</em>' + commission.toFixed(2) + '</i>');
        }

        // ***************************************************************

        // 商品详情
        var sGoodsDetail = data.result.rs[1].spuBase[0].detail;
        var goodsDetail = getGoodsDetail(sGoodsDetail);

        function getGoodsDetail(detail) {

            // 判断字符串是否为空 undefined 0
            if(typeof(detail) == "undefined" || detail == 0) {
                return "";
            }
            // 当前将换行符转换为↵
            detail = detail.replace(/\n\r/g, "↵");
            // 若有转换完成出现两个↵则替换为一个
            detail = detail.replace(/↵↵/g, "↵");
            // 因为会出现多种情况，为了避免截取之后出现多个空格，下面的截取成为数组之后没法判断第一个或者最后一个是几个空格
            // 需要将多个空格转化为一个空格
            detail = detail.replace(/\s+/g, " ");
            // console.log(detail)
            // 将替换好的字符串进行截取成数组
            var arr = detail.split(' ');

            // 去除第一个数组为空格
            if(arr[0] == ' ' || arr[0] == '') {
                arr.splice(0, 1);
            }
            //去除最后一个数组为空格
            if(arr[arr.length - 1] == '' || arr[arr.length - 1] == ' ') {
                arr.splice(arr.length - 1, 1);
            }
            // 整理成最终的格式
            var detailArr = [];
            for(var i = 0; i < arr.length; i++) {
                const element = arr[i];
                var tmpArr;
                var timpObj;
                if(element.indexOf('：') != -1) {
                    tmpArr = element.split('：');
                    timpObj = {
                        name: tmpArr[0],
                        value: tmpArr[1]
                    }
                } else if(element.indexOf(',') != -1) {
                    tmpArr = element
                    timpObj = {
                        value: tmpArr
                    }
                }
                detailArr.push(timpObj);
            }
            return detailArr;
        }
        // console.dir(goodsDetail);
        var template = ' <table cellspacing="0" cellpadding="0"><tbody>';
        for(var i = 0; i < goodsDetail.length; i++) {
            if(goodsDetail[i]) {
                template += '<tr><td>' + goodsDetail[i].name + '</td><td>' + goodsDetail[i].value + '</td></tr>';
            }
        }
        template += '</tbody></table>';
        $(".product_table").html(template);
        //选择商品的sku图片
        var imageurl = jsel.match('.image_path', data.result.rs[2]);
        var listhtml = '';
        for(var i = 0; i < spu_name.length; i++) {
            listhtml += '<img src=' + imageurl[0] + '>';
        }
        $(".contentspan").html(listhtml);
        //点击选择商品属性sku
        var imgdetail = data.result.rs[1];
        var spu_name = jsel.match('.spu_name', data.result.rs[1]);
        var listhtml = '<dd class="contentprice">';
        var RunningStatus = Parameter[0].runing_status;
        var enabled =  Parameter[0].enabled; 
        var currency = Parameter[0].sprice;
        if(RunningStatus ==1 || RunningStatus==3 || RunningStatus=='' || enabled==0 ){
             listhtml += '<span class="first">';
             listhtml += '<font>￥<font style="font-size: 0.38rem;" class="first_fot" id="first_fot_yy">' + accDiv(makepr, 100).toFixed(2) + '</font></font>';
             listhtml += '</span>';

         }
         if(enabled == 1 && RunningStatus == 2){
             listhtml += '<span class="first">';
             listhtml += '<font>￥<font style="font-size: 0.38rem;" class="first_fot first_fot_s">'+ accDiv(currency, 100).toFixed(2)  + '</font></font>';
             listhtml += '<font class="beis" style="margin-top:0.17rem;">(￥<font style="font-size: 0.22rem;;" class="first_fot first_fot_y">' + accDiv(makepr, 100).toFixed(2) + '</font>)</font> ';
             listhtml +='<font class="map" ><img class="seconds-kill" src="img/Secondskill.png" alt=""></font>';
             listhtml += '</span>';
            
         }     
        
       
        if(memberLevel == 0 && outside != 0) {
            listhtml += '<span class="second">返现';
            listhtml += '<font>￥<font style="font-size: 0.38rem;">' + accDiv(outside, 100) + '</font></font>';
            listhtml += '</span>';
        }
        if(memberLevel != 0 && merside != 0) {
            listhtml += '<span class="second">返现';
            listhtml += '<font>￥<font style="font-size: 0.38rem;">' + accDiv(merside, 100) + '</font></font>';
            listhtml += '</span>';
        }
        listhtml += '</dd>';
        listhtml += '<dd class="repertory">库存：<i>' + inventory + '</i></dd>';
        $(".contentdl").html(listhtml);
        var aa = jsel.match('.position', data.result.rs);
        var bb = jsel.match('.attribute_value', data.result.rs);
        var typeId = jsel.match('.id', data.result.rs[0]);
        var first_attribute = jsel.match('.first_attribute', data.result.rs[1]);
        var second_attribute = jsel.match('.second_attribute', data.result.rs[1]);
        var first_attribute_id = jsel.match('.first_attribute_id', data.result.rs[5]);
        var second_attribute_id = jsel.match('.second_attribute_id', data.result.rs[5]);
        var cc = []
        var ml = []
        for(var i = 0; i < aa.length; i++) {
            if(aa[i] == "1") {
                cc.push({
                    "type": bb[i],
                    "typeId": typeId[i]
                })
            } else if(aa[i] == "2") {
                ml.push({
                    "type": bb[i],
                    "typeId": typeId[i]
                })
            }
        }
        var listhtml = '';
        listhtml += '<p class="leixing_p">' + first_attribute[0] + '</p>';//款式那一行
        $(".leixing_div_p").html(listhtml);
        //口味
        var listhtml = '';
        for(var i = 0; i < cc.length; i++) {
            listhtml += '<ul class="leixing_ul" typeId=' + cc[i].typeId + '>' +
                '<li>' + cc[i].type + '</li>' +
                '</ul>';
        }
        $(".leixing_div_ul").html(listhtml);
        $(".leixing_div_ul").find('ul:first-child').addClass('choose_ul');

        //毫升title
        // 判断second_attribute_id是否为0
        for(var j=0;j<second_attribute_id.length;j++){
            if(second_attribute_id[j] != 0) {
                var listhtml = '';
                // for(var i = 0; i < second_attribute.length; i++) {
                //  listhtml += '<p class="xinghao_p">' + second_attribute[i] + '</p>';

                // }
                listhtml += '<p class="xinghao_p">' + second_attribute[0] + '</p>';
                $(".xinghao_div_p").html(listhtml);
                //类型规格毫升

                var listhtml = '';
                for(var i = 0; i < ml.length; i++) {
                    listhtml += '<ul class="xinghao_ul" typeId=' + ml[i].typeId + '>';
                    listhtml += '<li>' + ml[i].type + '</li>' ;
                    listhtml += '</ul>';
                }
                $(".xinghao_div_ul").html(listhtml);
                $(".xinghao_div_ul").find('ul:first-child').addClass('choose_ul');
            }
        }

        //商品详情页图片
        var imgdetail = data.result.rs[3];//弹框里面的商品图片
        var imgurl = jsel.match('.image_path', data.result.rs[3]);
        var listhtml = '';
        for(var i = 0; i < imgurl.length; i++) {
            listhtml += '<p class="details_goods_p">';
            listhtml += '<img src=' + imgurl[i] + ' alt="">' ;
            listhtml += '</p>';

        }
        $(".graphic_details_img").html(listhtml);
        leixing(data);
    }
});

$(function() {
    var _width = $(window).width();
    var _height = $(window).height();
    var _Theight = $("header").height();
    var _Bheight = $("footer").height();
    //alert("宽度:"+_mainHeight);
    //动态设置高度
    var _mainHeight = _height - _Theight - _Bheight;
    //alert("宽度:"+_mainHeight);
    $(".main").height(_mainHeight);

    /*基本信息,商品详情*/
    $(".tabtitle li").click(function() {
        var index = $(this).index();
        $(this).children("a").addClass("tabhover").parent().siblings().find("a").removeClass("tabhover");
        $(".tabcontent").eq(index).show(200).siblings(".tabcontent").hide();
    });
    
})

function leixing(data) {
    //类型选择
    var typeid1 = $(".leixing_div_ul ul").eq(0).attr("typeid");
    $(document).on("click", ".leixing_div_ul ul", function() {
        $(this).addClass('choose_ul').siblings('ul').removeClass('choose_ul');
        var typeid = $(this).attr("typeid");
        xinghao(data, typeid);
    });
    xinghao(data, typeid1);
}
//型号选择
function xinghao(data, typeid) {
    var sku = data.result.rs[5].sku;
    var typeidDom = $(".xinghao_div .xinghao_div_ul ul");
    var skuArr = [];
    var typeidDomArr=[];
    if(!typeidDom) {
        return
    }
    typeidDom.each(function(i,o){
        $(o).css({
            "display":"block"
        })
        
        typeidDomArr.push($(o).attr("typeid"))
    })
    $.each(sku, function(i, o) {
        if(o.first_attribute_id == typeid) {
            skuArr.push(o.second_attribute_id);
        }

    });
    var array1 = skuArr;
    var array2 = typeidDomArr;
    var result = [];
    for(var i = 0; i < array2.length; i++) {
        var obj = array2[i];
        var num = obj;
        var isExist = false;
        for(var j = 0; j < array1.length; j++) {
            var aj = array1[j];
            var n = aj;
            if(n == num) {
                isExist = true;
                break;
            }
        }
        if(!isExist) {
            result.push(obj);
        }
    }
    typeidDom.each(function(i,o){
        $.each(result, function(j,d) {
            if($(o).attr("typeid")==d){
                $(o).css({
                    "display":"none"
                })

            }
        });
    })
       
    var c=$(".xinghao_div_ul ul");
    var b;
    for(var i=c.length-1;i>=0;i--){
        if($(c[i]).css("display")=="block"){
            b=i;
        }
    }
    $(c).eq(b).addClass("choose_ul").siblings('ul').removeClass('choose_ul');
    // console.log(b)
    //点击切换背景颜色
    $(document).off("click", ".xinghao_div_ul ul").on("click", ".xinghao_div_ul ul", function() {
        $(this).addClass('choose_ul').siblings('ul').removeClass('choose_ul');
        changeModel(data);
    });
    $(document).off("click", ".leixing_div_ul ul").on("click", ".leixing_div_ul ul", function() {
        $(this).addClass('choose_ul').siblings('ul').removeClass('choose_ul');
        changeModel1(data);
        changeModel(data);
    });
}
// 切换型号库存和价格改变
function changeModel(data){
    var sku = data.result.rs[5].sku;
    var goodsType1=$(".leixing_ul.choose_ul").eq(1).attr("typeid");
    var goodsType2=$(".xinghao_ul.choose_ul").eq(1).attr("typeid");
    var listhtml='';
    $.each(sku, function(i,o) {
        if(o.first_attribute_id==goodsType1 && o.second_attribute_id==goodsType2){
            var RunningStatus = o.runing_status;
             enableds = o.enabled;
            inventory = o.stock;//库存
            localStorage.setItem("inventory", o.stock);
            makepr = o.market_price//价格
            mart = o.sprice//秒杀价格
            localStorage.setItem("makepr", o.market_price);
            localStorage.setItem("mart", o.sprice);
            $('.repertory i').html(inventory);
            $('.num_inventory font').html(inventory);
            $('.price_style font').html(accDiv(makepr, 100).toFixed(2));
            $('.first_fot').html(accDiv(makepr, 100).toFixed(2));
            if(enableds == 0 || RunningStatus ==1 || RunningStatus==3 || RunningStatus==''){
                $('.price_style font').html(accDiv(makepr, 100).toFixed(2));
                listhtml += '<span class="first" style="font-size: 0.22rem;margin-top: .4rem;color: #e40012;">';
                listhtml += '<font>￥<font style="font-size: 0.38rem;" class="first_fot" id="first_fot_yy">' + accDiv(makepr, 100).toFixed(2) + '</font></font>';
                listhtml += '</span>';
            }
            if(enableds ==1 && RunningStatus == 2){
                $('.price_style font').html(accDiv(mart, 100).toFixed(2));
                listhtml += '<span class="first" style="font-size: 0.22rem;margin-top: .4rem;color: #e40012;">';
                listhtml += '<font>￥<font style="font-size: 0.38rem;" class="first_fot first_fot_s">'+ accDiv(mart, 100).toFixed(2)  + '</font></font>';
                listhtml += '<font class="beis" style="margin-top:0.17rem;text-decoration: line-through;font-weight: bold; margin-left: 0.3rem;color: #999999;">(￥<font style="font-size: 0.22rem;;" class="first_fot first_fot_y">' + accDiv(makepr, 100).toFixed(2) + '</font>)</font> ';
                listhtml +='<font class="map" style="width: 0.40rem;height: 0.26rem;margin-left: 0.14rem;" ><img class="seconds-kill" style="width: 0.40rem; height: .26rem;border-radius: 0.04rem;" src="img/Secondskill.png" alt=""></font>';
                listhtml += '</span>';
            }
            listhtml += '</dd>';
            listhtml += '<dd class="repertory">库存：<i>' + inventory + '</i></dd>';
            $(".contentdl").html(listhtml);
        }
        
    });
}
function changeModel1(data){
    var sku = data.result.rs[5].sku;
    var goodsType1=$(".leixing_ul.choose_ul").eq(1).attr("typeid");
    var goodsType2=$(".xinghao_ul.choose_ul").eq(1).attr("typeid");
    var listhtml='';
    $.each(sku, function(i,o) {
        if(o.first_attribute_id==goodsType1){
            console.log(o,'p')
            var RunningStatus = o.runing_status;
             enableds = o.enabled;
            inventory = o.stock;//库存
            localStorage.setItem("inventory", o.stock);
            makepr = o.market_price//价格
            mart = o.sprice//秒杀价格
            localStorage.setItem("makepr", o.market_price);
            localStorage.setItem("mart", o.sprice);
           
            $('.repertory i').html(inventory);
            $('.num_inventory font').html(inventory);
            if(enableds == 0 || RunningStatus ==1 || RunningStatus==3 || RunningStatus==''){
                $('.price_style font').html(accDiv(makepr, 100).toFixed(2));
                listhtml += '<span class="first" style="font-size: 0.22rem;margin-top: .4rem;color: #e40012;">';
                listhtml += '<font>￥<font style="font-size: 0.38rem;" class="first_fot" id="first_fot_yy">' + accDiv(makepr, 100).toFixed(2) + '</font></font>';
                listhtml += '</span>';
            }
            if(enableds ==1 && RunningStatus == 2){
                $('.price_style font').html(accDiv(mart, 100).toFixed(2));
                listhtml += '<span class="first" style="font-size: 0.22rem;margin-top: .4rem;color: #e40012;">';
                listhtml += '<font>￥<font style="font-size: 0.38rem;" class="first_fot first_fot_s">'+ accDiv(mart, 100).toFixed(2)  + '</font></font>';
                listhtml += '<font class="beis" style="margin-top:0.17rem;text-decoration: line-through;font-weight: bold; margin-left: 0.3rem;color: #999999;">(￥<font style="font-size: 0.22rem;;" class="first_fot first_fot_y">' + accDiv(makepr, 100).toFixed(2) + '</font>)</font> ';
                listhtml +='<font class="map" style="width: 0.40rem;height: 0.26rem;margin-left: 0.14rem;" ><img class="seconds-kill" style="width: 0.40rem; height: .26rem;border-radius: 0.04rem;" src="img/Secondskill.png" alt=""></font>';
                listhtml += '</span>';
            }
            listhtml += '</dd>';
            listhtml += '<dd class="repertory">库存：<i>' + inventory + '</i></dd>';
            $(".contentdl").html(listhtml);
            
        }
    });
}
/*弹出层的商品*/
    $('.go_layer').click(function() {
        $('.go_layer').css('cursor', 'pointer');
        layer.open({
            type: 1,
            content: $('.cart_tanchuang').html(),
            anim: 'up',
            scrollbar: false,
            shadeClose: false,
            style: 'position:fixed; bottom:0; left:0; width: 100%;height: auto;min-height: 500px;border:none;'
        });
        $('.input').val($('#goodQuantity').val());
    });
    
    //购物车减商品数量
    $(document).on("click", ".cart_buy_jian", function() {
        $('.cart_buy_jian').css('cursor', 'pointer');
        var num = $(".input").val()
        // console.log(num);
        if(num > 1) {
            $(".input").val(num - 1);
        } else if(num == 1) {
            $('.cart_buy_jian').css("color", "#666");
        }

    });

    /*点叉号按钮关闭所有的页面层*/
    $(document).on("click", ".contentspan_cha img", function() {
        layer.closeAll('page');

    });
    /*点确定按钮关闭所有的页面层*/
    $(document).on("click", ".queding_btn a", function() {
        $('.queding_btn a').css('cursor', 'pointer');
        var num, typeId, modelId, urlObj;
        num = $(".input").val();
        typeId = $(".leixing_div_ul .choose_ul").eq(1).attr("typeId");
        modelId = $(".xinghao_div_ul .choose_ul").eq(1).attr("typeId");
        urlObj = urlparam();
        // console.log(urlObj)
        localStorage.setItem('typeId', $(".leixing_div_ul .choose_ul").eq(1).attr("typeId"))
        localStorage.setItem('modelId', $(".xinghao_div_ul .choose_ul").eq(1).attr("typeId"))
        localStorage.setItem('num', $(".input").val());
    
        if(token == null) {
            layer.open({
                content: '请先登录',
                skin: 'msg',
                time: 2
            });

            var url = window.location.href;
            setTimeout("location.href='login.html?url=" + url + "'", 1000);
            localStorage.setItem('url', window.location.href);
        } else {
            window.location.href = 'confirm_order.html?spuId=' + urlObj.spuId + '&typeId=' + typeId + '&modelId=' + modelId + '&num=' + num ;
        }
        

    });
 
function onIncrease(ele) {
    $('.cart_buy_jian').css("color", "#b61c25");
    var eleInput = $(ele).prev().children().eq(0);
    var num = eleInput.val() - 0;
    if(num >= inventory) {
        $(document).on("click", ".title_layer", function() {
            layer.open({
                content: '库存不足',
                skin: 'msg',
                time: 2 //2秒后自动关闭
            });
        });
        return false;
    }
    $(".input").val(++num);

}
var lurl = window.location.href;
var gurl = localStorage.getItem('gurl');

$('.title_top_first').click(function(){
    if(lurl.indexOf("url") !== -1){
        window.location.href=gurl;
    }else{
        window.location.href = 'index.html';
       
    }
})

// 回到顶部
$(window).scroll(function() {
    if($(window).scrollTop() > 300) {
        $('.go_top').fadeIn(300);
    } else {
        $('.go_top').fadeOut(200);
    }
});
$('.go_top').click(function() {
    $('body,html').animate({
        scrollTop: 0
    }, 300);
})

//回到首页
$(document).on("click", ".go_back", function() {
    window.location.href='index.html';
})
//  倒计时方法
function countdown (totalSecond){
    var that=this;
    clearInterval(that.interval);
    that.interval = setInterval(function () {
    // 总秒数
    var second = totalSecond;
    // 天数位
    var day = Math.floor(second / 3600 / 24);
    var dayStr = day.toString();
    if (dayStr.length == 1) dayStr = '0' + dayStr;
    // 小时位
    var hr = Math.floor((second - day * 3600 * 24) / 3600);
    var hrStr = hr.toString();
    if (hrStr.length == 1) hrStr = '0' + hrStr;

    // 分钟位
    var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
    var minStr = min.toString();
    if (minStr.length == 1) minStr = '0' + minStr;

    // 秒位
    var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;;
    var secStr = sec.toString();
    if (secStr.length == 1) secStr = '0' + secStr;
    //将倒计时赋值到div中,离结束时间
    document.getElementById("timer2").innerHTML = hrStr +':' +  minStr + ':' +secStr;  
    // document.getElementById("timer2").innerHTML = hrStr +':' +  minStr + ':' +secStr; 
    totalSecond--;
    if (totalSecond <= 0) {
        clearInterval(that.interval);
    }
    }.bind(that), 1000);

}
function countdown2 (notCountdown){
    var that=this;
    clearInterval(that.interval);
    that.interval = setInterval(function () {
    // 总秒数
    var second = notCountdown;
    // 天数位
    var day = Math.floor(second / 3600 / 24);
    var dayStr = day.toString();
    if (dayStr.length == 1) dayStr = '0' + dayStr;
    // 小时位
    var hr = Math.floor((second - day * 3600 * 24) / 3600);
    var hrStr = hr.toString();
    if (hrStr.length == 1) hrStr = '0' + hrStr;

    // 分钟位
    var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
    var minStr = min.toString();
    if (minStr.length == 1) minStr = '0' + minStr;

    // 秒位
    var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;;
    var secStr = sec.toString();
    if (secStr.length == 1) secStr = '0' + secStr;
    //将倒计时赋值到div中,离开始时间
    document.getElementById("timer").innerHTML = hrStr +':' +  minStr + ':' +secStr; 
    notCountdown--;
    if (notCountdown <= 0) {
        clearInterval(that.interval);
    }
    }.bind(that), 1000);

}