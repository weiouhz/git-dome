$.ajax({
    type: "get",
    url: "/categories",
    success: function(response) {
        let html = template('categoryTpl', { data: response })
        $('#category').html(html)
    }
});

$('#feature').on('change', function() {
    let file = this.files[0];
    let formData = new FormData()
    formData.append('cover', file)
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            $('#thumbnail').val(response[0].cover)
        }
    });
})

$('#addForm').on('submit', function() {
    let formData = $(this).serialize()
    console.log(formData);
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function(res) {
            location.href = '/admin/posts.html'
        }
    })
    return false;
})



function getUrlParams(name) {
    let paramsAry = location.search.substr(1).split('&')

    for (let key in paramsAry) {
        let tmp = paramsAry[key].split('=')
        if (tmp[0] == name) {
            return tmp[1]
        }
    }
    return -1;
}
let id = getUrlParams('id')
if (id != -1) {
    $.ajax({
        type: 'get',
        url: `/posts/${id}`,
        success: function(res) {

            $('#pAdd').hide()
            $('#pEdit').show()
            $('h1').text('修改文章')
            $('#title').val(res.title)
            $('#content').val(res.content);
            res.thumbnail && $('#prev').attr('src', res.thumbnail).show();
            $('#thumbnail').val(res.thumbnail)
            $('#category>option').each(function(i, doc) {
                if ($(doc).val() == res.category) {
                    $(doc).prop('selected', true)
                }
            });

            res.createAt && $('#created').val(res.createAt.substr(0, 16));

            $('#status>option').each(function(i, doc) {
                if ($(doc).val() == res.state) {
                    $(doc).prop('selected', true)
                }
            })

        }
    })
}

$("#pEdit").on('click', function() {
    $.ajax({
        type: 'put',
        url: `/posts/${id}`,
        data: $('#addForm').serialize(),
        success: function(res) {
            location.href = 'posts.html'
        }
    })
    return false
})