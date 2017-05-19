$('.modal').modal();

$(document).on("click", "li", function() {
    // Empty the comments from the comments section
    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "GET",
        url: "/articles/" + thisId

    })

        .done(function(data) {
            console.log(data);
            // article title
            $(".modal-content").html("<h4>" + data.title + "</h4><br>" +
                "<input id='titleinput' name='title' >" +
                "<textarea id='bodyinput' name='body'></textarea>");
            // button to submit new comment, tied to article id
            $(".modal-footer").html("<button data-id='" + data._id + "' id='savenote' class='modal-action modal-close'>Save Comment</button>");


            if (data.comment) {
                // display existing comment
                $("#titleinput").val(data.comment.title);
                $("#bodyinput").val(data.comment.body);
            }
            $('#modal1').modal('open');
        });
});

$(document).on('click', '#savenote', function(){
    var thisId = $(this).attr('data-id');

    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            title: $('#titleinput').val(),
            body: $('#bodyinput').val()
        }
    })
        .done(function( data ) {
            console.log(data);
            $('#notes').empty();
        });


    $('#titleinput').val("");
    $('#bodyinput').val("");
});