render()

function render() {
    $.ajax({
        type: "get",
        url: "/posts",
        success: function(response) {
            let html = template('postsTpl', response);
            $('#postsBox').html(html)
            let page = template('pageTpl', response)
            $('#page').html(page)
        }
    });
}

function formateDate(date) {

    date = new Date(date)
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

function changePage(page) {
    $.ajax({
        type: "get",
        url: "/posts",
        data: {
            page
        },
        success: function(response) {
            let html = template('postsTpl', response);
            $('#postsBox').html(html)
            let page = template('pageTpl', response)
            $('#page').html(page)
        }
    });
}

$.ajax({
    type: 'get',
    url: '/categories',
    success: function(res) {
        let html = template("categoryTpl", { data: res })
        $('#categoryBox').html(html)
    }
})

$('#filterForm').on('submit', function() {
    let formDate = $(this).serialize()

    $.ajax({
        type: "get",
        url: "/posts",
        data: formDate,
        success: function(response) {
            let html = template('postsTpl', response);
            $('#postsBox').html(html)
            let page = template('pageTpl', response)
            $('#page').html(page)
        }
    })
    return false
})

//删除文章
$('#postsBox').on('click', '.delete', function() {
    if (confirm('您确定要删除文章吗?')) {
        let id = $(this).data('id')
        $.ajax({
            type: 'delete',
            url: `/posts/${id}`,
            success: function(response) {
                render()
            }
        })
    }
})