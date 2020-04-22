$(document).ready(function () {
    // Referenze
    var newMessage = $('.new-message');
    var sendIcon = $('.content-messages-bar .send-icon');
    var searchContact =  $('.side-search input');
    


    /**
     *  FOCUS E BLUR INPUT
     */
    // Focus e Blur input message-bar con cambio di icona
    newMessage.on('focus blur', function () {
        sendIcon.toggleClass('fa-microphone fa-paper-plane');
    });

    // Focus input message-bar con cambio di icona
    //newMessage.focus(function () {
        //sendIcon.addClass('fa-paper-plane');
    //});

    // Blur su input message-bar
    //newMessage.blur( function () {
        //sendIcon.removeClass('fa-paper-plane');
    //});


    /**
     * INVIO MESSAGGIO
     */
    // Messaggio inviato con il tasto Enter
    newMessage.keydown(function (e) { 

        if (e.which == 13) {
            sendmessage();

            // Risposta interlocutore dopo 1s
            setTimeout (risposta, 1000);
        }
    });

    // Messaggio inviato con click su icona "paper-plane"
    sendIcon.click(function () { 

        sendmessage();

        // Risposta interlocutore dopo 1s
        setTimeout (risposta, 1000);
    });   
    
    /**
     * CANCELLAZIONE MESSAGGI
     */
    $('.chat-message').hover(function () {
        $(this).find('i').show();
            
        }, function () {
            $(this).find('i').hide();
        }
    );

    $('.chat-message .msg-info .fa-angle-down').click(function() {
        $(this).next('.list-msg-options').toggle();

        $('.delete-msg').click( function () {
            $(this).parents('.chat-message').remove();
        });
    });


    /*
     * RICERCA CONTATTI
     */
    // Ricerca contatti in search input
    searchContact.keyup(function () {
        var friendsName = $(this).val().trim().toLowerCase();
        //console.log(friendsName);

        $('.side-contacts .list-contacts li').hide(); 

        $('.side-contacts .avatar-name h5').each(function () {
            if ($(this, '.side-contacts .avatar-name h5').text().toLowerCase().includes(friendsName)) {
                $(this).parents().show();
            }
        });
    });

    //searchContact.keyup(function () {
        //var friendsName = $(this).val().trim().toLowerCase();
        ////console.log(friendsName);

        //$('.list-contacts li').each(function () {
            //var friendsContact = $(this).find('.avatar-name h5').text().toLowerCase();
            
            //if (friendsContact.includes(friendsName)) {
                //$(this).show();
            //}
            //else {
                //$(this).hide();
            //}
        //});
    //});


        /**
     * SELEZIONE DI UNA CONVERSAZIONE
     */

    $('.side-contacts .user').click(function() {

        if(!($(this).hasClass('active-profile'))) {
            $(this).addClass('active-profile');
            $(this).prevAll('.user').removeClass('active-profile');
            $(this).nextAll('.user').removeClass('active-profile');
        }

        var rightMessages = $(this).attr('data-conversation');
        //console.log(rightMessages);

        $('.right-messages').removeClass('active');

        $('.right-messages[data-conversation="' + rightMessages + '"]').addClass('active');

        // Scroll della chat
        scrollChat(); 
    });


    /******* 
    FUNZIONI
    *******/
    
    // Funzione: Invio Messaggi
    function sendmessage() {
        var text = newMessage.val().trim();

        if (text !== '') {
            $('.template .chat-message p').text(text);

            var newMessageWrited = $('.template .chat-message').clone(); 

            newMessageWrited.addClass('my-message');

            newMessageWrited.find('.msg-time').text(time());    

            var actualChat = $('.right-messages.active .conversation');
            actualChat.append(newMessageWrited);

            newMessage.val(''); 
            
            //Scroll della chat
            scrollChat(); 
        }
    }

    // Funzione: Risposta interlocutore
    function risposta() {
        $('.template .chat-message p').text('Ok');

        var returnMessage = $('.template .chat-message').clone(); 

        returnMessage.addClass('friends-message');

        returnMessage.find('.msg-time').text(time());    

        var actualChat = $('.right-messages.active .conversation');
        actualChat.append(returnMessage);

        // Scroll della chat
        scrollChat(); 
    }

    // Creazione e inserimento orario
    function time() {
        var data = new Date();
        var ora = addZero( data.getHours() );
        var minuti = addZero( data.getMinutes() );
        return orario = ora + ':' + minuti;
    }        

    // Aggiungi zero iniziale a numeri inferiori a 10
    function addZero(numero) {
        if(numero < 10) {
            numero = '0' + numero;
        }
        return numero;
    }

    // Funzione: Scorrimento automatico della Chat
    function scrollChat() {
        var pixelScroll = $('.right-messages').height();
        $('.content-display-chat').scrollTop(pixelScroll);    
    }
    
}); // End Ready