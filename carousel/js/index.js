$(document).ready(function() {
    $('#btn_video').hide();
    var videonum = videolist.length;

    //根据视频个数生成图片预览列表
    for(var i = 0; i < videonum; i++){
        $("#div_img").append("<img id='img" + i + "' src='" + videolist[i].imgsrc + "'></img>");
        $("#article-title").append("<div id='title"+i+"'>"+videolist[i].headerinfo+"</div>");
    }

    //根据视频个数生成下面方块导航列表
    for(var i = 0; i < videonum; i++){
        $(".ol_nav").append("<div class='cover' id=coverli"+i+"><li id=li"+i+"></li></div>");
    }
    //当前视频预览图显示初始化
    var current = 0; //记录当前视频、视频预览
    switch_to(current);
    //箭头导航事件添加
    var cur_video = document.getElementsByTagName("#cur_video");

    $(".ol_nav li").hover(function(){
        var id = parseInt(event.target.id.substr(2,1));
        $(this).attr({"title":videolist[id].head,"data-toggle":"tooltip","data-placement":"top"});
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
        $("#img"+current).css({"background-color":"#333","visibility":"visible"});
        $("#article-title div").css("color","#888");
        current = id;
        $('li').removeClass("hover-style");
        $('#li'+current).addClass("hover-style");
        $("iframe").css("z-index",-1).attr("src","");
        $(".innerimg img").css({"opacity":"0.5"});
        $("#title"+current).css("color","#fff");
        $("#img"+current).css({"opacity":"1"});

    }
    $(".ol_nav li").tooltip();
});
