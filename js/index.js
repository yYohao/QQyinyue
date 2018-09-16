window.onload = function () {
    var allItems = $(".rec-image");
    var recommend = $("#song-recommend");
    var pre = document.getElementsByClassName("pre")[0];
    var next = document.getElementsByClassName("next")[0];
    var rec_slider= document.getElementById("rec-slider-ul");
    var current_mark = document.getElementById("current-mark");
    var currentIndex = 1, nextIndex = 0;
    //左箭头点击事件
    pre.onclick = function () {
        pre_action(currentIndex,nextIndex,rec_slider,current_mark,
            function (x, y) {
                currentIndex = x;
                nextIndex = y;
            })
    };
    //右箭头点击事件
    next.onclick = function () {
        next_action(currentIndex,nextIndex,rec_slider,current_mark,
            function (x, y) {
                currentIndex = x;
                nextIndex = y;
            })
    };
    //标记点击事件
    current_mark.children[0].onclick = function () {
        if(currentIndex === 0){
            pre_action(currentIndex,nextIndex,rec_slider,current_mark,
                function (x, y) {
                    currentIndex = x;
                    nextIndex = y;
                })
        }
    };

    current_mark.children[1].onclick = function() {
        next_action(currentIndex,nextIndex,rec_slider,current_mark,
            function (x, y) {
                currentIndex = x;
                nextIndex = y;
            })
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


/**
 * 轮播动画
 * @param obj1  {document}
 * @param obj2  {document}
 * @param ftarget   {number}
 */
function slider(obj1,obj2,ftarget) {
    var begin = 0,end = ftarget,target = 20;
    var dir = begin > end ? -target : target;
    var timer = setInterval(function () {
        obj1.style.left = obj1.offsetLeft + dir + 'px';
        obj2.style.left = obj2.offsetLeft + dir + 'px';
        begin = begin + dir;
        if (Math.abs(begin) >= Math.abs(end)){
            clearInterval(timer);
        }
    },10);

}

function pre_action(currentIndex,nextIndex , slider_dom, mark,callback) {
    if (currentIndex === 1){
        slider_dom.children[currentIndex].style.left = "0px";
        console.log(slider_dom.children[currentIndex]);
        slider(slider_dom.children[0], slider_dom.children[1],1200);
        currentIndex = 0;
        nextIndex = 1;
    } else {
        slider_dom.children[currentIndex].style.left = "0px";
        console.log(slider_dom.children[currentIndex]);
        slider(slider_dom.children[0], slider_dom.children[1],1200);
        currentIndex = 1;
        nextIndex = 0;
    }
    callback(currentIndex, nextIndex);
    mark.children[nextIndex].className = "current_mark mark_seleced";
    mark.children[currentIndex].className = "current_mark";
}

function next_action(currentIndex,nextIndex , slider_dom, mark,callback) {
    if (currentIndex === 1){
        slider_dom.children[currentIndex].style.left = "2400px";
        console.log(slider_dom.children[currentIndex]);
        slider(slider_dom.children[0], slider_dom.children[1],-1200);
        currentIndex = 0;
        nextIndex = 1;
    } else {
        slider_dom.children[currentIndex].style.left = "2400px";
        console.log(slider_dom.children[currentIndex]);
        slider(slider_dom.children[0], slider_dom.children[1],-1200);
        currentIndex = 1;
        nextIndex = 0;
    }
    callback(currentIndex, nextIndex);
    mark.children[nextIndex].className = "current_mark mark_seleced";
    mark.children[currentIndex].className = "current_mark";
}