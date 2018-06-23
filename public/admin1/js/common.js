$(function () {
    // 单击右侧全屏
    $(".glyphicon-align-justify").on("click", function () {
        // 让左侧隐藏
        $(".lt_left").toggle();
        // 让右侧全屏 --padding-left:0px ---切换 --- 样式 toggleClass
        $(".lt_main").toggleClass("fullScreen");
    });


    // 添加退出模态框
    (function () {
        // 通过js动态创建模态框结构： 1.创建模态框  2.添加到当前页面结构中
        // 1.长字符串的使用 反引号``是ES6的新语法 ，特点就是支持多行文本
        var mymodal = `<div class="modal fade exitModel bs-example-modal-sm" id="myExitModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="myModalLabel">温馨提示</h4>
                </div>
                <div class="modal-body">
                    <p style="color:red">您确定要退出后台管理系统吗？</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary exitBtn">确定</button>
                </div>
            </div>
        </div>
    </div>`;
        // 2.将其添加到页面结构中
        $("body").append(mymodal);
        // 为退出确定按钮绑定事件
        $(".exitBtn").on("click", function () {
            $.ajax({
                type: 'get',
                url: '/employee/employeeLogout',
                dataType: 'json',
                success: function (result) {
                    if (result.success == true) {
                        location.href = "login.html";
                    }
                }
            });
        });
    })();
    // 退出功能
    // 1.退出功能应该是一公用功能，不是属于某个页面特有的功能
    // 2.功能实现方式：使用bootstrap的默认提供的插件 --模态框 来实现
    // 2.1：模态框结构在那里创建？
    // 2.1.1：有同学说放在模板中？模板在那里创建？
    // a.不能在js文件中直接创建script标签生成模板结构，因为语法不允许
    // b.也不能放在某个具体的页面结构中，因为这个页面中的模板只有它引入的js才能使用
    // c.创建一个新的html文件，添加模板  -- 然并卵
    // 2.2：如何实现退出功能--调用接口
    $(".glyphicon-log-out").on("click", function () {
        // 展示模态框
        $("#myExitModal").modal("show");
    });

    // 分类导航项的展示和合并
    $(".lt_cate").on("click",function(){
        $(".lt_subCate").slideToggle();
        $(this).parent().siblings().find("a").removeClass("active");
        $(this).addClass("active");
    });
});