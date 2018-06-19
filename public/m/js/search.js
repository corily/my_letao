$(function(){

    // 将历史记录存在localStorage的historyData中,读取localStorage中的historyData数据
    function getHistoryData(){
        var historyData = localStorage.getItem("historyData");
        var historyArr = JSON.parse(historyData || '[]');
        return historyArr;
    }

    // 将历史数据渲染到html结构中
    function renderHistory(){
        var historyData = getHistoryData();
        var html = template("historyDataTemp",{"list":historyData});
        $(".historyData").html(html);
    }

    renderHistory();

    // 搜索按钮功能
    // 1.实现页面的跳转：传入用户搜索关键字
    // 2.将当前搜索关键字添加到localStorage中
        // 2.1 如果输入重复值：先删除再添加
        // 2.2 如果数量超过10条，则删除最先添加的再添加当前关键字
        // 2.3 最后输入的关键字应该在最前面显示
    $(".searchBtn").on("tap",function(){
        var value = $(".searchBox input").val();
        $(".searchBox input").val("");
        // if(value.trim() == ""){
        //     return;
        // }
        var historyData = getHistoryData();

        // 判断是否有相同的value值存在historyData数组中
        for(var i = 0; i < historyData.length; i++){
            //有，找到该值在数组中的index，然后删除旧值,重新添加新的value值
            if(historyData[i] == value){
                historyData.splice(i,1);
                break;
            }
        }

        // 判断数量是否超出指定的限制，如果是则删除最先添加的数据-索引0对应的数据
        if(historyData.length > 10){
            historyData.splice(0,1);
        }

        historyData.push(value);
        // console.log(historyData);
        localStorage.setItem("historyData",JSON.stringify(historyData));

        location.href = "./searchList.html?proName="+value;
        renderHistory();
    });

    // 删除单个历史记录
    $(".historyData").on("tap",".fa-close",function(){
        var index = $(this).parent().data("index");
        console.log(index);
        var historyData = getHistoryData();
        historyData.splice(index,1);
        localStorage.setItem("historyData",JSON.stringify(historyData));
        renderHistory();
    });

    // 清除所有历史记录
    $(".clearAllHis").on("tap",function(){
        localStorage.setItem("historyData",'[]');
        renderHistory();
    });

    // 点击搜索历史记录直接搜索
    $(".historyData").on("tap",".historyContent",function(){
        $(".searchBox input").val($(this).text());
        $(".searchBtn").trigger("tap");
    });

});