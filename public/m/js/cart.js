$(function(){

    var page = 1;//当前页码数
    var pageSize = 4;//每页显示的总页数

    var render = function(){
        $.ajax({
            type:"get",
            url:"/cart/queryCartPaging",
            data:{
                "page":page,
                "pageSize":pageSize
            },
            dataType:"json",
            success:function(res){
                // console.log(res);
                var html = template("cartProTemp",res);
                $("#OA_task_2").append(html);
            }
        })
    }

    // 将购物车的数据渲染到HTML结构中
    render();

    // 初始化下拉刷新组件和上拉加载刷新组件
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
                    page = 1;
                    mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            },
            up : {
                height:50,//可选.默认50.触发上拉加载拖动距离
                auto:true,//可选,默认false.自动上拉加载一次
                contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback :function(){
                    $.ajax({
                        type:"get",
                        url:"/cart/queryCartPaging",
                        data:{
                            "page":++page,
                            "pageSize":pageSize
                        },
                        dataType:"json",
                        success:function(res){
                            // console.log(res,res instanceof Object);
                            if(res.length==0){ // res ==> []
                                mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                            }else{
                                mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                                var html = template("cartProTemp",res);
                                $("#OA_task_2").append(html);
                            }
                        }
                    });
                    
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    // 购物车的编辑按钮
    $("#OA_task_2").on("tap",".btn-cartEdit",function(){
        var li = this.parentNode.parentNode;
        var proData = this.dataset;
        var _this = this;
        console.log(proData);
        var html = template("cartEditTemp",proData);
        //存储码数的span标签会自动换行，因此要去掉换行
        html = html.replace(/\n/g,"");
        mui.confirm(html, '编辑商品', ['是', '否'], function(e) {
            if (e.index == 0) {
                // 修改之后，同时要修改数据库里的数据，发送Ajax请求
                var paramter = {
                    "id":proData.id,
                    "size":$(".proSize span.active").text(),
                    "num":$(".proNum input").val()
                };
                $.ajax({
                    type:"post",
                    url:"/cart/updateCart",
                    data:paramter,
                    dataType:"json",
                    success:function(res){
                        console.log(res);
                        if(res.success && res.success == true){
                             // 编辑成功后要修改对应的标签内容及 data- 相关属性
                            _this.dataset.size = $(".proSize span.active").text();
                            _this.dataset.num = $(".proNum input").val();

                            $(li).find(".xieziSize").text("鞋码："+$(".proSize span.active").text());
                            $(li).find(".proCount").text("x "+ $(".proNum input").val() +"双");
                            
                            // 为了计算总金额，编辑后要重新修改对应复选框的data-num
                            $(li).find(".cart-chk").attr("data-num",$(".proNum input").val());
                           
                        }
                        //mui.swipeoutClose(el);//关闭指定列的滑动菜单，el:指定列的dom对象
                        mui.swipeoutClose(li);
                        $(".cart-chk").trigger("change");
                    }
                });
            } else {
                mui.swipeoutClose(li);
            }
        });

        mui(".mui-numbox").numbox();

        // 选择码数
        $(".proSize").on("tap","span",function(){
            $(this).addClass("active").siblings(".active").removeClass("active");
        })

    });

    // 购物车的删除按钮
    $("#OA_task_2").on("tap",".btn-cartDelte",function(){
        var id = this.dataset.id;
        var li = this.parentNode.parentNode;
        $.ajax({
            type:"get",
            url:"/cart/deleteCart",
            data:{"id":id},
            dataType:"json",
            success:function(res){
                console.log(res);
                if(res.success && res.success == true){
                    li.remove();
                }
                mui.swipeoutClose(li);
                $(".cart-chk").trigger("change");
            }

        })

    });

    //计算总金额：当单击复选框时，判断它是否被选中，若选中，则获取商品金额和鞋的数量，选择多个则累加
    $("#OA_task_2").on("change",".cart-chk",function(){
        var allCheck = $(".cart-chk:checked");
        // console.log(allCheck);
        var totalPrice = 0;
        for(var i = 0 ; i < allCheck.length; i++){
            var num = allCheck[i].dataset.num;
            var price = allCheck[i].dataset.price
            // console.log(num,price);
            totalPrice += num*price;
        }

        $(".totalPrice").text(Math.floor(totalPrice*100)/100);

    });

});