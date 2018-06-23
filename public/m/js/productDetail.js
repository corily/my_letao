$(function(){

    var productId = ltParamter.getParamter(location.search).productId;

    // 获取商品的数据，并渲染到结构上
    var render = function(){
        $.ajax({
            type:"get",
            url:"/product/queryProductDetail",
            data:{"id":productId},
            dataType:"json",
            success:function(res){
                // console.log(res);
                var html = template("proDetailTemp",res);
                $(".proDetailBox").html(html);
                // mui框架会默认初始化当前页面的图片轮播组件；若轮播组件内容为js动态生成时（比如通过ajax动态获取的营销信息），则需要在动态生成完整DOM (包含mui-slider下所有DOM结构) 后，手动调用图片轮播的初始化方法；
                mui('.mui-slider').slider({
                    interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
                });
                // 动态生成的元素需要重新初始化
                mui(".mui-numbox").numbox()
            }
        });
    }

    render();

    // 初始化下拉刷新组件
    mui.init({
        pullRefresh : {
            container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                height:50,//可选,默认50.触发下拉刷新拖动距离,
                auto: true,//可选,默认false.首次加载自动下拉刷新一次
                contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback :function(){
                    render();
                    mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });
   

    // 选择码数
    $(".proDetailBox").on("tap",".proSize span",function(){
        $(this).addClass("active").siblings(".active").removeClass("active");
    })


    // 加入购物车功能：要先判断用户是否已经登录了(发送Ajax),先获取productId、商品购买数量和商品购买码数,
    // 已登录则弹出确认框(是否加入购物车)，未登录则跳到到登录页面，登录成功再返回当前页面
    $(".addCartBtn").on("tap",function(){
        
        $.ajax({
            type:"post",
            url:"/cart/addCart",
            data:{
                "productId":productId,
                "num":$(".proNum .mui-input-numbox").val(),
                "size":$(".proSize span.active").text()
            },
            success:function(res){
                console.log(res);
                if(res.error && res.error == 400){
                    // 未登录状态，跳转到登录页面，当登录成功后再返回当前页面，所以要将当前url作为参数传递过去
                    location.href = "./login.html?redirectURL="+location.href;
                }else{
                    // 已经登录，跳转到购物车页面
                    // MUI确认框
                    mui.confirm('温馨提示', '添加成功，去购物车看看？', ['是', '否'], function(e) {
                        if (e.index == 0) {//单击 "是" 的操作
                            location.href = "./cart.html";
                        }
                    });
                }
            }
        });
    });


});