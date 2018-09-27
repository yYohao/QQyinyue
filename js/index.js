window.onload = function () {
    var allItems = $(".rec-image");
    var recommend = $("#song-recommend");
    var new_songs = $("#new-songs");
    var new_songs_items = $(".new_songs_image");
    var pre = document.getElementsByClassName("pre")[0];
    var next = document.getElementsByClassName("next")[0];
    var new_pre = document.getElementById("new-pre");
    var new_next = document.getElementById("new-next");
    var rec_slider= document.getElementById("rec-slider-ul");
    var current_mark = document.getElementById("current-mark");
    let all_new_songs = document.getElementById("all-new-songs");
    let news_current_mark = document.getElementById("news-current-mark");
    let new_marks = news_current_mark.children;
    var currentIndex = 1, nextIndex = 0;
    let new_currentIndex = 1, new_nextIndex = 0;
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

    //新歌首发中箭头点击事件
    new_pre.addEventListener("click",new_pre_action);
    function new_pre_action(){
        new_nextIndex = new_currentIndex + 1;
        move(all_new_songs, (new_nextIndex * -1200));
        if (new_nextIndex === 5){
            new_nextIndex = 1;
        }
        new_currentIndex = new_nextIndex;
    };

    new_next.onclick = function(){
        new_nextIndex = new_currentIndex - 1;
        move(all_new_songs, (new_nextIndex * -1200));
        if (new_nextIndex === 0){
            new_nextIndex = 4;
        }
        new_currentIndex = new_nextIndex;
    };

    //歌单推荐鼠标进入效果
    recommend.mouseover(function () {
        $("#song-recommend .pre").animate({left:"0"},500);
        $("#song-recommend .next").animate({right:"0"},500);
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
                    $("#song-recommend .pre").stop().animate({left:"-80px"},200);
                    $("#song-recommend .next").stop().animate({right:"-80px"},200);
                });
            })(i)
        }
    });
    //新歌首发鼠标进入效果
    new_songs.mouseover(function () {
        $("#new-songs .pre").animate({left:"0"},500);
        $("#new-songs .next").animate({right:"0"},500);
        for (var j=0; j<new_songs_items.length; j++){
            (function (j) {
                var item = new_songs_items[j];
                item.style.transition = "all 2s";
                item.onmouseover = function () {
                    item.children[0].className = 'songs-image-current';
                    //item.children[1].className = 'rec-image-current';
                    //$("#playCanvas").fadeIn(500);
                    item.onmouseout = function () {
                        item.children[0].className = '';
                        //item.children[1].className = '';
                        // $("#playCanvas").fadeOut(500);
                    }
                };
                new_songs.bind("mouseleave",function () {
                    $("#new-songs .pre").stop().animate({left:"-80px"},200);
                    $("#new-songs .next").stop().animate({right:"-80px"},200);
                });
            })(j)
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

/**
 * 先前点击
 * @param currentIndex
 * @param nextIndex
 * @param slider_dom
 * @param mark
 * @param callback
 */
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

/**
 * 先后点击
 * @param currentIndex
 * @param nextIndex
 * @param slider_dom
 * @param mark
 * @param callback
 */
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


/**
 * 移动
 * @param element
 * @param target
 */
function move(element, target) {
    let begin = 0, speed = 0;
    let timer;
    begin = element.offsetLeft;
    speed = (target - begin) * 0.1;
    timer = setInterval(()=>{
        element.style.left = begin + speed + "px";
        begin = element.offsetLeft;
        if (begin === target){
            clearInterval(timer);
        }
        console.log(begin,target);

    }, 40);


}