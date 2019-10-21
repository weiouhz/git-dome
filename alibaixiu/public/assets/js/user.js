//向服务器提交添加用户信息并刷新界面
$('#userForm').on('submit', function() {
    let formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: "/users",
        data: formData,
        success: function(res) {
            location.reload();
        },
        error: function(err) {
            alert('用户添加失败')
        }
    });
    //阻止表单默认提交功能
    return false
})



// $('#avatar').on('change', function() {})

//将图片预览功能委托给父节点
$('#modifyBox').on('change', '#avatar', function() {
    let formData = new FormData();
    formData.append('avatar', this.files[0])
    $.ajax({
        type: 'post',
        url: "/upload",
        data: formData,
        //告诉ajax方法不要解析请求参数
        processData: false,
        //告诉ajax方法不要设置请求参数的类型
        contentType: false,
        success: function(res) {
            $('#preview').attr('src', res[0].avatar)
            $('#hiddenAvatar').val(res[0].avatar)
        }
    })
})

//渲染用户展示界面
$.ajax({
    type: 'get',
    url: '/users',
    success: function(res) {
        let html = template('tpl', { data: res })
        $('#userBox').html(html)
    }
})

//渲染用户修改界面模板
$('#userBox').on('click', '.edit', function() {
    //获取被修改用户的ID
    let id = $(this).data('id');

    $.ajax({
        type: 'get',
        url: `/users/${id}`,
        success: function(res) {
            let html = template('modifyTpl', res)
            $('#modifyBox').html(html)
        }
    })

})

//向服务器提交用户修改信息并刷新界面
$('#modifyBox').on('submit', "#modifyForm", function() {
    let formData = $(this).serialize();
    let id = $(this).data('id');
    $.ajax({
        type: 'put',
        url: `/users/${id}`,
        data: formData,
        success: function(res) {
            location.reload()
        }
    });
    //阻止表单默认提交功能
    return false
})

$('#userBox').on('click', '.delete', function() {
    if (confirm('您确认要删除用户吗')) {
        let id = $(this).siblings('a').data('id');
        $.ajax({
            type: 'delete',
            url: `/users${id}`,
            success: function(res) {
                location.reload()
            }
        })
    }
})

$('#selectAll').on('change', function() {
    let status = $(this).prop('checked');
    $('#userBox').find('input').prop('checked', status)
    if (status) {
        $('#deleteMany').show();
    } else {
        $('#deleteMany').hide();
    }
})

$('#userBox').on('change', '.userStatus', function() {
    let inputs = $('#userBox').find('input')
    if (inputs.length == inputs.filter(':checked').length) {
        $('#selectAll').prop('checked', true)
    } else {
        $('#selectAll').prop('checked', false)
    }

    if (inputs.filter(':checked').length >= 2) {
        $('#deleteMany').show();
    } else {
        $('#deleteMany').hide();
    }
})

$('#deleteMany').on('click', function() {
    let ids = [];
    let checkedUser = $('#userBox').find('input').filter(':checked')
    checkedUser.each(function(i, doc) {
        ids.push($(doc).data('id'))
    })
    if (confirm('您确定要批量删除吗')) {
        $.ajax({
            type: 'delete',
            url: `/users/${ids.join('-')}`,
            success: function(res) {
                location.reload()
            }
        })
    }
})