(function () {


    var sendMessage = function (text) {
        var $messages, message;
        if (text.trim() === '') {
            return;
        }
        $('.message_input').val('');
        $messages = $('.messages');
        // Validar a qué lado se mostrará el mensaje, la primer posibilidad puede ser con el nombre que introduzca el usuario
        var message_side = message_side === 'left' ? 'right' : 'left';
        message = new Message({
            text: text,
            message_side: message_side
        });
        message.draw();
        return $messages.animate({
            scrollTop: $messages.prop('scrollHeight')
        }, 300);
    };

    var Message;
    Message = function (arg) {
        this.text = arg.text, this.message_side = arg.message_side;

        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $('.messages').append($message);
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };




    $(function () {
        var getMessageText, message_side, sendMessage;
        message_side = 'right';
        getMessageText = function () {
            var $message_input;
            $message_input = $('.message_input');
            return $message_input.val();
        };

        enviarMensaje = function (data) {
            db.collection("chat").add({
                    nombre: data.nombre,
                    fecha: new Date,
                    mensaje: data.mensaje
                })
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        }





        guardarMessage = function () {
            var $messages, message;

            var data = {
                nombre: 'Luis Raga',
                mensaje: $('.message_input').val()
            }

            message_side = message_side === 'left' ? 'right' : 'left';

            enviarMensaje(data)
            // return $messages.animate({
            //     scrollTop: $messages.prop('scrollHeight')
            // }, 300);
        };











        sendMessage = function (text) {
            var $messages, message;
            if (text.trim() === '') {
                return;
            }
            $('.message_input').val('');
            $messages = $('.messages');
            message_side = message_side === 'left' ? 'right' : 'left';
            message = new Message({
                text: text,
                message_side: message_side
            });
            message.draw();
            return $messages.animate({
                scrollTop: $messages.prop('scrollHeight')
            }, 300);
        };
        $('.send_message').click(function (e) {
            return guardarMessage();
        });
        $('.message_input').keyup(function (e) {
            if (e.which === 13) {
                return sendMessage(getMessageText());
            }
        });

        // Leer mensajes de la db y dejar escucha de cambios
        db.collection("chat").orderBy("fecha", "asc").onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data());
                setTimeout(function () {
                    return sendMessage(doc.data().mensaje);
                }, 1000);
            });
        });
    });







    sendMessage('jkbasjdb')

}.call(this));






$('.maximize').click(() => {
    $('#control').removeClass('hide')
    $('#control').addClass('show')
    $('.title').text('Chat')
    $('.title').css({
        fontSize: '15px'
    })
})

$('.close').click(() => {
    $('#control').removeClass('show')
    $('#control').addClass('hide')
    $('.title').text('Estamos en Linea....')

})

leerMensajes();


function enviarMensaje(data) {
    db.collection("chat").add({
            nombre: data.nombre,
            fecha: new Date,
            mensaje: data.mensaje
        })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}


function leerMensajes() {

}