$( document ).ready( onReady );

function onReady(){
    getSongs();
    $( '#addSongButton' ).on( 'click', addSong );
    $(document).on('click', '.deleteSongButton', deleteSong);
    $(document).on('click', '.rankUpButton', rankUp);
    $(document).on('click', '.rankDownButton', rankDown);
} // end onReady

function deleteSong(){
    // Grab the `data-id` attribute
    // from our "Button"
    let songId = $(this).data('id');

    $.ajax({
        method: 'DELETE',
        url: `/songs/${songId}`
    }).then(function(response){
        console.log('deleted!', response);

        // TODO: refresh page (aka do another GET request)
        getSongs();
    }).catch(function(err){
        console.log('error in delete', err);
        alert('oh no');
    });
}

function addSong(){
    let objectToSend = {
        rank: $( '#rankIn' ).val(),
        artist: $( '#artistIn' ).val(),
        track: $( '#trackIn' ).val(),
        published: $( '#publishedIn' ).val()
    } // end object to send
    $.ajax({
        method: 'POST',
        url: '/songs',
        data: objectToSend
    }).then( function( response ){
        console.log( 'back from POST with:', response );
        getSongs();
    }).catch( function( err ){
        alert( 'error!' );
        console.log( err );
    }) // end AJAX POST
} // end addSong

function getSongs(){
    $.ajax({
        method: 'GET',
        url: '/songs'
    }).then( function( response ){
        console.log( 'back from GET with:', response ); 
        // display songs on DOM 
        let el = $( '#songsOut' );
        el.empty();
        for( let i=0; i<response.length; i++ ){
            el.append( `<li>
            ${ response[i].rank }
            ${ response[i].track }
            ${ response[i].artist }
            ${ response[i].published.split( 'T' )[0] }
            <button class="deleteSongButton" data-id="${response[i].id}">Bye</button>
            <button class="rankUpButton" data-id="${response[i].id}">Level Up!</button>
            <button class="rankDownButton" data-id="${response[i].id}">Rank Down</button>
            </li>`)
        } // end for
    }).catch( function( err ){
        alert( 'error!' );
        console.log( err );
    }) // end AJAX GET
} // end getSongs()

function rankUp(){
    let songId = $(this).data('id');
    console.log('level up!', songId);
    $.ajax({
        method: 'PUT',
        url: `/songs/${songId}`,
        data: {
            direction: 'up'
        }
        }).then(function(response){
            console.log('response from rankUp', response);
            getSongs();
        }).catch( function( err ){
            alert( 'error!' );
            console.log( err );
    }); // end ajax PUT
} // end rankUp

function rankDown(){
    let songId = $(this).data('id');
    console.log('rank down', songId);
}