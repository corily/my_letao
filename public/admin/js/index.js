$(function(){

    // $(".lti_left").load("left.html");
    // $(".lti_right_top").load("top.html");


    // 基于准备好的dom，初始化echarts实例
    var myChart1 = echarts.init(document.querySelector('.lti_right_bottomLeft'));

    // 初始化柱状图
    var option1 = {
        title: {
            text: '2018年注册人数'
        },
        tooltip: {},
        legend: {
            data:['人数']
        },
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [500, 2000, 3600, 1000, 1000, 2500,1290,1828,3000,4500,2500,2800,3600]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1);



    // 基于准备好的dom，初始化echarts实例
    var myChart2 = echarts.init(document.querySelector('.lti_right_bottomRight'));
    
    // 初始化圆饼状图
    var option2 = {
        title : {
            text: '热门品牌销售',
            subtext: '2018年1月',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克','阿迪','百伦','安踏','李宁']
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'耐克'},
                    {value:310, name:'阿迪'},
                    {value:234, name:'百伦'},
                    {value:135, name:'安踏'},
                    {value:1548, name:'李宁'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart2.setOption(option2);


});