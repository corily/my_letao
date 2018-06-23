$(function(){

    var currentPage = 1;
    var pageSize = 2;

    render();

    // 单击添加一级分类按钮，弹出模态框
    $(".addFirstCateBtn").on("click",function(){
        $(".firstCateModal").modal("show");
    });

    // 模态框的保存按钮：添加一级分类，并修改数据库数据，同时，将新添加的分类显示在页面结构上，并隐藏模态框
    $(".firstSaveBtn").on("click",function(){
        var firstCateName = $(".firstCateName").val();
        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data:{
                categoryName:firstCateName
            },
            dataType:"json",
            beforeSend:function(){
                if(firstCateName == "" || firstCateName.trim() == ""){
                    alert("分类名称不能为空！");
                    return false;
                }
            },
            success:function(res){
                console.log(res);
                if(res.success && res.success == true){
                    render();
                    $(".firstCateName").val("");
                }
            }
        })
        $(".firstCateModal").modal("hide");
    });

    // 一级分类数据渲染
    function render(){
        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:"json",
            success:function(res){
                // console.log(res);
                $("tbody").html(template("firstCateTemp",res));

                setPaginator(Math.ceil(res.total / res.size));
            }
        });
    }

    // 分页结构功能
    function setPaginator(totalPages){
        $(".pagination").bootstrapPaginator({
            bootstrapMajorVersion:3,
            totalPages:totalPages,
            onPageClicked:function(event, originalEvent, type,page){
                currentPage = page;
                render();
            }
        });
    }
});