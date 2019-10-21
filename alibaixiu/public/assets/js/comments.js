$.ajax({
    type: "get",
    url: "/comments",
    success: function(response) {
        render(response)
    }
});

function render(response) {
    let html = template('commentsTpl', response)
    $('#commentsBox').html(html)
    let page = template('pageTpl', response)
    $('#Page').html(page)
}

function changePage(page) {
    $.ajax({
        type: "get",
        url: "/comments",
        data: page,
        success: function(response) {
            let html = template('commentsTpl', response)
            $('#commentsBox').html(html)
            let page = template('pageTpl', response)
            $('#Page').html(page)
        }
    });
}

$('#commentsBox').on('click', '.status', function() {
    let status = $(this).data('status')
    let id = $(this).data('id')
    $.ajax({
        type: 'put',
        url: `/comments/${id}`,
        success: function(res) {
            render(res)
        }
    })
})

$('#commentsBox').on('click', '.delete', function() {
    if (confirm('您确定要删除吗?')) {
        let id = $(this).siblings('a').data('id')
        $.ajax({
            type: 'dalete',
            url: `/comments/${id}`,
            success: function(res) {
                render(res)
            }
        })
    }
})