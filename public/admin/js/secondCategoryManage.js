$(function(){

    var currentPage = 1;
    var pageSize = 4;

    render();

    // “添加品牌”按钮功能：
    // 1、弹出模态框
    // 2、动态获取一级分类数据，并渲染到结构上
    // 3、上传文件（图片）
    $(".addSecondCateBtn").on("click",function(){
        // 1、弹出模态框
        $(".secondCateModal").modal("show");
    });

    ;(function(){
         // 2、动态获取一级分类数据，并渲染到结构上
        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page:1,
                pageSize:100
            },
            dataType:"json",
            success:function(res){
                var html = '';
                res.rows.forEach(function(value,index) {
                    html += '<li><a href="javascript:;" data-id="'+ value.id +'">'+ value.categoryName +'</a></li>'
                });
                $(".dropdown-menu").html(html)
            }
        })
    })()

    // 从一级分类下拉按钮组里获取单击的内容
    $(".dropdown-menu").on("click","a",function(){
        $(".selectFirstCateName").text($(this).text())
        $(".categoryId").val($(this).data("id"))
    })

    // 模态框的保存按钮：发送Ajax，添加二级分类
    $(".secondSaveBtn").on("click",function(){
        // console.log($("form").serialize())
        $.ajax({
            type:"post",
            url:"/category/addSecondCategory",
            data:$("form").serialize()+'&hot=1',
            dataType:"json",
            beforeSend:function(){
                if($(".selectFirstCateName").text() == '请选择分类'){
                    alert('请选择分类')
                    return false
                }
                if($(".firstCateName").val() == '' || $(".firstCateName").val().trim() == ''){
                    alert('请输入品牌名称')
                    return false
                }
                if($(".scateImg").attr('src') == './images/none.png'){
                    alert('请选择上传的图片')
                    return false
                }
            },
            success:function(res){
                console.log(res)
                if(res.success && res.success == true){
                    // 成功添加二级分类后，局部刷新页面
                    render()
                }
            }
        })
        // 重置模态框
        $(".selectFirstCateName").text('请选择分类')
        $(".categoryId").val('')
        $(".firstCateName").val("")
        $(".brandLogo").val('')
        $(".scateImg").attr('src','./images/none.png')
        // 关闭模态框
        $(".secondCateModal").modal("hide");
    })

    // 基于jQuery的文件上传插件
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            // data.result.picAddr:存储上传文件的路径
            // console.log(data.result.picAddr)
            $(".brandLogo").val(data.result.picAddr)
            $(".scateImg").attr('src',data.result.picAddr)
        }
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
                console.log(res);
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