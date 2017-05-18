$.getJSON('/articles', function(data){
    for(let i=0; i<data.length; i++){
        $('#articles').append('<div class="card blue darken-2"> <span class="card-title condensed thin center" id="' + data[i].title + '">' + data[i].title +  '</span> <p class="condensed thin" data-id="' + data[i]._id + '">' + data[i].body + '</p> <div class="card-action"> <a href="' + data[i].link + '" class="left thin text-black"> Read More </a>  <a id="addNote" data-id="' + data[i]._id + '"class="right thin text-black"> Add Note </a></div></div>  <br>');
    }
});

$(document).on('click', '#addNote', function(){
    $('#notes').empty();
    let thisId = $(this).attr('data-id');

    $.ajax({
        method: "GET",
        url: "/articles/" + thisId,
    })
        .done(function( data ) {
            console.log(data);
            $('#notes').append('<div class="row">');
            $('#notes').append('<h5 class="center thin">' + data.title + '</h5></div>');
            $('#notes').append('<div class="row">');
            $('#notes').append('<div class="input-field col s12">');
            $('#notes').append('<textarea class="center thin" id="titleinput" name="title"> </textarea> <label for="titleinput" class="center"> Title </label></div>');
            $('#notes').append('<div class="row"> <textarea id="bodyinput" name="body"></textarea> <label for="bodyinput" class="center">Add Notes</label></div>');
            $('#notes').append('<div class="row"><button data-id="' + data._id + '" id="savenote" class="waves-effect waves-light btn center-align thin blue darken-2">Save Note</button></div>');

            if(data.note){
                $('#titleinput').val(data.note.title);
                $('#bodyinput').val(data.note.body);
            }
        });
});

$(document).on('click', '#savenote', function(){
    let thisId = $(this).attr('data-id');

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
