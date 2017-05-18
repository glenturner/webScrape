$('.modal').modal();


$.getJSON('/articles', function(data){
    for(var i=0; i<data.length; i++){
        $('#articles').append('<div class="card blue darken-2"> <span class="card-title condensed thin center" id="' + data[i].title + '">' + data[i].title +  '</span> <p class="condensed thin" data-id="' + data[i]._id + '">' + data[i].body + '</p> <div class="card-action"> <a href="' + data[i].link + '" class="left thin text-black"> Read More </a>  <a id="addNote" data-id="' + data[i]._id + '"class="right thin text-black"> Add Note </a></div></div>  <br>');
    }
});


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