window.onload = function () {
    let allItems = $(".rec-image");
    let recommend = $("#song-recommend");
    let new_songs = $("#new-songs");
    let new_songs_items = $(".new_songs_image");
    let pre = document.getElementsByClassName("pre")[0];
    let next = document.getElementsByClassName("next")[0];
    let new_pre = document.getElementById("new-pre");
    let new_next = document.getElementById("new-next");
    let rec_slider= document.getElementById("rec-slider-ul");
    let current_mark = document.getElementById("current-mark");
    let all_new_songs = document.getElementById("all-new-songs");
    let news_current_mark = document.getElementById("news-current-mark");
    let new_marks = news_current_mark.children;
    let currentIndex = 1, nextIndex = 0;
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

    function p_event(){
        new_pre.removeEventListener("click",p_event);
        new_pre_action(new_currentIndex,all_new_songs, 1,(ni)=>{
            new_currentIndex = ni;
            all_new_songs.style.left = new_currentIndex * -1200 + "px";
        });
        for (let i=0; i<new_marks.length; i++){
            new_marks[i].className = "current_mark";
            console.log(new_marks[i]);
        }
        new_marks[new_currentIndex - 1].className = "current_mark mark_seleced";
        setTimeout(function () {
            new_pre.addEventListener("click",p_event);
        },600)
    }

    function n_event(){
        new_next.removeEventListener("click",n_event);
        new_pre_action(new_currentIndex,all_new_songs, -1,(ni)=>{
            new_currentIndex = ni;
            all_new_songs.style.left = new_currentIndex * -1200 + "px";
        });
        for (let i=0; i<new_marks.length; i++){
            new_marks[i].className = "current_mark";
        }
        new_marks[new_currentIndex - 1].className = "current_mark mark_seleced";
        setTimeout(function () {
            new_next.addEventListener("click",n_event);
        },600)
    }
    new_pre.addEventListener("click",p_event);
    new_next.addEventListener("click",n_event);
    //新歌首发中 标记点击事件
    for (let j=0; j<new_marks.length; j++){
        (function (j) {
            new_marks[j].onclick = function () {
                let flag = j - new_currentIndex + 1;
                new_pre_action(new_currentIndex,all_new_songs, flag,(ni)=>{
                    new_currentIndex = ni;
                });
                for (let i=0; i<new_marks.length; i++){
                    new_marks[i].className = "current_mark";
                }
                new_marks[j].className = "current_mark mark_seleced";
            }
        })(j)
    }

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
 * 所有轮播动画的监听函数
 * @param new_currentIndex
 * @param all_new_songs
 * @param flag
 * @param callback
 */
function new_pre_action(new_currentIndex, all_new_songs, flag, callback){
    let new_nextIndex = new_currentIndex + (1 * flag);
    console.log(new_nextIndex);
    move(all_new_songs, (new_nextIndex * -1200));
    if (new_nextIndex === 5){
        new_nextIndex = 1;
    }else if (new_nextIndex === 0){
        new_nextIndex = 4;
    }
    callback(new_nextIndex);
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
        console.log(begin);
        if (begin === target){
            clearInterval(timer);
        }
    }, 40);


}