$('#addCategory').on('submit', function() {
    let formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function() {
            location.reload()
        }
    })
    return false
})

$.ajax({
    type: 'get',
    url: '/categories',
    success: function(res) {
        let html = template('categoryListTpl', { data: res })
        $('#categoryBox').html(html)
    }
});
//将修改功能渲染到页面
$('#categoryBox').on('click', '.edit', function() {
    let id = $(this).data('id');
    $.ajax({
        type: 'get',
        url: `/categories/${id}`,
        success: function(res) {
            let html = template('formTpl', res)
            $('#modifyForm').html(html)
        }
    })
});
//将修改后的信息提交给后台并刷新页面 
$('#modifyForm').on('click', '.modify', function() {
    let formData = $('#addCategory').serialize()
    let id = $(this).data('id');
    $.ajax({
        url: `/categories/${id}`,
        type: 'put',
        data: formData,
        success: function() {
            location.reload()
        }
    })
    return false
})

$('#categoryBox').on('click', '.delete', function() {
    if (confirm('您真的要删除分类吗?')) {
        let id = $(this).siblings('a').data('id');
        $.ajax({
            type: 'delete',
            url: `/categories/${id}`,
            success: function(res) {
                location.reload()
            }
        })
    }

})