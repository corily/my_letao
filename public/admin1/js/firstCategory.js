$(function(){
    var pageIndex = 1,pageSize = 2;
    // 获取一级分类数据，动态展示
    function render(){
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:pageIndex,
                pageSize:pageSize
            },
            dataType:'json',
            success:function(result){
                console.log(result);
                // 生成动态的数据结构
                $("tbody").html(template("firstCategoryTemp",result));
                // 生成分页区域
                setPagnator(Math.ceil(result.total / result.size));
            }
        });
    }
    render();

    // 分页
    function setPagnator(total){
        var options={
            bootstrapMajorVersion:3,
            totalPages:total,
            // 单击页码之后的回调
            onPageClicked:function(event, originalEvent, type,page){
                // 修改全局页码
                pageIndex = page;
                // 重新请求数据
                render();
            }
        };
        $(".pagination").bootstrapPaginator(options);
    }

    // 单击弹出添加一级数据的模态框
    $(".addFirstBtn").on("click",function(){
        $("#firsetCategoryModal").modal("show");
    });

    // 实现一级分类数据的添加，实现数据的刷新--接口中是降序排序的
    $(".firsetCBtn").on("click",function(){
        $.ajax({
            type:'post',
            url:'/category/addTopCategory',
            beforeSend:function(){},
            data:{
                categoryName:$(".firstCName").val()
            },
            dataType:"json",
            success:function(result){
                if(result.success && result.success == true){
                    alert('新增成功');
                    render();
                }else{
                    alert('新增失败'); 
                }
                $("#firsetCategoryModal").modal("hide");
            }
        });
    });
});