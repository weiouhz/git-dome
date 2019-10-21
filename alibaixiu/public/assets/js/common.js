$('#logout').on('click', function() {
    let isConfirm = confirm('您确定要退出吗')
    if (isConfirm) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function(res) {
                location.href = 'login.html';
            },
            error: function() {
                alert('退出失败')
            }
        })
    }
})

function formateDate(date) {

    date = new Date(date)
    date.getFullYear() + '-' + (date.getMonth() + 1).padStart(2, "0") + '-' + date.getDate()
}