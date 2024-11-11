package com.rustik.rustik.service;


import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendRegistrationConfirmationEmail(String toEmail, String username) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);  // true significa que usaremos HTML

            helper.setFrom("integradorctd@gmail.com");
            helper.setTo(toEmail);
            helper.setSubject("¡Bienvenido a Rustik - Reserva tu Cabaña!");

            String body = String.format(
                    "<html><body>" +
                            "<h2 style='font-size: 18px;'>¡Hola %s!</h2>" +
                            "<p style='font-size: 16px;'>Gracias por registrarte en <strong>Rustik</strong>, tu lugar ideal para relajarte en nuestras cabañas.</p>" +
                            "<p style='font-size: 16px;'>Este es tu correo registrado: <strong>%s</strong></p>" +
                            "<p style='font-size: 16px;'>Para comenzar a disfrutar de nuestros servicios, por favor accede a tu cuenta usando el siguiente enlace:</p>" +
                            "<p style='font-size: 16px;'><a href='http://localhost:5173/register'>Acceder a mi cuenta</a></p>" +
                            "<p style='font-size: 16px;'>¡Esperamos que disfrutes de la experiencia Rustik! Si tienes alguna duda, no dudes en contactarnos.</p>" +
                            "<br>" +
                            "<p style='font-size: 16px;'>Saludos cordiales,</p>" +
                            "<p style='font-size: 16px;'><strong>El equipo de Rustik</strong></p>" +
                            "</body></html>",
                    username, toEmail
            );

            helper.setText(body, true);


            mailSender.send(message);

            System.out.println("Correo de confirmación de registro enviado con éxito a " + toEmail);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}