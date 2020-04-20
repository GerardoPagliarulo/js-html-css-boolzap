$(document).ready(function () {
    // Referenze
    var actualChat = $('.conversation');
    var newMessage = $('.new-message');
    var sendBtn = $('.fa-paper-plane');
    var searchContact =  $('.side-search input');
    //var friendsName = $('.side-contacts .avatar-name h5');

    // Focus input message-bar con cambio di icona
    newMessage.focus(function () {
        $('.fa-microphone').addClass('no-active').next().removeClass('no-active');
    });

    // Blur su input message-bar
    //newMessage.blur( function () {
        //sendBtn.addClass('no-active').prev().removeClass('no-active');
    //});

    // Messaggio inviato con il tasto Enter
    newMessage.keydown(function (e) { 

        if (e.which == 13) {
            sendmessage();

            // Risposta dopo 1s
            setTimeout (risposta, 1000);
        }
    });

    // Messaggio inviato con click su icona "plane"
    sendBtn.click(function () { 

        sendmessage();

        // Risposta interlocutore dopo 1s
        setTimeout (risposta, 1000);

        sendBtn.addClass('no-active').prev().removeClass('no-active');
    });

    // Scorrimento automatico della Chat
    //var chatDisplay = $('.content-display-chat .conversation li');
    //chatDisplay.scrollTop(chatDisplay.innerHeight());

    // Ricerca Contatti
    searchContact.keyup(function () {
        $('.side-contacts ul li').hide();
        var friendsContact = $(this).val().trim().toLowerCase();
        //console.log(friendsContact);

        $('.side-contacts .avatar-name h5').each(function () {
            if ($(this, '.side-contacts .avatar-name h5').text().toLowerCase().includes(friendsContact)) {
                $(this).parents().show();
            }
        });
    });


     // FUNZIONI
    // Funzione: Invio Messaggi
    function sendmessage() {
        var text = newMessage.val().trim();

        if (text !== '') {
            $('.template li p').text(text);

            var newMessageWrited = $('.template li').clone(); 

            newMessageWrited.addClass('my-message');

            actualChat.append(newMessageWrited);

            //$('.template li p').text('');
            newMessage.val('');        
        }
    }

    //Funzione: Risposta
    function risposta() {
        $('.template li p').text('Ok');

        var returnMessage = $('.template li').clone(); 

        returnMessage.addClass('friends-message');

        actualChat.append(returnMessage);
    }

}); // End Ready