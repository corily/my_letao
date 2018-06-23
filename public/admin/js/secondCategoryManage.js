$(function(){

    var currentPage = 1;
    var pageSize = 4;

    render();

    $(".addSecondCateBtn").on("click",function(){
        $(".secondCateModal").modal("show");
    });

    // 二级分类数据渲染
    function render(){
        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:"json",
            success:function(res){
                // console.log(res);
                $("tbody").html(template("secondCateTemp",res));

                setPaginator(Math.ceil(res.total / res.size));
            }
        });
    }

    // 分页功能
    function setPaginator(totalPages){
        var options = {
            bootstrapMajorVersion:3,
            totalPages:totalPages,
            onPageClicked:function(event, originalEvent, type,page){
                currentPage = page;
                render();
            }
        };
        $(".pagination").bootstrapPaginator(options);
    }
});