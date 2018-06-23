$(function(){
    // 单击登陆实现登陆操作
    $("[type=submit]").on("click",function(e){
        e.preventDefault();
        // 获取用户数据
        var name = $("#inputName").val();
        var pass = $("#inputPassword").val();
        // 发送ajax请求
        $.ajax({
            type:'post',
            url:'/employee/employeeLogin',
            data:{
                username:name,
                password:pass
            },
            beforeSend:function(){
                if(name == "" || $.trim(name) == ""){
                    alert("请输入用户名");
                    return false;
                }
            },
            dataType:'json',
            success:function(result){
                if(result.success && result.success == true){
                    // 登陆成功
                    location.href = "./letao_index.html";
                }else{
                    alert(result.message);
                }
            }
        });
    });
});