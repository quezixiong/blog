$(document).ready(function() {
    $('#btn_video').hide();
    var videonum = videolist.length;
    $(".pre,.next").hover(function(){
        $(this).attr("src","carousel/imgs/pre2.png");
    },function(){
        $(this).attr("src","carousel/imgs/pre1.png");
    });

    //根据视频个数生成图片预览列表
    for(var i = 0; i < videonum; i++){
        $("#div_img").append("<img id='img" + i + "' src='" + videolist[i].imgsrc + "'></img>");
        $("#article-title").append("<div id='title"+i+"'>"+videolist[i].headerinfo+"</div>");
        $("#play-full-story").append("<div id='play-full"+i+"'><span>play full story</span></div>");
    }
    //根据视频个数生成下面方块导航列表
    for(var i = 0; i < videonum; i++){
        $(".ol_nav .next").before("<li id=li"+i+"></li>");
    }
    var current = 0; //记录当前视频、视频预览
    //为.cover定位，根据＃li0定位
    $(".cover").position({
        my: "center center",
        at: "center center",
        of: $('#li'+current)
    });
    //当浏览器窗口大小变化时触发
    window.onresize= function(){
        $(".cover").position({
            my: "center center",
            at: "center center",
            of: $('#li'+current)
        });
        if($(window).width()< 1170){
            $("#sidebarWrapper").css("position","relative");
        }
        if($(window).width()> 1200){
            $("#sidebarWrapper").css("position","absolute");
        }
    }
    //当前视频预览图显示初始化
    switch_to(current);

    //鼠标滑过li时，出现文字的标题
    $(".ol_nav li").hover(function(){
        var id = parseInt(event.target.id.substr(2,1));
        $(this).attr({"data-toggle":"tooltip","data-placement":"bottom","title":videolist[id].head});
    },function(){});
    //$(".ol_nav li").tooltip();
    $('[data-toggle="tooltip"]').tooltip();

    //左右箭头事件
    $('#imgpre, .pre').click(function(){
        switch_to(current-1);
    });
    $('#imgnext, .next').click(function(){
        if(current + 1 >= videonum){
            switch_to(0);
        }else{
            switch_to(current+1);
        }
    });

    for(var i = 0; i < videonum; i++){
        //方块导航事件添加
        $('#li'+i).click(function(event){
            var id = parseInt(event.target.id.substr(2,1));
            switch_to(id);
        });
        //显示播放按钮事件
         $('#img'+i).hover(function(evevt){
                 var id = parseInt(event.target.id.substr(3,1));
                 if(id == current){
                     $('#btn_video').show();
                 }
         },
         function(event){
             var id = parseInt(event.target.id.substr(3,1));
             if(id == current){
                 $('#btn_video').hide();
             }
         });
        //点击当前图片可播放，两侧图片可滑动
        $('#img'+i).click(function(event) {
            var id = parseInt(event.target.id.substr(3,1));
            if(id != current) {
                switch_to(id);
            }else{
                show_cur_video();
            }
        });
    }

    //播放按钮事件添加
    $('#btn_video').mouseover(function(){
        $('#btn_video').show();
    });
    $('#btn_video').click(function(){
        show_cur_video();
    });

    // video modal 被隐藏时事件 --- 关闭视频
    //$("#videoModal").on("hide.bs.modal", function(){
    //    $("iframe").attr({"src":""});
    //});

    var show_cur_video = function(){
        //$("iframe").attr({"src":videolist[current].videosrc});
        $("#title"+current).css("color","#fff");
        $('#btn_video').hide();
        $("#videoModal").modal('show');
    };

    function switch_to(id){
        if(id<0)return;
        $('.innerimg').animate({left:'-='+(id-current)*510+'px'},500,function(){});
        $('.cover').animate({left:'+='+(id-current)*20+'px'},500,function(){});
        current = id;
        $('.ol_nav li').css("background-color","#444");
        $('#li'+current).css("background-color","#5f5f5f");

        $(".innerimg img").css({"opacity":"0.5"});//切换时所有的img暗下来，只有当前图片亮
        $("#img"+current).css({"opacity":"1"});
        $("#article-title div").css("color","#888");//切换时所有的标题暗下来，只有当前亮
        $("#title"+current).css("color","#fff");

        $("#play-full-story div").css({"height": "1px","top": "-61px","opacity":"0"});
        $("#play-full-story #play-full"+current).css({"height": "26px","top": "-86px","opacity":"1"});
        //为modal上的div添加标题
        $(".modal-videotitle").text(videolist[current].title);
        player = new YKU.Player('youkuplayer',{
            styleid: '0',
            client_id: '019ae968a3e28cbd',
            vid: videolist[current].src,
            autoplay: true
        });
    }
});
