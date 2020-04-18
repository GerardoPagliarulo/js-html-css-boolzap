$(document).ready(function () {
    var actualChat = $('.conversation');
    var newMessage = $('.new-message');
    var sendbtn = $('.fa-telegram-plane');

    $('.new-message').focus(function () {
        $('.fa-microphone').addClass('no-active').next().removeClass('no-active');
    });

    newMessage.keydown(function (e) { 

        if (e.which == 13) {
            sendmessage();
            //if (e.which) {
            //    $('.fa-microphone').addClass('no-active').next().removeClass('no-active');
            //}
        }
    });

    $('.fa-telegram-plane').click(function () { 
        sendmessage();
    });

    // Scorrimento Chat
    //var chatDisplay = $('.content-display-chat');
    //chatDisplay.scrollTop(chatDisplay.innerHeight());


    // FUNZIONI
    // Funzione: Invio Messaggi
    function sendmessage() {
        var text = newMessage.val().trim();

        if (text !== '') {
            $('.template li p').text(text);

            var newMessageWrited = $('.template li').clone(); 

            actualChat.append(newMessageWrited);

            $('.template li p').text('');
            newMessage.val('');        
        }

        sendbtn.addClass('no-active').prev().removeClass('no-active');
    }

}); // End Ready