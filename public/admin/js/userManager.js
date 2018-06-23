$(function(){

    var currentPage = 1;
    var pageSize = 2;

    // 用户信息渲染
    var render = function(){
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            data:{
                "page":currentPage,
                "pageSize":pageSize
            },
            dataType:"json",
            success:function(res){
                // console.log(res);
                // res.index = (currentPage-1)*res.size;
                // 用户信息渲染
                $("tbody").html(template("userInfoTemp",res));
                
                // 分页结构的渲染
                setPagnater(Math.ceil(res.total/res.size));
            }
        });
    }
    render();

    var _this;
    // 单击禁用/启用按钮，弹出模态框
    $("tbody").on("click",".btn",function(){
        _this = this;
        $('.userModal').modal('show');
    });

    // 单击模态框“确定”按钮功能，先确定点击了哪个禁用/启用按钮，然后修改对应的禁用/启用功能，同时改变用户的状态
    $(".userResureBtn").on("click",function(){

        var id = $(_this).data("id");
        //判断当前是否是已启用的状态
        // 若当前按钮是禁用按钮，说明用户的状态是已启用，单击按钮后，修改为禁用状态
        var isDelete = $(_this).text() == "禁用" ? 1 : 0;

        $.ajax({
            type:"post",
            url:"/user/updateUser",
            data:{
                "id":id,
                "isDelete":isDelete
            },
            dataType:"json",
            success:function(res){
                // console.log(res);
                if(res.success && res.success == true){
                    // 数据库已修改成功
                    // $(_this).text(isDelete == 1 ? "启用" : "禁用");
                    if(isDelete == 1){
                        //修改禁用/启用按钮内容,及样式
                        $(_this).text("启用").addClass("btn-info").removeClass("btn-danger");
                        $(_this).parents("tr").find(".userStatus").text("已禁用");
                    }else{
                        $(_this).text("禁用").addClass("btn-danger").removeClass("btn-info");
                        $(_this).parents("tr").find(".userStatus").text("已启用");
                    }
                }
            }
        });

        // 关闭模态框
        $('.userModal').modal('hide');
    });


    // 分页插件的使用
    function setPagnater(totalPages){
        var options = {
            bootstrapMajorVersion:3,
            totalPages:totalPages,
            onPageClicked:function(event,originalEvent,type,page){
                currentPage = page;
                render();
            }
        };

        $(".pagination").bootstrapPaginator(options)
    }

});