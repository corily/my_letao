$(function(){

    var currentPage = 1;
    var pageSize = 5;

    render()

    // 上架/下架按钮功能：弹出确认模态框
    var _this
    $('tbody').on("click",'.btn',function () {
        _this = this
        $('.isOnlineModal').modal('show')
    })

    // 模态框的“确认”按钮
    // 1、修改商品的状态(数据库操作)
    // 2、修改页面按钮的样式及内容(客户端操作)
    $('.userResureBtn').on('click',function () {
        // 判断该商品的状态是否为上架 statu=1 
        var statu = $(_this).text() == '下架' ? 0 : 1
        $(_this).data('statu',statu)
        // $(_this).data('proDesc','安踏踏')
        console.log($(_this).data())
        $.ajax({
            type:'post',
            url:'/product//updateProduct',
            data:$(_this).data(),
            dataType:'json',
            success: function (res) {
                console.log(res)
                if (res.success && res.success ==true) {
                    if(statu == 1){
                        $(_this).text('下架').parents('tr').find('.status').text('已上架商品');
                        _this.className = 'btn btn-danger'
                    }else{
                        $(_this).text('上架').parents('tr').find('.status').text('已下架商品');
                        _this.className = 'btn btn-info'
                    }
                }
            }
        })
        $('.isOnlineModal').modal('hide')
    })

    // 添加商品模态框的品牌数据渲染
    ;(function(){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            dataType:'json',
            success: function (res) {
                var html = ''
                res.rows.forEach(function (value,index) {
                    html += '<li><a href="javascript:;" data-brand-id="'+ value.id +'">'+ value.brandName +'</a></li>'
                })
                $('.dropdown-menu').html(html)
            }
        })
    })()


    // 添加商品按钮功能：弹出商品模态框
    $('.addProBtn').on('click',function(){
        $('.addProModal').modal('show')
    })

    // 添加商品模态框里的选择品牌按钮功能
    $('.dropdown-menu').on('click','a',function () {
        $('.selectBrandName').text( $(this).text() ) 
        $('.brandId').val( $(this).data('brandId') ) 
    })

    // 添加商品模态框保存按钮
    $('.proSaveBtn').on('click',function(){
        console.log($('form').serialize())


        $('.addProModal').modal('hide')
    })

    // 多文件上传
    // $('#fileupload').fileupload({
    //     dataType: 'json',
    //     done: function (e, data) {
    //         // $.each(data.result.files, function (index, file) {
    //         //     $('<p/>').text(file.name).appendTo(document.body);
    //         // });
    //         console.log(111)
    //         console.log(data)
    //     }
    // });
      $('#fileupload').fileupload({
        dataType: 'json',
        singleFileUploads: false,
        // 上传请求成功时触发的回调函数
        done: function (e, data) {
            console.log(e);
            // $.each(data.result.files, function (index, file) {
            //     $('<p/>').text(file.name).appendTo(document.body);
            // });
        }
    });


    // 商品数据渲染
    function render () {
        $.ajax({
            type:'get',
            url:'/product/queryProductDetailList',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:'json',
            success:function (res) {
                // console.log(res)
                $("tbody").html(template('productTemp',res))
                setPaginator(Math.ceil(res.total / res.size))
            }
        })
    }

    // 分页结构
    function setPaginator (totalPages) {
        var options = {
            bootstrapMajorVersion:3,
            totalPages:totalPages,
            onPageClicked: function (event, originalEvent, type,page) {
                currentPage = page
                render()
            }
        }
        $('.pagination').bootstrapPaginator(options)
    }

})