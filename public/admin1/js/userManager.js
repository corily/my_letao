$(function(){
    var pageIndex = 1; // 页码
    var pageSize = 1; //每页显示的记录数

    // 1.发起ajax，获取数据，生成动态的结构
    // 获取数据并生成动态的结构的封装函数
    function render(){
        $.ajax({
            type:'get',
            url:'/user/queryUser',
            data:{
                page:pageIndex,
                pageSize:pageSize
            },
            dataType:'json',
            success:function(result){
                console.log(result);
                // 用户数据的动态展示
                $("tbody").html(template("userTemp",result));
                // 动态生成分页区域
                setPagnator(Math.ceil(result.total / result.size));
            }
        });
    }
    render();

    // 封装分页插件的使用
    function setPagnator(total){
        // 配置分页选项
        var options = {
            bootstrapMajorVersion:3,
            totalPages:total,
            onPageClicked:function(event, originalEvent, type,page){
                console.log(type+":"+page);
                // page:就是用户当前当面的分页元素上的页码，而这个页码就是我们当前需要获取数据的页码
                // 修改全局页码
                pageIndex = page;
                render();
            }
        };
        // 初始化
        $(".pagination").bootstrapPaginator(options);
    }

    var _this;
    // 2.实现用户的禁用和启用
    $("tbody").on("click",".btn",function(){
        _this = this;
        // 让修改模态框显示
        $(".confirmModal").modal("show");
    });

    // 实现状态启停
    // 为模态框中的确定按钮添加事件
    // $("[属性=值]")
    $(".myConfirmBtn").on("click",function(){
        // 获取id
        var id = $(_this).data("id");
        // 获取用户修改后的状态
        var isDelete = $(_this).text() == '启用'?0:1;
        // alert(id+":"+isDelete);
        // 向用户启停接口发送请求
        $.ajax({
            type:'post',
            url:'/user/updateUser',
            data:{
                id:id,
                isDelete:isDelete
            },
            dataType:"json",
            success:function(result){
                // 刷新当前页面:不应该刷新当前页所有数据，而是应该修改其中变化的值
                // 1.修改按钮的文本
                $(_this).text(isDelete==1?"启用":"禁用");
                // 修改样式
                if(isDelete == 1){
                    $(_this).removeClass('btn-danger').addClass("btn-info");
                }else{
                    $(_this).removeClass('btn-info').addClass("btn-danger");
                }
                // 2.修改状态值--td中的值
                $(_this).parent().siblings(".user_state").text(isDelete==1?"已禁用":"已启用");
                // 3.让模态框隐藏
                $(".confirmModal").modal("hide");
            }
        });
    });

    // 3.实现数据的分页功能--本质就是去获取新的数据--ajax
})