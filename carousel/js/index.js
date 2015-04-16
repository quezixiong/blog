$(document).ready(function() {
    $('#btn_video').hide();
    var videonum = videolist.length;

    //<iframe height=498 width=510 src="http://player.youku.com/embed/XOTIxNTUxMDIw" frameborder=0 allowfullscreen></iframe>

    //根据视频个数生成图片预览列表
    for(var i = 0; i < videonum; i++){
        $("#div_img").append("<img id='img" + i + "' src='" + videolist[i].imgsrc + "'></img>");
        //$("#div_img").append("<iframe id='cur_video"+i+"' width='450' height='320' src='"+ videolist[i].videosrc + " 'frameborder='1' allowfullscreen></iframe>");
        $("#article-title").append("<div id='title"+i+"'>"+videolist[i].headerinfo+"</div>");
    }

    //根据视频个数生成下面方块导航列表
    for(var i = 0; i < videonum; i++){
        $(".ol_nav").append("<li id=li"+i+"></li>");
    }
    //当前视频预览图显示初始化
    var current = 0; //记录当前视频、视频预览
    switch_to(current);
    //箭头导航事件添加
    var cur_video = document.getElementsByTagName("iframe");

    $('#imgpre').click(function(){
        $("#img"+current).css("visibility","visible");
        $("#article-title div").css("color","#888");

        switch_to(current-1);

        //if(current - 1 < 0){
        //    switch_to(4);
        //}
    });
    $('#imgnext').click(function(){
        $("#img"+current).css("visibility","visible");
        $("#article-title div").css("color","#888");

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
        var cur_video = document.getElementsByTagName("iframe");

        $('#img'+i).click(function(event) {
            var id = parseInt(event.target.id.substr(3,1));
            $("iframe").attr({"src":videolist[id].videosrc+"?isAutoPlay=true"});
            $("iframe").css({"z-index":1,"left":"140px","top":"2px","margin-right":"50px","zoom":"103%"});
            $("#img"+id).css({"visibility":"hidden"});
            $(".innerimg img").css("opacity","0.3");

            $("#title"+id).css("color","#fff");

            //$("#div_img").append("<iframe id='cur_video"+id+"' width='450' height='320' src='"+ videolist[id].videosrc + " 'frameborder='1' allowfullscreen></iframe>");
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

        $("iframe").attr({"src":videolist[current].videosrc,"width":"500","height":"340"});
        $("iframe").css({"z-index":1,"left":"140px","top":"2px","margin-right":"50px","zoom":"103%"});
        $("#img"+current).css({"visibility":"hidden"});
        $(".innerimg img").css("opacity","0.3");

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
        current = id;
        $('li').removeClass("hover-style");
        $('#li'+current).addClass("hover-style");
        $("iframe").css("z-index",-1);
        $(".innerimg img").css({"opacity":"1"});
        $("#article-title").css("color","#888");

        //$('img').removeClass("img-current");
        //$('#img'+ current).addClass("img-current");
    }
});



