$(document).ready(function() {
    init();
    //顶部轮播点击切换
    $('.carousel-ctrl ul li a').click(function(e) {
        e.preventDefault();
        navClick($(this));
    });
    //直播间右边栏点击切换
    $(".part3 aside ul li").click(function(e) {
        e.preventDefault();
        liveChange($(this));
    });

    $(".inner-section").each(function(index, el) {
        var that = $(this).attr('id');
        $(this).find("li.live-change").click(function(e) {
            e.preventDefault();
            animationChange($(this), that);
        });
    });
    //每日新番点击切换
    $(".weekDay").click(function() {
        var today = $(this);
        animationEveryDay(today);
    });
    //右边栏回到顶部按钮
    $(".sidebar-arrow").click(function() {
        backToTop(0);
    });

    //显示全屏遮罩与排序拖拽功能
    $(".sort").click(function() {
        showMainMaskAndDragTip();
    });
    //取消全屏遮罩与排序拖拽功能
    $(".main-mask").click(function() {
        hideMainMaskAndDragTip();
    });
    //每次浏览器窗口大小改变，重置sidebar侧边栏的位置
    $(window).resize(function() {
        resetSidebar();
    });
});

//页面初始完成后加载的函数
function init() {
    //新番列表自动识别周几，并切换
    animationEveryDayAuto();
    //顶部轮播自动轮换
    carouselAuto($('.carousel-ctrl ul li a'));
    //已完结动画列表自动切换
    finishChangeAuto();
    //右边栏小电视动画控制事件
    asideAnimationCtrl();
    //根据当前视口最上方的部分，确定右边栏列表自动切换选中状态
    scrollToAsideList();
    //设置sidebar侧边栏的位置
    resetSidebar();
}

//顶部轮播点击切换

function navClick(btn) {
    var index = btn.parent().index();
    var nml = parseInt($('.carousel-list').css('marginLeft'));
    $('.carousel-ctrl ul li').each(function(index, element) {
        $(this).removeClass('active');
    });
    btn.parent().addClass('active');
    $('.carousel-list').animate({
        marginLeft: -(100 * index) + '%'
    }, 200);
    $(".carousel-title").html($('.carousel-list li').eq(index).find("img").attr("title"));
}
//顶部轮播自动切换
function carouselAuto(btn) {
    var index = 0;
    var timer;
    $(".carousel-title").html($('.carousel-list li').eq(index).find("img").attr("title"));
    $('.carousel').hover(function() {
        clearInterval(timer);
    }, function() {
        timer = setInterval(function() {
            index++;
            if (index === 7) {
                index = 0;
            }
            $('.carousel-ctrl ul li').each(function(index, element) {
                $(this).removeClass('active');
            });
            $('.carousel-ctrl ul li').eq(index).addClass('active');

            $('.carousel-list').animate({
                marginLeft: -(100 * index) + '%'
            }, 500);
            $(".carousel-title").html($('.carousel-list li').eq(index).find("img").attr("title"));
        }, 4000);
    });

    timer = setInterval(function() {
        index++;
        if (index === 7) {
            index = 0;
        }
        $('.carousel-ctrl ul li').each(function(index, element) {
            $(this).removeClass('active');
        });
        $('.carousel-ctrl ul li').eq(index).addClass('active');

        $('.carousel-list').animate({
            marginLeft: -(100 * index) + '%'
        }, 500);
        $(".carousel-title").html($('.carousel-list li').eq(index).find("img").attr("title"));
    }, 4000);
}

//直播排行&&推荐切换
function liveChange(ele) {
    var i = ele.index();
    $(".part3 aside ul li").each(function(index, element) {
        $(this).removeClass('live-active');
    });
    ele.addClass('live-active');
    $(".part3 .carousel-live-box").animate({
        marginLeft: -(100 * i) + '%'
    }, 200);
}

//动画排行榜原创&&全部切换
function animationChange(ele, box) {
    var i = ele.index() - 1;

    $("#" + box + " .part-animate-aside ul li").each(function(index, element) {
        $(this).removeClass('live-active');
    });
    ele.addClass('live-active');
    $("#" + box + " aside .carousel-animate-box").animate({
        marginLeft: -(100 * i) + '%'
    }, 200);
}

