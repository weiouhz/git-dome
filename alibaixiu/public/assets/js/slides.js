$('#image').on('change', function() {
    let file = this.files[0]
    let formData = new FormData()
    formData.append('image', file)

    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        contentType: false,
        processData: false,
        success: function(response) {
            response[0].image && $('#file').val(response[0].image);
            response[0].image && $('#images').attr('src', response[0].image).show();
        }
    });
})

let arr = [];
$('#pAdd').on('click', function() {
    $.ajax({
        url: '/slides',
        type: 'post',
        data: $('#formAdd').serialize(),
        success: function(res) {
            arr.push(res)
            render(arr)
            $('#images').attr('src', '').hide()
            $('#image').val('')
            $('#file').val('')
            $('#text').val('')
            $('#link').val('')
        }
    })
    return false
})


$.ajax({
    type: "get",
    url: "/slides",
    success: function(response) {
        arr = response;
        render(arr)
    }
});

function render(data) {
    let html = template('imageTpl', { res: data })
    $('#imageBox').html(html)
}

$('#imageBox').on('click', '.delete', function() {
    if (confirm('是否确认删除')) {
        let id = $(this).data('id')
        $.ajax({
            type: "delete",
            url: `/slides/${id}`,
            success: function(response) {
                let index = arr.findIndex(item => item._id == response._id)
                arr.splice(index, 1)
                render(arr)
            }
        });
    }

})