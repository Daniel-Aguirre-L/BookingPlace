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
                    "<html><body>" +
                            "<div style='margin: 0 auto; background-color: #DEDEDE; color:#0C1123; width: 100%%; max-width: 600px; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif;'>" +
                            "<div style='margin: 0 auto; width: 100%%; text-align: center; font-size: 16px;'>" +
                            "<img src='http://res.cloudinary.com/dmu6eqzqy/image/upload/v1731360711/Rustik-logo/ulwcjystr37bqblnje3p.png' alt='Rustik'>" +
                            "</div>" +
                            "<h1>¡Bienvenido(a) %s!</h1>" +
                            "<p style='font-size: 16px;'>¡Gracias por unirte a nuestra comunidad! Nos alegra saber que has elegido Rustik para planificar tu próxima escapada a la naturaleza. En nuestra plataforma podrás explorar una variedad de cabañas únicas, diseñadas para ofrecerte confort y tranquilidad.</p>" +
                            "<p style='font-size: 16px;'>Ahora que ya eres parte de Rustik, comienza a planificar tu viaje y aprovecha las herramientas que hemos preparado para ti:</p>" +
                            "<ul>" +
                            "<li style='font-size: 16px;'>Reserva cabañas de forma fácil y rápida.</li>" +
                            "<li style='font-size: 16px;'>Consulta disponibilidad y tarifas al instante.</li>" +
                            "<li style='font-size: 16px;'>Recibe recomendaciones personalizadas según tus preferencias.</li>" +
                            "</ul>" +
                            "<p style='font-size: 16px;'>Para comenzar, solo haz clic en el link de abajo y empieza a explorar:</p>" +
                            "<a style='font-size: 16px;' href='%s'>Acceder a Rustik</a>" +
                            "<p style='font-size: 16px;'>Para acceder a tu cuenta, solo tienes que ingresar el correo registrado y contraseña.</p>" +
                            "<p style='font-size: 16px;'>Tu correo registrado: <strong>%s</strong></p>" +
                            "<p style='font-size: 16px;'>¡Esperamos que disfrutes de la experiencia <img src='http://res.cloudinary.com/dmu6eqzqy/image/upload/v1731360711/Rustik-logo/ulwcjystr37bqblnje3p.png' alt='Rustik' style='height: 20px;' />!</p>" +
                            "<p style='font-size: 16px; margin-top: 20px;'>Si tienes alguna duda, no dudes en contactarnos a través de nuestro <a href='mailto:%s'>email de soporte</a>. ¡Estamos aquí para ayudarte!</p>" +
                            "<br>" +
                            "<div style='margin: 0 auto; width: 100%%; text-align: center;'>" +
                            "<img src='http://res.cloudinary.com/dmu6eqzqy/image/upload/v1731360812/Rustik-logo/o1sepuqvrih5biexqajy.png' alt='Rustik' style='height: 40px;' />" +
                            "</div>" +
                            "</body></html>",
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
                    "<html><body>" +
                            "<div style='margin: 0 auto; background-color: #F3F4F6; color:#0C1123; width: 100%%; max-width: 600px; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif;'>" +
                            "<div style='margin: 0 auto; width: 100%%; text-align: center; font-size: 16px;'>" +
                            "<img src='http://res.cloudinary.com/dmu6eqzqy/image/upload/v1731360711/Rustik-logo/ulwcjystr37bqblnje3p.png' alt='Rustik'>" +
                            "</div>" +
                            "<h1>¡Hola, %s!</h1>" +
                            "<p style='font-size: 16px;'>Gracias por tu reserva en Rustik. Aquí están los detalles de tu reserva:</p>" +
                            "<p style='font-size: 16px;'><strong>Cabaña:</strong> %s</p>" +
                            "<p style='font-size: 16px;'><strong>Fecha de inicio:</strong> %s</p>" +
                            "<p style='font-size: 16px;'><strong>Fecha de fin:</strong> %s</p>" +
                            "<p style='font-size: 16px;'><strong>Precio total:</strong> $%.2f</p>" +
                            "<p style='font-size: 16px;'>¡Estamos emocionados de que hayas elegido Rustik para tu escapada! Esperamos que disfrutes tu estancia.</p>" +
                            "<p style='font-size: 16px;'>Para más detalles, visita <a href='%s'>tu reserva en Rustik</a>.</p>" +
                            "<br>" +
                            "<div style='margin: 0 auto; width: 100%%; text-align: center;'>" +
                            "<img src='http://res.cloudinary.com/dmu6eqzqy/image/upload/v1731360812/Rustik-logo/o1sepuqvrih5biexqajy.png' alt='Rustik' style='height: 40px;' />" +
                            "</div>" +
                            "</body></html>",
                    username, cabin.getName(), initialDate, endDate, totalPrice, RUSTIK_URL
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
                    "<html><body>" +
                            "<div style='margin: 0 auto; background-color: #F3F4F6; color:#0C1123; width: 100%%; max-width: 600px; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif;'>" +
                            "<div style='margin: 0 auto; width: 100%%; text-align: center; font-size: 16px;'>" +
                            "<img src='http://res.cloudinary.com/dmu6eqzqy/image/upload/v1731360711/Rustik-logo/ulwcjystr37bqblnje3p.png' alt='Rustik'>" +
                            "</div>" +
                            "<h1>¡Hola, %s!</h1>" +
                            "<p style='font-size: 16px;'>Lamentamos informarte que tu reserva en Rustik ha sido cancelada. Aquí están los detalles de tu reserva:</p>" +
                            "<p style='font-size: 16px;'><strong>Cabaña:</strong> %s</p>" +
                            "<p style='font-size: 16px;'><strong>Fecha de inicio:</strong> %s</p>" +
                            "<p style='font-size: 16px;'><strong>Fecha de fin:</strong> %s</p>" +
                            "<p style='font-size: 16px;'><strong>Precio total:</strong> $%.2f</p>" +
                            "<p style='font-size: 16px;'>Si tienes preguntas o inquietudes, no dudes en ponerte en contacto con nosotros. Estamos aquí para ayudarte.</p>" +
                            "<p style='font-size: 16px;'>Para más detalles, visita <a href='%s'>tu reserva en Rustik</a>.</p>" +
                            "<br>" +
                            "<div style='margin: 0 auto; width: 100%%; text-align: center;'>" +
                            "<img src='http://res.cloudinary.com/dmu6eqzqy/image/upload/v1731360812/Rustik-logo/o1sepuqvrih5biexqajy.png' alt='Rustik' style='height: 40px;' />" +
                            "</div>" +
                            "</body></html>",
                    username, cabin.getName(), initialDate, endDate, totalPrice, RUSTIK_URL
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
                    "<html><body>" +
                            "<div style='margin: 0 auto; background-color: #DEDEDE; color:#0C1123; width: 100%%; max-width: 600px; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif;'>" +
                            "<div style='margin: 0 auto; width: 100%%; text-align: center; font-size: 16px;'>" +
                            "<img src='http://res.cloudinary.com/dmu6eqzqy/image/upload/v1731360711/Rustik-logo/ulwcjystr37bqblnje3p.png' alt='Rustik'>" +
                            "</div>" +
                            "<h1>¡Hola, %s!</h1>" +
                            "<p style='font-size: 16px;'>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en Rustik. Si fuiste tú quien lo solicitó, haz clic en el siguiente enlace para crear una nueva contraseña:</p>" +
                            "<a style='font-size: 16px;' href='%s'>Restablecer mi contraseña en Rustik</a>" +
                            "<p style='font-size: 16px;'>Si no solicitaste este cambio, no es necesario que hagas nada. Tu contraseña seguirá siendo la misma y no se realizarán modificaciones en tu cuenta.</p>" +
                            "<p style='font-size: 16px; margin-top: 20px;'><strong>¿No puedes hacer clic en el enlace?</strong></p>" +
                            "<p style='font-size: 16px;'>Copia y pega la siguiente URL en tu navegador para restablecer tu contraseña:</p>" +
                            "<p style='font-size: 16px; margin: 5px 0;'>%s</p>" +
                            "<p style='font-size: 16px;'>Este enlace expirará en 24 horas, así que asegúrate de utilizarlo dentro de ese plazo.</p>" +
                            "<p style='font-size: 16px; margin-top: 20px;'>Si tienes alguna duda, no dudes en contactarnos a través de nuestro <a href='mailto:%s'>email de soporte</a>. ¡Estamos aquí para ayudarte!</p>" +
                            "<br>" +
                            "<p style='font-size: 16px;'>Saludos,</p>" +
                            "<p style='font-size: 16px;'>El equipo de <strong>Rustik</strong></p>" +
                            "<br>" +
                            "<div style='margin: 0 auto; width: 100%%; text-align: center;'>" +
                            "<img src='http://res.cloudinary.com/dmu6eqzqy/image/upload/v1731360812/Rustik-logo/o1sepuqvrih5biexqajy.png' alt='Rustik' style='height: 40px;' />" +
                            "</div>" +
                            "</body></html>",
                    username, resetPasswordUrl, resetPasswordUrl, SPRING_MAIL_USERNAME
            );
            helper.setText(body, true);
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}