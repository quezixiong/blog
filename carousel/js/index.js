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
        $(".ol_nav").append("<div id=coverli"+i+"><li id=li"+i+"></li></div>");
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
    for(var i = 0; i < videonum; i++){
        //方块导航事件添加
        $('#li'+i).click(function(event){
            var id = parseInt(event.target.id.substr(2,1));
            $("img").css("visibility","visible");

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
        //点击图片事件
        //var cur_video = document.getElementsByTagName("#cur_video");

        $('#img'+i).click(function(event) {
            var id = parseInt(event.target.id.substr(3,1));
            $("iframe").attr({"src":videolist[id].videosrc});
            $('iframe').attr('src', $('iframe').attr('src'));
            $("iframe").css({"z-index":1,"margin-right":"40px"});
            //$("iframe").animate({width:"543px",height:"360px","zoom":"103%"},"slow",function(){});
            //$("iframe").css({"z-index":1,"left":"183px","top":"2px","margin-right":"50px"});
            //$("iframe").animate({width:"543px",height:"360px","zoom":"103%"},"slow",function(){});
            if(id == current) {
                $("#img" + id).css({"visibility": "hidden"});
                $("#title"+id).css("color","#fff");
            }
            $(".innerimg img").css("opacity","0.5");

            $('#btn_video').hide();

            if(id != current){
                switch_to(id);
            }
        });
    }

    //播放按钮事件添加
    $('#btn_video').mouseover (function(){
        $('#btn_video').show();
    });
    $('#btn_video').click(function(){
        $("iframe").attr({"src":videolist[current].videosrc});
        $('iframe').attr('src', $('iframe').attr('src'));
        $("iframe").css({"z-index":1,"margin-right":"40px"});

        $("#img"+current).css({"visibility":"hidden"});
        $(".innerimg img").css("opacity","0.5");

        $("#title"+current).css("color","#fff");
        $('#btn_video').hide();
    });
    //var cur_video = document.getElementById("cur_video");
    //$('#myModal').on('hidden.bs.modal', function(){
    //    //if(!cur_video.src)
    //        cur_video.src = "";
    //});

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
