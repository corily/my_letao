$(function(){

    //左侧导航栏单击选中效果
    $(".lti_left_bottom").on("click",">li>a",function(){
        $(this).parent().addClass("active").siblings("li.active").removeClass("active");

        // 二级分类单击效果及折叠效果
        // 先判断对应的一级分类是否被选中，
        // 若被选中，则添加折叠效果，以及二级分类的点击选中效果，若没有被选中，则折叠隐藏起来
        if( $(".glyphicon-th-list").parent("li").hasClass("active")){
            
            $(".secondCategory").slideToggle();
            $(".secondCategory>li>a").on("click",function(){
                $(this).parent().addClass("active").siblings("li.active").removeClass("active");
            });
         }else{
             $(".secondCategory").slideUp();
         }
    });

    if(location.href == "http://127.0.0.1:3000/admin/firstCategoryManage.html" || location.href == "http://127.0.0.1:3000/admin/secondCategoryManage.html" ){
        $(".secondCategory").show();
    }

    //单击导航图标，左侧部分隐藏，右侧部分全屏效果
    $(".lti_right_top>.glyphicon-menu-hamburger").on("click",function(){
        $(".lti_right").toggleClass("fullScreen");// fullScreen ==> padding-left:0
        $(".lti_left").toggle();
    });

    (function(){
        
        // 1.长字符串的使用 反引号``是ES6的新语法 ，特点就是支持多行文本
        var myModal = `<div class="modal fade bs-example-modal-sm exitModal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">温馨提示</h4>
            </div>
            <div class="modal-body">
                <p class="glyphicon glyphicon-warning-sign">您确定要退出后台管理系统吗</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary resureExitBtn">确定</button>
            </div>
            </div>
        </div>
        </div>`;

        $("body").append(myModal);

        // 单击弹出框的确定按钮
        $(".resureExitBtn").on("click",function(){
            // $('.exitModal').modal({
            //     keyboard: false
            // });

            $.ajax({
                type:"get",
                url:"/employee/employeeLogout",
                dataType:"json",
                success:function(res){
                    // console.log(res);
                    // 退出成功则返回到登录页面
                    if(res.success && res.success == true){
                        location.href = "./login.html";
                    }
                }
            });
        });

    })();

    // 单击右侧退出图标，弹出提示模态框
    $(".exitBtn").on("click",function(){
        $('.exitModal').modal("show");
    });
    
});