$(function(){

    $(".mui-btn-primary").on("tap",function(){
        $.ajax({
            type:"post",
            url:"/user/login",
            data:{
                "username":$(".mui-input-clear").val(),
                "password":$(".mui-input-password").val()
            },
            dataType:"json",
            success:function(res){
                console.log(res);
                if(res.success && res.success == true){
                    // 登录成功：从其他网友跳转来的就再返回其他页面，否则就跳转到首页
                    if(location.href.indexOf("?redirectURL=") != -1){
                        // 从其他页面跳转过来的
                        // console.log(location.search.replace("?redirectURL=",""));
                        location.href = location.search.replace("?redirectURL=","");
                    }else{
                        location.href = "./index.html";
                    }
                }else{
                    // 登录失败
                    mui.toast(res.message);
                }
            }
        })
    });
})