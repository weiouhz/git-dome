$('#modifyForm').on('submit', function() {
    let formData = $(this).serialize()
    $.ajax({
        url: '/users/password',
        type: 'put',
        data: formData,
        success: function(res) {
            location.href = '/admin/login.html'
        }
    })
    return false
})