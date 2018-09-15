window.onload = function () {
    var allItems = $(".rec-image");
    var recommend = $("#song-recommend");
    var pre = document.getElementsByClassName("pre")[0];
    var next = document.getElementsByClassName("next")[0];
    var rec_slider= document.getElementById("rec-slider-ul");

    pre.onclick = function () {
        slider(rec_slider,1200);
    };

    next.onclick = function () {
        slider(rec_slider,-1200);
    };



    recommend.mouseover(function () {
        $(".pre").animate({left:"0"},500);
        $(".next").animate({right:"0"},500);



        for (var i=0; i<allItems.length; i++){
            (function (i) {
                var item = allItems[i];
                item.style.transition = "all 2s";
                item.onmouseover = function () {
                    item.children[0].className = 'rec-image-current';
                    //item.children[1].className = 'rec-image-current';
                    //$("#playCanvas").fadeIn(500);
                    item.onmouseout = function () {
                        item.children[0].className = '';
                        //item.children[1].className = '';
                        // $("#playCanvas").fadeOut(500);
                    }
                };

                recommend.bind("mouseleave",function () {
                    $(".pre").stop().animate({left:"-80px"},200);
                    $(".next").stop().animate({right:"-80px"},200);

                });

            })(i)
        }




    });


};

function slider(obj,ftarget) {
    var begin = 0,end = ftarget,target = 20;
    var dir = begin > end ? -target : target;
    console.log(end);
    console.log(dir);
    var timer = setInterval(function () {
        obj.style.left = obj.offsetLeft + dir + 'px';
        begin = begin + dir;
        if (Math.abs(begin) >= Math.abs(end)){
            clearInterval(timer);
        }
    },20);

}