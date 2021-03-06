<?php
    if (!isset($_REQUEST['firstname'])) exit('No direct script access allowed 1');
    if (!isset($_REQUEST['phone'])) exit('No direct script access allowed 2');

        $to = "info@gpsoff.ru";
        $subject = 'Письмо с Лендинга - Франшиза сети магазинов.'; //Заголовок сообщения
        $message = '
                <div style="font-family: Time New Roman; font-size: 14pt;">
                    <p>Имя: '.trim(strip_tags($_REQUEST['firstname'])).'</p>
                    <p>Телефон: '.trim(strip_tags($_REQUEST['phone'])).'</p>
                    <p>Дополнительная информация: '.$_REQUEST['obj'].'</p>                                  
                </div>'; //Текст сообщения
        $headers  = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
        $headers .= "Дата: ".date("Y-m-d (H:i:s)", time())."\r\n";
        $headers .= "From: Отправитель форма с лэндинга\r\n"; //Наименование и почта отправителя
        $sendmail = mail($to, $subject, $message, $headers); //Отправка письма с помощью функции mail

        if($sendmail) {
            echo "Your confirmation link has been sent to your e-mail address.";
        } else {
            echo "Error while sending confirmation link to your e-mail address";
        }
?>