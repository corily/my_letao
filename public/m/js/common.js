//区域滚动初始化
mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators:false //隐藏滚动条
});


//轮播图初始化
mui('.mui-slider').slider({
  interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
});

// 单击底部导航的效果
$(".lt_footer>a").on("tap",function(){
    $(this).addClass("active").siblings().removeClass("active");
});

// 获取地址栏的参数,data = location.search  ?key1=value1&key2=value2, 进行两次切割 & =
var ltParamter = {
    getParamter:function(str){
        str = str.slice(1);//去掉 ？
        var data = {};
        var arr = str.split("&");//用 & 切割成数组

        for(var i = 0; i < arr.length; i++){
            //用 = 切割成数组
            var final = arr[i].split("=");
            data[final[0]] = final[1];
        }
        return data;
    }
};
