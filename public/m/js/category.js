$(function(){

    // 请求左边导航栏数据
    $.ajax({
        type:"get",
        url:"/category/queryTopCategory",
        dataType:"json",
        success:function(res){
            // console.log(res);
            var html = template("leftNavTemp",res);
            $(".lt_cLeft_Nav").html(html);

            // 默认显示第一个导航项的数据
            getSecondCateData(res.rows[0].id);
        }
    });

    
   $(".lt_cLeft_Nav").on("tap","li>a",function(){
        var navId = $(this).data("id");
        $(this).parent().addClass("active").siblings().removeClass("active");

        // 根据id，重新请求右边的内容数据
        getSecondCateData(navId);
   });

    // 请求右边内容数据
    function getSecondCateData(navId){
        $.ajax({
            type:"get",
            url:"/category/querySecondCategory",
            data:{"id":navId},
            dataType:"json",
            success:function(res){
                // console.log(res);
                var html = template("rightContent",res);
                $(".ltcRight_content").html(html);
            }
        });
    }

});