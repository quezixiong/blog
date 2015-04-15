$(document).ready(function() {
    $('#btn_video').hide();
    var videonum = videolist.length;

    //<iframe height=498 width=510 src="http://player.youku.com/embed/XOTIxNTUxMDIw" frameborder=0 allowfullscreen></iframe>

    //根据视频个数生成图片预览列表
    //for(var i = 0; i < videonum; i++){
    //    $("#div_img").append("<img id='img" + i + "' src='" + videolist[i].imgsrc +
    //        "' data-toggle='modal' data-target='#myModal'></img>");
    //}

    for(var i = 0; i < videonum; i++){
        $("#div_img").append("<iframe id='cur_video"+i+"' width='450' height='320' src='"+ videolist[i].videosrc + " 'frameborder='1' allowfullscreen></iframe>");
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
        switch_to(current-1);
        cur_video[current+1].src = videolist[current+1].videosrc;
        if(current - 1 < 0){
            switch_to(4);
        }
    });
    $('#imgnext').click(function(){
        switch_to(current+1);
        cur_video[current-1].src = videolist[current-1].videosrc;

        if(current + 1 > videonum){
            switch_to(0);
        }
    });

    for(var i = 0; i < videonum; i++){
        //方块导航事件添加
        $('#li'+i).click(function(event){
            var id = parseInt(event.target.id.substr(2,1));
            switch_to(id);
        });
        // 显示播放按钮事件
        //$('#img'+i).mouseover(function(event){
        //    var id = parseInt(event.target.id.substr(3,1));
        //    if(id == current){
        //        $('#btn_video').show();
        //    }
        //});
        //$('#img'+i).mouseout(function(event){
        //    var id = parseInt(event.target.id.substr(3,1));
        //    if(id == current){
        //        $('#btn_video').hide();
        //    }
        //});
        //点击图片事件
        //$('#img'+i).click(function(event) {
        //    var id = parseInt(event.target.id.substr(3,1));
        //    //var videoname = videolist[id].name;
        //    $('#cur_video').attr({"poster":videolist[id].imgsrc, "src":videolist[id].videosrc});
        //    if(id != current){
        //        switch_to(id);
        //    }
        //});
    }

    //播放按钮事件添加
    //$('#btn_video').mouseover (function(){
    //    $('#btn_video').show();
    //});
    //$('#btn_video').click(function(){
    //    //var videoname = videolist[current].name;
    //    $('#cur_video').attr({"poster":videolist[current].imgsrc, "src":videolist[current].videosrc});
    //    $('#btn_video').hide();
    //});
    //var cur_video = document.getElementById("cur_video");
    //$('#myModal').on('hidden.bs.modal', function(){
    //    //if(!cur_video.src)
    //        cur_video.src = "";
    //});

    function switch_to(id){
        //if(id < 0 || id >= videonum)
        //    return;
        $('.innerimg').animate({left:'-='+(id-current)*510+'px'},500,function(){});
        current = id;
        $('li').removeClass("hover-style");
        $('#li'+current).addClass("hover-style");
        //$('img').removeClass("img-current");
        //$('#img'+ current).addClass("img-current");
    }
});



