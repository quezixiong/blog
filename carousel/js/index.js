$(document).ready(function() {
    $('#btn_video').hide();
    var videonum = videolist.length;
    $(".pre").hover(function(){
        $(".pre").attr("src","carousel/imgs/pre2.png");
    },function(){
        $(".pre").attr("src","carousel/imgs/pre1.png");
    });
    $(".next").hover(function(){
        $(".next").attr("src","carousel/imgs/pre2.png");
    },function(){
        $(".next").attr("src","carousel/imgs/pre1.png");
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
    $(".cover").position({
        my: "center center",
        at: "center center",
        of: $('#li'+current)
    });
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
    //<div  class='cover' id=coverli"+i+">
    //当前视频预览图显示初始化
    switch_to(current);
    //箭头导航事件添加
    var cur_video = document.getElementsByTagName("#cur_video");

    $(".ol_nav .cover li").tooltip();
    $('[data-toggle="tooltip"]').tooltip();
    $(".ol_nav li").hover(function(){
        var id = parseInt(event.target.id.substr(2,1));
        $(this).attr({"data-toggle":"tooltip","data-placement":"top","title":videolist[id].head});
    },function(){});

    $('#imgpre').click(function(){
        $("#img"+current).css("visibility","visible");

        switch_to(current-1);

        //if(current - 1 < 0){
        //    switch_to(4);
        //}
    });
    $('.pre').click(function(){
        $("#img"+current).css("visibility","visible");

        switch_to(current-1);

        //if(current - 1 < 0){
        //    switch_to(4);
        //}
    });
    $('#imgnext').click(function(){
        $("#img"+current).css("visibility","visible");

        switch_to(current+1);

        if(current + 1 > videonum){
            switch_to(0);
        }
    });
    $('.next').click(function(){
        $("#img"+current).css("visibility","visible");

        switch_to(current+1);

        if(current + 1 > videonum){
            switch_to(0);
        }
    });
    //$("#coverli"+current).css({"visibility":"visible"});
    for(var i = 0; i < videonum; i++){
        //方块导航事件添加
        $('#li'+i).click(function(event){
            var id = parseInt(event.target.id.substr(2,1));
            $("img").css("visibility","visible");
            //$("#coverli"+id).css({"visibility":"visible"});
            switch_to(id);
        });
        //显示播放按钮事件
        $('#img'+i).mouseover(function(event){
            var id = parseInt(event.target.id.substr(3,1));
            if(id == current){
                $('#btn_video').show();
            }
        });
        $('#img'+i).mouseout(function(event){
            var id = parseInt(event.target.id.substr(3,1));
            if(id == current){
                $('#btn_video').hide();
            }
        });

        $('#img'+i).click(function(event) {
            var id = parseInt(event.target.id.substr(3,1));
            if(id != current) {
                switch_to(id);
            }else{
                show_cur_video();
            }
        });
    }

    $(".modal-videotitle").append(videolist[current].title);
    //播放按钮事件添加
    $('#btn_video').mouseover (function(){
        $('#btn_video').show();
    });
    $('#btn_video').click(function(){
        show_cur_video();
    });

    // video modal 被隐藏时事件 --- 关闭视频
    $("#videoModal").on("hide.bs.modal", function(){
        $("iframe").attr({"src":""});
    });


    var show_cur_video = function(){
        $("iframe").attr({"src":videolist[current].videosrc});
        $("iframe").css({"z-index":1});
        //$(".innerimg img").css("opacity","0.5");
        $("#title"+current).css("color","#fff");
        $('#btn_video').hide();
        $("#videoModal").modal('show');
    };

    function switch_to(id){
        //if(id < 0 || id >= videonum)
        //    return;
        if(id<0)return;
        $('.innerimg').animate({left:'-='+(id-current)*510+'px'},500,function(){});
        $('.cover').animate({left:'+='+(id-current)*20+'px'},500,function(){});
        $("#img"+current).css({"background-color":"#333","visibility":"visible"});
        $("#article-title div").css("color","#888");
        current = id;
        $('.ol_nav li').css("background-color","#444");
        $('#li'+current).css("background-color","#5f5f5f");

        //$('li').removeClass("hover-style");
        //$('#li'+current).addClass("hover-style");

        $("iframe").css("z-index",-1).attr("src","");
        $(".innerimg img").css({"opacity":"0.5"});
        $("#title"+current).css("color","#fff");
        $("#img"+current).css({"opacity":"1"});

        $("#play-full-story div").css({"height": "1px","top": "-61px","opacity":"0"});
        $("#play-full-story #play-full"+current).css({"height": "26px","top": "-86px","opacity":"1"});
    }

});
