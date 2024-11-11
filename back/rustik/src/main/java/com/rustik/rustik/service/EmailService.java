package com.rustik.rustik.service;


import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${RUSTIK_URL}")
    private String RUSTIK_URL;

    @Value("${SPRING_MAIL_USERNAME}")
    private String SPRING_MAIL_USERNAME;


    public void sendRegistrationConfirmationEmail(String toEmail, String username) {

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);  // true significa que usaremos HTML

            helper.setFrom(SPRING_MAIL_USERNAME);
            helper.setTo(toEmail);
            helper.setSubject("¡Bienvenido a Rustik - Reserva tu Cabaña!");

            String body = String.format(
                    "<html><body>" +
                            "<div style='margin: 0 auto; background-color: #DEDEDE; color:#0C1123; width: 100%%; max-width: 600px; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif;'>" +
                            "<div style='margin: 0 auto; width: 100%%; text-align: center; font-size: 16px;'>" +
                            "<img src='http://res.cloudinary.com/dmu6eqzqy/image/upload/v1731360711/Rustik-logo/ulwcjystr37bqblnje3p.png' alt='Rustik'>" +
                            "</div>" +
                            "<h1>¡Bienvenido %s!</h1>" +
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

            System.out.println("Correo de confirmación de registro enviado con éxito a " + toEmail);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}