//完结动画自动切换
function finishChangeAuto() {
    var indexAuto = 0;
    var timer;
    $(".carousel-box-ctrl li").hover(function() {
        var index = $(this).attr('data-index');

        finishNameChange(index);
        $(".carousel-box-ctrl li").removeClass('active');
        $(this).addClass('active');
        $(".carousel-panel").animate({
            marginLeft: -(100 * index) + "%",
        }, 100);
        finishNameChange()
        clearInterval(timer);
    }, function() {
        timer = setInterval(function() {
            indexAuto++;
            if (indexAuto > 2) {
                indexAuto = 0;
            }

            $(".carousel-box-ctrl li").removeClass('active');
            $(".carousel-box-ctrl li[data-index=" + indexAuto + "]").addClass('active');
            $(".carousel-panel").animate({
                marginLeft: -(100 * indexAuto) + "%",
            }, 100);
            finishNameChange()
        }, 5000);
    });
    timer = setInterval(function() {
        indexAuto++;

        if (indexAuto > 2) {
            indexAuto = 0;
        }
        $(".carousel-box-ctrl li").removeClass('active');
        $(".carousel-box-ctrl li[data-index=" + indexAuto + "]").addClass('active');
        $(".carousel-panel").animate({
            marginLeft: -(100 * indexAuto) + "%",
        }, 100);
        finishNameChange()
    }, 5000);
}
//完结动画名切换
function finishNameChange() {
    var num = $(".carousel-box-ctrl .active").attr('data-index');
    var name = $(".carousel-box-ctrl .active").attr('data-name');
    switch (num) {
        case "0":
            $(".animate-name").text(name);
            break;
        case "1":
            $(".animate-name").text(name);
            break;
        case "2":
            $(".animate-name").text(name);
            break;
    }
}
//新番列表切换
function animationEveryDay(today) {
    var index = $(".weekDay").index(today);
    
    $(".weekDay-active").removeClass('weekDay-show');
    today.parent().find(".weekDay-active").addClass('weekDay-show');
    $(".list-box").css({
        display: 'none',
        opacity: 0
    });
    $(".list-box").eq(index).css('display', 'block').animate({
            opacity: 1
        },
        100);

}
//拖拽功能
//该功能待完善
function dragItems(ele) {
    ele.onselectstart = function() {
        return false;
    };
    ele.ondragstart = function(e) {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text", e.target.id);
        e.dataTransfer.setDragImage(e.target, 0, 0);
    };
    ele.ondragover = function(e) {
        e.preventDefault();
        return true;
    };
    ele.ondrop = function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        $(this).insertAfter('#' + e.dataTransfer.getData("text"));
    };
}

//根据本日是周几自动切换新番列表
function animationEveryDayAuto() {
    var date = new Date();
    $(".weekDay-active").eq(date.getDay() - 1).addClass('weekDay-show');
    $(".list-box-" + date.getDay()).css({
        display: 'block',
        opacity: 1
    });
}
//右边栏小电视动画控制事件
//纯Css3难以控制，以动态控制class的方式操作。动画效果由Css3实现
function asideAnimationCtrl() {
    $(".sidebar-gif").hover(function() {
        $(this).
        removeClass('mobile-animate-backward').
        addClass('mobile-animate-forward').
        bind('animationend webkitAnimationEnd',
            function() {
                $(".sidebar-gif img").addClass('show');
                $(".sidebar-gif").removeClass('mobile-animate-forward').addClass('mobile-animate-shake');
            });
    }, function() {
        $(".sidebar-gif img").removeClass('show');
        $(this).
        removeClass('mobile-animate-shake').
        addClass('mobile-animate-backward').
        bind('animationend webkitAnimationEnd',
            function() {
                $(".sidebar-gif").
                removeClass('mobile-animate-shake').
                removeClass('mobile-animate-backward');
                $(".sidebar-gif img").removeClass('show');
            });
    });
}

//根据当前视口最上方的部分，确定右边栏列表自动切换选中状态
function scrollToAsideList() {
    for (var i = 0, len = $(".inner-section").size(); i < len; i++) {
        var topToScreen = $(".inner-section").eq(i).offset().top - $(document).scrollTop();
        if (topToScreen < 300) {
            $(".sidebar-list li").removeClass('on').eq(i).addClass('on');
        }
    }
    $(document).scroll(function(event) {
        for (var i = 0, len = $(".inner-section").size(); i < len; i++) {
            var topToScreen = $(".inner-section").eq(i).offset().top - $(document).scrollTop();
            if (topToScreen < 300) {
                $(".sidebar-list li").removeClass('on').eq(i).addClass('on');
            }
        }
    });
}

//回到顶部功能
function backToTop(top) {
    $("html,body").animate({
            scrollTop: top
        },
        300);
}
//显示全屏遮罩与拖拽提示
function showMainMaskAndDragTip() {
    $(".main-mask").show();
    $(".sidebar").css({
        backgroundColor: ' rgba(255,255,255,0.8)',
    });
    $(".dragtip").css({
        opacity: '1',
        visibility: 'visible'
    });
    $(".sidebar-list li").css('cursor', 'move');
    var dragList = $(".sidebar-list li").not('.sort');
    dragList.each(function(index, el) {
        dragItems(el);
    });
}
//取消全屏遮罩与拖拽提示
function hideMainMaskAndDragTip() {
    $(".main-mask").hide();
    $(".sidebar").css({
        backgroundColor: ' transparent',
    });
    $(".dragtip").css({
        opacity: '0',
        visibility: 'hidden'
    });
    $(".sidebar-list li").css('cursor', 'pointer');
}
//设置sidebar侧边栏的位置
function resetSidebar() {
    /*让我来解释一下……
     *固定定位不能根据父级元素的相对定位进行位置调整。
     *因此这里采用javascript动态获取：侧边栏距离inner容器右边的距离
     *这样等于是把侧边栏的位置卡死，不会在响应式中发生布局异常
     */
    var mainInnerWidthAndLeft = $(".main-inner").width() + $(".main-inner").offset().left;

    $(".sidebar").css('left', mainInnerWidthAndLeft + 20);
}
