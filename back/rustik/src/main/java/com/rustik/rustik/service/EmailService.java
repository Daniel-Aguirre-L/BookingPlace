package com.rustik.rustik.service;


import com.rustik.rustik.model.Cabin;
import jakarta.mail.internet.MimeMessage;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDate;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${RUSTIK_URL}")
    private String RUSTIK_URL;

    @Value("${SPRING_MAIL_USERNAME}")
    private String SPRING_MAIL_USERNAME;

    public static final Logger logger = Logger.getLogger(UserService.class);


    public void sendRegistrationConfirmationEmail(String toEmail, String username) {

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom(SPRING_MAIL_USERNAME);
            helper.setTo(toEmail);
            helper.setSubject("¡Bienvenido a Rustik - Reserva tu Cabaña!");

            String body = String.format(
                    "<html>" +
                            "<body style='background: radial-gradient(circle at 50%% 10%%, #088395 26%%, #ffffff 100%%); display: flex; justify-content: center; align-items: center; margin: 0;'>" +
                            "<div id='main-container' style='margin: 0 auto; background-color: #088395; max-width: 80%%; width: 100%%; border-radius: 20px; text-align: center; transform: scale(0.5); box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);'>" +
                            "<div id='header' style='background-image: url(https://res.cloudinary.com/dmu6eqzqy/image/upload/v1733968034/fondo_email_kdwqsa.png); background-size: cover; margin: 0 auto; width: 100%%; height: 160px; border-radius: 20px 20px 0 0;'>" +
                            "<img id='logo-top' style='margin: 40px' src='https://res.cloudinary.com/dmu6eqzqy/image/upload/v1733968360/rustikwhite_eytcbr.png' alt='Rustik' />" +
                            "</div>" +
                            "<div id='content' style='margin: 30px auto; background-color: #f3f4f6; color: #0c1123; width: 100%%; max-width: 70%%; padding: 20px; border-radius: 20px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); font-family: Arial, sans-serif;'>" +
                            "<h1 id='greeting' style='text-align: center; color: #088395'>¡Bienvenido(a) %s!</h1>" +
                            "<p id='message' style='font-size: 16px; text-align: center'>¡Gracias por unirte a nuestra comunidad! Nos alegra saber que has elegido Rustik para planificar tu próxima escapada a la naturaleza. En nuestra plataforma podrás explorar una variedad de cabañas únicas, diseñadas para ofrecerte confort y tranquilidad.</p>" +
                            "<p id='message' style='font-size: 16px; text-align: center'>Ahora que ya eres parte de Rustik, comienza a planificar tu viaje y aprovecha las herramientas que hemos preparado para ti:</p>" +
                            "<ul style='text-align: left; font-size: 16px; margin: 0 auto; max-width: 80%%;'>" +
                            "<li style='font-size: 16px;'>Reserva cabañas de forma fácil y rápida.</li>" +
                            "<li style='font-size: 16px;'>Consulta disponibilidad y tarifas al instante.</li>" +
                            "<li style='font-size: 16px;'>Recibe recomendaciones personalizadas según tus preferencias.</li>" +
                            "</ul>" +
                            "<p id='confirmation' style='font-size: 16px; text-align: center'>Para comenzar, solo haz clic en el link de abajo y empieza a explorar:</p>" +
                            "<a href='%s' style='font-size: 16px; color: #088395; text-decoration: none;'>Acceder a Rustik</a>" +
                            "<p id='message' style='font-size: 16px; text-align: center'>Para acceder a tu cuenta, solo tienes que ingresar el correo registrado y contraseña.</p>" +
                            "<p id='confirmation' style='font-size: 16px; text-align: center'>Tu correo registrado: <strong>%s</strong></p>" +
                            "<p id='message' style='font-size: 16px; text-align: center'>¡Esperamos que disfrutes de la experiencia <img src='http://res.cloudinary.com/dmu6eqzqy/image/upload/v1731360711/Rustik-logo/ulwcjystr37bqblnje3p.png' alt='Rustik' style='height: 20px;' />!</p>" + "<p id='details-link' style='font-size: 16px; text-align: center'>Si tienes alguna duda, no dudes en contactarnos a través de nuestro <a href='mailto:%s' style='color: #088395; text-decoration: none;'>email de soporte</a>. ¡Estamos aquí para ayudarte!</p>" + "</div>" + "<div id='footer' style='padding: 30px;'>" +
                            "<img id='logo-bottom' src='https://res.cloudinary.com/dmu6eqzqy/image/upload/v1733968007/RKshort_tb6jga.png' alt='Rustik' style='height: 30px' />" +
                            "<div style='margin-top: 20px'>" +
                            "<a href='https://facebook.com' target='_blank' style='text-decoration: none; font-size: 0'><img src='https://res.cloudinary.com/dmu6eqzqy/image/upload/v1733968007/facebookicon_czkgi5.png' alt='Facebook' style='width: 20px; margin: 0 10px' /></a>" +
                            "<a href='https://instagram.com' target='_blank' style='text-decoration: none; font-size: 0'><img src='https://res.cloudinary.com/dmu6eqzqy/image/upload/v1733968007/instaicon_rs0eng.png' alt='Instagram' style='width: 20px; margin: 0 10px' /></a>" +
                            "<a href='https://twitter.com' target='_blank' style='text-decoration: none; font-size: 0'><img src='https://res.cloudinary.com/dmu6eqzqy/image/upload/v1733968034/twitterXicon_hxwrnm.png' alt='Twitter' style='width: 20px; margin: 0 10px' /></a>" +
                            "</div>" +
                            "</div>" +
                            "</div>" +
                            "</body>" +
                            "</html>",
                    username, RUSTIK_URL, toEmail, SPRING_MAIL_USERNAME
            );


            helper.setText(body, true);

            mailSender.send(message);
            logger.info("Correo de confirmación de registro enviado con éxito a " + toEmail);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public void sendBookingConfirmationEmail(String toEmail, String username, Cabin cabin, LocalDate initialDate, LocalDate endDate, Double totalPrice) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);  // true para usar HTML

            helper.setFrom(SPRING_MAIL_USERNAME);
            helper.setTo(toEmail);
            helper.setSubject("¡Confirmación de Reserva de Cabaña en Rustik!");

            String body = String.format(
                    "<html>" +
                            "<body style='background: radial-gradient(circle at 50%% 10%%, #088395 26%%, #ffffff 100%%); display: flex; justify-content: center; align-items: center; margin: 0;'>" +
                            "<div id='main-container' style='margin: 0 auto; background-color: #088395; max-width: 80%%; width: 100%%; border-radius: 20px; text-align: center; transform: scale(0.5); box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);'>" +
                            "<div id='header' style='background-image: url(https://res.cloudinary.com/dmu6eqzqy/image/upload/v1733968034/fondo_email_kdwqsa.png); background-size: cover; margin: 0 auto; width: 100%%; height: 160px; border-radius: 20px 20px 0 0;'>" +
                            "<img id='logo-top' style='margin: 40px' src='https://res.cloudinary.com/dmu6eqzqy/image/upload/v1733968360/rustikwhite_eytcbr.png' alt='Rustik' />" +
                            "</div>" +
                            "<div id='content' style= 'margin: 30px auto; background-color: #f3f4f6; color: #0c1123; width: 100%%; max-width: 70%%; padding: 20px; border-radius: 20px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); font-family: Arial, sans-serif;'>" +
                            "<h1 id='greeting' style='text-align: center; color: #088395'>¡Hola, %s!</h1>" + "<p id='message' style='font-size: 16px; text-align: center'>Gracias por tu reserva en Rustik. Aquí están los detalles de tu reserva:</p>" +
                            "<br />" +
                            "<p class='reservation-detail'><strong>Cabaña:</strong> %s</p>" +
                            "<p class='reservation-detail'><strong>Lugar:</strong> %s</p>" +
                            "<p class='reservation-detail'><strong>Fecha de inicio:</strong> %s</p>"
                            + "<p class='reservation-detail'><strong>Fecha de fin:</strong> %s</p>" +
                            "<p class='reservation-detail'><strong>Precio total:</strong> $%.2f</p>" +
                            "<br />" +
                            "<p id='confirmation' style='font-size: 16px; text-align: center'>¡Estamos emocionados de que hayas elegido Rustik para tu escapada! Esperamos que disfrutes tu estancia.</p>" +
                            "<p id='details-link' style='font-size: 16px; text-align: center'>Para más detalles, visita tu reserva en Rustik</a>.</p>" +
                            "<a href='%s'>" +
                            "<button id='reservation-button' style='background-color: #fbffbd; color: #0c1123; border: none; margin: 10px; padding: 12px 32px; border-radius: 8px; font-size: 16px; cursor: pointer; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); transition: all 0.3s ease-in-out;' onmouseover=\"this.style.backgroundColor='#E9ECB7';\" onmouseout=\"this.style.backgroundColor='#FBFFBD';\">Ver Reservación</button>" +
                            "</div>" +
                            "<div id='footer' style='padding: 30px'>" +
                            "<img id='logo-bottom' src='https://res.cloudinary.com/dmu6eqzqy/image/upload/v1733968007/RKshort_tb6jga.png' alt='Rustik' style='height: 30px' />" +
                            "<div style='margin-top: 20px'>" +
                            "<a href='https://facebook.com' target='_blank' style='text-decoration: none; font-size: 0'><img src='https://res.cloudinary.com/dmu6eqzqy/image/upload/v1733968007/facebookicon_czkgi5.png' alt='Facebook' style='width: 20px; margin: 0 10px' /></a>" +
                            "<a href='https://instagram.com' target='_blank' style='text-decoration: none; font-size: 0'><img src='https://res.cloudinary.com/dmu6eqzqy/image/upload/v1733968007/instaicon_rs0eng.png' alt='Instagram' style='width: 20px; margin: 0 10px' /></a>" +
                            "<a href='https://twitter.com' target='_blank' style='text-decoration: none; font-size: 0'><img src='https://res.cloudinary.com/dmu6eqzqy/image/upload/v1733968034/twitterXicon_hxwrnm.png' alt='Twitter' style='width: 20px; margin: 0 10px' /></a>" +
                            "</div>" + "</div>" +
                            "</div>" + "</body>" +
                            "</html>",
              
                    username, cabin.getName(), cabin.getLocation(), initialDate, endDate, totalPrice, RUSTIK_URL
            );

            helper.setText(body, true);

            mailSender.send(message);
            logger.info("Correo de confirmación de reserva enviado con éxito a " + toEmail);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public void sendBookingCancellationEmail(String toEmail, String username, Cabin cabin, LocalDate initialDate, LocalDate endDate, Double totalPrice) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);  // true para usar HTML

            helper.setFrom(SPRING_MAIL_USERNAME);
            helper.setTo(toEmail);
            helper.setSubject("¡Cancelación de Reserva de Cabaña en Rustik!");

            String body = String.format(
                    "<html>" +
                            "<body style='background: radial-gradient(circle at 50%% 10%%, #088395 26%%, #ffffff 100%%); display: flex; justify-content: center; align-items: center; margin: 0;'>" +
                            "<div id='main-container' style='margin: 0 auto; background-color: #088395; max-width: 80%%; width: 100%%; border-radius: 20px; text-align: center; transform: scale(0.5); box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);'>" + "<div id='header' style='background-image: url(https://res.cloudinary.com/dmu6eqzqy/image/upload/v1733968034/fondo_email_kdwqsa.png); background-size: cover; margin: 0 auto; width: 100%%; height: 160px; border-radius: 20px 20px 0 0;'>" +
                            "<img id='logo-top' style='margin: 40px' src='https://res.cloudinary.com/dmu6eqzqy/image/upload/v1733968360/rustikwhite_eytcbr.png' alt='Rustik' />" +
                            "</div>" +
                            "<div id='content' style='margin: 30px auto; background-color: #f3f4f6; color: #0c1123; width: 100%%; max-width: 70%%; padding: 20px; border-radius: 20px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); font-family: Arial, sans-serif;'>" +
                            "<h1 id='greeting' style='text-align: center; color: #088395'>Hola, %s</h1>" + "<p id='message' style='font-size: 16px; text-align: center'>Te informamos que tu reserva en Rustik ha sido cancelada. Aquí están los detalles de tu reserva cancelada:</p>" +
                            "<br />" +
                            "<p class='reservation-detail'><strong>Cabaña:</strong> %s</p>" +
                            "<p class='reservation-detail'><strong>Lugar:</strong> %s</p>" +
                            "<p class='reservation-detail'><strong>Fecha de inicio:</strong> %s</p>" +
                            "<p class='reservation-detail'><strong>Fecha de fin:</strong> %s</p>" +
                            "<p class='reservation-detail'><strong>Precio total:</strong> $%.2f</p>" +
                            "<br />" +
                            "<p id='confirmation' style='font-size: 16px; text-align: center'> Si tienes alguna pregunta o necesitas asistencia, por favor contáctanos.</p>" +
                            "<p id='details-link' style='font-size: 16px; text-align: center'>Para más detalles, visita tu cuenta en Rustik.</p>" + "<a href='%s'>" +
                            "<button id='reservation-button' style='background-color: #fbffbd; color: #0c1123; border: none; margin: 10px; padding: 12px 32px; border-radius: 8px; font-size: 16px; cursor: pointer; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); transition: all 0.3s ease-in-out;' onmouseover=\"this.style.backgroundColor='#E9ECB7';\" onmouseout=\"this.style.backgroundColor='#FBFFBD';\">Ver Detalles</button>" +
                            "</a>" +
                            "</div>" +
                            "<div id='footer' style='padding: 30px'>" +
                            "<img id='logo-bottom' src='https://res.cloudinary.com/dmu6eqzqy/image/upload/v1733968007/RKshort_tb6jga.png' alt='Rustik' style='height: 30px' />" +
                            "<div style='margin-top: 20px'>" +
                            "<a href='https://facebook.com' target='_blank' style='text-decoration: none; font-size: 0'><img src='https://res.cloudinary.com/dmu6eqzqy/image/upload/v1733968007/facebookicon_czkgi5.png' alt='Facebook' style='width: 20px; margin: 0 10px' /></a>" +
                            "<a href='https://instagram.com' target='_blank' style='text-decoration: none; font-size: 0'><img src='https://res.cloudinary.com/dmu6eqzqy/image/upload/v1733968007/instaicon_rs0eng.png' alt='Instagram' style='width: 20px; margin: 0 10px' /></a>" +
                            "<a href='https://twitter.com' target='_blank' style='text-decoration: none; font-size: 0'><img src='https://res.cloudinary.com/dmu6eqzqy/image/upload/v1733968034/twitterXicon_hxwrnm.png' alt='Twitter' style='width: 20px; margin: 0 10px' /></a>" +
                            "</div>" + "</div>" +
                            "</div>" +
                            "</body>" +
                            "</html>",
                    username, cabin.getName(), cabin.getLocation(), initialDate, endDate, totalPrice, RUSTIK_URL
            );

            helper.setText(body, true);

            mailSender.send(message);
            logger.info("Correo de cancelación de reserva enviado con éxito a " + toEmail);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void sendResetPasswordEmail(String toEmail, String username, String token) {

        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(5);
        for (int i = 0; i < 5; i++) {
            int index = random.nextInt(characters.length());
            sb.append(characters.charAt(index));
        }
        String resetPasswordUrl = RUSTIK_URL + "/reset-password?key=" + sb.toString() + token;
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom(SPRING_MAIL_USERNAME);
            helper.setTo(toEmail);
            helper.setSubject("Restablecimiento de contraseña Rustik");
            logger.info("Correo de restablecimiento de contraseña enviado con éxito a " + toEmail);
            logger.info("Enlace generado: " + resetPasswordUrl);

            String body = String.format(
                    "<html>" + "<body style='background: radial-gradient(circle at 50%% 10%%, #088395 26%%, #ffffff 100%%); display: flex; justify-content: center; align-items: center; margin: 0;'>" + "<div id='main-container' style='margin: 0 auto; background-color: #088395; max-width: 80%%; width: 100%%; border-radius: 20px; text-align: center; transform: scale(0.5); box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);'>" + "<div id='header' style='background-image: url(https://res.cloudinary.com/dmu6eqzqy/image/upload/v1733968034/fondo_email_kdwqsa.png); background-size: cover; margin: 0 auto; width: 100%%; height: 160px; border-radius: 20px 20px 0 0;'>" +
                            "<img id='logo-top' style='margin: 40px' src='https://res.cloudinary.com/dmu6eqzqy/image/upload/v1733968360/rustikwhite_eytcbr.png' alt='Rustik' />" + "</div>" +
                            "<div id='content' style='margin: 30px auto; background-color: #f3f4f6; color: #0c1123; width: 100%%; max-width: 70%%; padding: 20px; border-radius: 20px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); font-family: Arial, sans-serif;'>" + "<h1 id='greeting' style='text-align: center; color: #088395'>¡Hola, %s!</h1>" + "<p id='message' style='font-size: 16px; text-align: center'>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en Rustik. Si fuiste tú quien lo solicitó, haz clic en el siguiente enlace para crear una nueva contraseña:</p>" +
                            "<a href='%s' style='font-size: 16px; color: #088395; text-decoration: none;'>Restablecer mi contraseña en Rustik</a>" +
                            "<p id='message' style='font-size: 16px; text-align: center'>Si no solicitaste este cambio, no es necesario que hagas nada. Tu contraseña seguirá siendo la misma y no se realizarán modificaciones en tu cuenta.</p>" + "<p id='confirmation' style='font-size: 16px; text-align: center; margin-top: 20px;'><strong>¿No puedes hacer clic en el enlace?</strong></p>" + "<p id='details-link' style='font-size: 16px; text-align: center'>Copia y pega la siguiente URL en tu navegador para restablecer tu contraseña:</p>" + "<p id='details-link' style='font-size: 16px; text-align: center; margin: 5px 0;'>%s</p>" +
                            "<p id='details-link' style='font-size: 16px; text-align: center'>Este enlace expirará en 24 horas, así que asegúrate de utilizarlo dentro de ese plazo.</p>" + "<p id='details-link' style='font-size: 16px; text-align: center; margin-top: 20px;'>Si tienes alguna duda, no dudes en contactarnos a través de nuestro <a href='mailto:%s' style='color: #088395; text-decoration: none;'>email de soporte</a>. ¡Estamos aquí para ayudarte!</p>" +
                            "<br />" + "<p id='signature' style='font-size: 16px; text-align: center;'>Saludos,</p>" +
                            "<p id='signature' style='font-size: 16px; text-align: center;'>El equipo de <strong>Rustik</strong></p>" +
                            "<br />" +
                            "</div>" +
                            "<div id='footer' style='padding: 30px;'>" +
                            "<img id='logo-bottom' src='https://res.cloudinary.com/dmu6eqzqy/image/upload/v1733968007/RKshort_tb6jga.png' alt='Rustik' style='height: 30px' />" + "<div style='margin-top: 20px'>" +
                            "<a href='https://facebook.com' target='_blank' style='text-decoration: none; font-size: 0'><img src='https://res.cloudinary.com/dmu6eqzqy/image/upload/v1733968007/facebookicon_czkgi5.png' alt='Facebook' style='width: 20px; margin: 0 10px' /></a>" +
                            "<a href='https://instagram.com' target='_blank' style='text-decoration: none; font-size: 0'><img src='https://res.cloudinary.com/dmu6eqzqy/image/upload/v1733968007/instaicon_rs0eng.png' alt='Instagram' style='width: 20px; margin: 0 10px' /></a>" +
                            "<a href='https://twitter.com' target='_blank' style='text-decoration: none; font-size: 0'><img src='https://res.cloudinary.com/dmu6eqzqy/image/upload/v1733968034/twitterXicon_hxwrnm.png' alt='Twitter' style='width: 20px; margin: 0 10px' /></a>" +
                            "</div>" +
                            "</div>" +
                            "</div>" +
                            "</body>" +
                            "</html>",
                    username, resetPasswordUrl, resetPasswordUrl, SPRING_MAIL_USERNAME
            );
            helper.setText(body, true);
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
    public void sendBookingUpdateEmail(String toEmail, String username, Cabin cabin, LocalDate initialDate, LocalDate endDate, Double totalPrice) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);  // true para usar HTML

            helper.setFrom(SPRING_MAIL_USERNAME);
            helper.setTo(toEmail);
            helper.setSubject("¡Confirmación de cambio en la reserva de Cabaña en Rustik!");

            String body = String.format(
                    "<html>" +
                            "<body style='background: radial-gradient(circle at 50%% 10%%, #088395 26%%, #ffffff 100%%); display: flex; justify-content: center; align-items: center; margin: 0;'>" +
                            "<div id='main-container' style='margin: 0 auto; background-color: #088395; max-width: 80%%; width: 100%%; border-radius: 20px; text-align: center; transform: scale(0.5); box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);'>" +
                            "<div id='header' style='background-image: url(https://res.cloudinary.com/dmu6eqzqy/image/upload/v1733968034/fondo_email_kdwqsa.png); background-size: cover; margin: 0 auto; width: 100%%; height: 160px; border-radius: 20px 20px 0 0;'>" +
                            "<img id='logo-top' style='margin: 40px' src='https://res.cloudinary.com/dmu6eqzqy/image/upload/v1733968360/rustikwhite_eytcbr.png' alt='Rustik' />" +
                            "</div>" +
                            "<div id='content' style= 'margin: 30px auto; background-color: #f3f4f6; color: #0c1123; width: 100%%; max-width: 70%%; padding: 20px; border-radius: 20px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); font-family: Arial, sans-serif;'>" +
                            "<h1 id='greeting' style='text-align: center; color: #088395'>¡Hola, %s!</h1>" + "<p id='message' style='font-size: 16px; text-align: center'>El cambio de tu reserva ha sido generado con éxito. Aquí están los detalles de tu reserva:</p>" +
                            "<br />" +
                            "<p class='reservation-detail'><strong>Cabaña:</strong> %s</p>" +
                            "<p class='reservation-detail'><strong>Lugar:</strong> %s</p>" +
                            "<p class='reservation-detail'><strong>Fecha de inicio:</strong> %s</p>"
                            + "<p class='reservation-detail'><strong>Fecha de fin:</strong> %s</p>" +
                            "<p class='reservation-detail'><strong>Precio total:</strong> $%.2f</p>" +
                            "<br />" +
                            "<p id='confirmation' style='font-size: 16px; text-align: center'>¡Estamos emocionados de que hayas elegido Rustik para tu escapada! Esperamos que disfrutes tu estancia.</p>" +
                            "<p id='details-link' style='font-size: 16px; text-align: center'>Para más detalles, visita tu reserva en Rustik</a>.</p>" +
                            "<a href='%s'>" +
                            "<button id='reservation-button' style='background-color: #fbffbd; color: #0c1123; border: none; margin: 10px; padding: 12px 32px; border-radius: 8px; font-size: 16px; cursor: pointer; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); transition: all 0.3s ease-in-out;' onmouseover=\"this.style.backgroundColor='#E9ECB7';\" onmouseout=\"this.style.backgroundColor='#FBFFBD';\">Ver Reservación</button>" +
                            "</div>" +
                            "<div id='footer' style='padding: 30px'>" +
                            "<img id='logo-bottom' src='https://res.cloudinary.com/dmu6eqzqy/image/upload/v1733968007/RKshort_tb6jga.png' alt='Rustik' style='height: 30px' />" +
                            "<div style='margin-top: 20px'>" +
                            "<a href='https://facebook.com' target='_blank' style='text-decoration: none; font-size: 0'><img src='https://res.cloudinary.com/dmu6eqzqy/image/upload/v1733968007/facebookicon_czkgi5.png' alt='Facebook' style='width: 20px; margin: 0 10px' /></a>" +
                            "<a href='https://instagram.com' target='_blank' style='text-decoration: none; font-size: 0'><img src='https://res.cloudinary.com/dmu6eqzqy/image/upload/v1733968007/instaicon_rs0eng.png' alt='Instagram' style='width: 20px; margin: 0 10px' /></a>" +
                            "<a href='https://twitter.com' target='_blank' style='text-decoration: none; font-size: 0'><img src='https://res.cloudinary.com/dmu6eqzqy/image/upload/v1733968034/twitterXicon_hxwrnm.png' alt='Twitter' style='width: 20px; margin: 0 10px' /></a>" +
                            "</div>" + "</div>" +
                            "</div>" + "</body>" +
                            "</html>",

                    username, cabin.getName(), cabin.getLocation(), initialDate, endDate, totalPrice, RUSTIK_URL
            );

            helper.setText(body, true);

            mailSender.send(message);
            System.out.println("Correo de confirmación de reserva enviado con éxito a " + toEmail);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}