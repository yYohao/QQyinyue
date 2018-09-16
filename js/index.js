window.onload = function () {
    var allItems = $(".rec-image");
    var recommend = $("#song-recommend");
    var pre = document.getElementsByClassName("pre")[0];
    var next = document.getElementsByClassName("next")[0];
    var rec_slider= document.getElementById("rec-slider-ul");
    var currentIndex = 0;
    var li_arr1 = [
        {img: "source/1.jpg",img_title: "每日新歌：一起想象刘宇宁首支单曲",counts: "4.9万"},
        {img: "source/2.jpg",img_title: "每日新歌：一起想象刘宇宁首支单曲",counts: "4.9万"},
        {img: "source/3.jpg",img_title: "每日新歌：一起想象刘宇宁首支单曲",counts: "4.9万"},
        {img: "source/4.jpg",img_title: "每日新歌：一起想象刘宇宁首支单曲",counts: "4.9万"},
        {img: "source/5.jpg",img_title: "每日新歌：一起想象刘宇宁首支单曲",counts: "4.9万"}
    ];
    var li_arr2 = [
        {img: "source/6.jpg",img_title: "每日新歌：一起想象刘宇宁首支单曲",counts: "4.9万"},
        {img: "source/7.jpg",img_title: "每日新歌：一起想象刘宇宁首支单曲",counts: "4.9万"},
        {img: "source/8.jpg",img_title: "每日新歌：一起想象刘宇宁首支单曲",counts: "4.9万"},
        {img: "source/9.jpg",img_title: "每日新歌：一起想象刘宇宁首支单曲",counts: "4.9万"},
        {img: "source/0.jpg",img_title: "每日新歌：一起想象刘宇宁首支单曲",counts: "4.9万"}
    ];

    pre.onclick = function () {
        var li;
        console.log(111);
        if (currentIndex === 0){
            li = createRecommend(li_arr2);
            console.log(li);
            rec_slider.appendChild(li);
            console.log(rec_slider);
            currentIndex = 1;
        } else {
            li = createRecommend(li_arr1);
            rec_slider.appendChild(li);
            currentIndex = 0;
        }
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
    var timer = setInterval(function () {
        obj.style.left = obj.offsetLeft + dir + 'px';
        begin = begin + dir;
        if (Math.abs(begin) >= Math.abs(end)){
            clearInterval(timer);
        }
    },20);

}

function createRecommend(arr) {
    var li = document.createElement("li");
    for (var i=0; i<5; i++){
        var slider_item = document.createElement("div");
        slider_item.className = "rec-slider-item rec-slider-item-mg";
        li.appendChild(slider_item);

        var rec_image = document.createElement("div");
        rec_image.className = "rec-image";

        var image = document.createElement("img");
        image.src = arr[i].img;
        rec_image.appendChild(image);

        var image_title = document.createElement("div");
        image_title.className = "rec_image_title";

        var p1 = document.createElement("p");
        p1.innerText = arr[i].img_title;
        image_title.appendChild(p1);
        var p2 = document.createElement("p");
        p2.className = "play_count";
        p2.innerText = "播放量：" + arr[0].counts;

        image_title.appendChild(p2);

        slider_item.appendChild(image_title);
        slider_item.appendChild(rec_image);
    }

    return li;
}