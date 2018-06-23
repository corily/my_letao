$(function(){

    var page = 1;//当前页码
    var pageSize = 10;//每页显示的数据总条数
    var paramter = ltParamter.getParamter(location.search);//获取地址栏的参数

    mui.init({
        pullRefresh : {
            container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            // 下拉刷新初始化
            down : {
                height:50,//可选,默认50.触发下拉刷新拖动距离,
                auto: true,//可选,默认false.首次加载自动下拉刷新一次
                contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback :function(){
                    mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            },
            // 上拉刷新初始化
            up : {
                height:50,//可选.默认50.触发上拉加载拖动距离
                auto:true,//可选,默认false.自动上拉加载一次
                contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback :function(){
                    $.ajax({
                        type:"get",
                        url:"/product/queryProduct",
                        data:{
                            "page":++page,
                            "pageSize":pageSize,
                            "proName":paramter.proName
                        },
                        dataType:"json",
                        success:function(res){
                            // console.log(res);
                            if(res.data.length == 0){
         // 是否还有更多数据；若还有更多数据，则传入false; 否则传入true，之后滚动条滚动到底时，将不再显示“上拉显示更多”的提示语，而显示“没有更多数据了”的提示语；
                                mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                            }else{
                                var html = template("productDataTemp",res);
                                $(".lt_mproduct>ul").append(html);
                                mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                            }
                        }
                    });
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    
    function proDataRender(data){
        $.ajax({
            type:"get",
            url:"/product/queryProduct",
            data:data,
            dataType:"json",
            success:function(res){
                console.log(res);
                var html = template("productDataTemp",res);
                $(".lt_mproduct>ul").html(html);
            }
        });
    }

    proDataRender({
                "page":page,
                "pageSize":pageSize,
                "proName":paramter.proName
    });

    // 3.单击实现排序,获取对应的排序自定义属性order的值以及span所对应的 fa-angle-up(1：升序) / fa-angle-down(2：降序)
    $(".filterPro>a").on("tap",function(){

        page = 1;
        //重置上拉加载
        mui('#refreshContainer').pullRefresh().refresh(true);

        var data = {
            "page":page,
            "pageSize":pageSize,
            "proName":paramter.proName
        };

        if($(this).hasClass("active")){//a标签被选中，对span的进行改变
            $(this).find("span").toggleClass("fa-angle-up fa-angle-down");
        }else{
            // 当前a标签未被选中，先取消其他a标签的active选中状态，并将span的class设置为 fa-angle-down
            // console.log($(this).siblings(".active").html());
            $(this).siblings(".active").removeClass("active").find("span")[0].className = "fa fa-angle-down";
            $(this).addClass("active");
        }
        var sortKey = $(this).data("order");
        var orderType = $(this).find("span").hasClass("fa-angle-down")?2:1;

        data[sortKey] = orderType;
        proDataRender(data);
        // console.log(data);
    });
   
});