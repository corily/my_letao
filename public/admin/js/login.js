$(function(){

    $(".btn-login").on("click",function(e){
        e.preventDefault();

        var username = $(".username").val();
        var password = $(".password").val();
        $.ajax({
            type:"post",
            url:"/employee/employeeLogin",
            data:{
                "username":username,
                "password":password
            },
            dataType:"json",
            beforeSend:function(){
                if(username == "" || username.trim() == ""){
                    alert('请输入用户名');
                    return false;
                }
            },
            success:function(res){
                console.log(res);
                if(res.success && res.success == true){
                    location.href = "./index.html";
                }else{
                    alert(res.message);
                }
            }
        })
    })


});