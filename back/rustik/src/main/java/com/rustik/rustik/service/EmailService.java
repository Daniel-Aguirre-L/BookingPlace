package com.rustik.rustik.service;


import com.rustik.rustik.model.Cabin;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

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
            System.out.println("Correo de confirmación de registro enviado con éxito a " + toEmail);
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
                <html>
                <body style="background: radial-gradient(circle at 50% 10%, #088395 26%, #ffffff 100%); display: flex; justify-content: center; align-items: center; margin: 0;">
                  <div
                    id="main-container"
                    style="
                      margin: 0 auto;
                      background-color: #088395;
                      max-width: 80%;
                     width: 100%;
                      border-radius: 20px;
                      text-align: center;
                      transform: scale(0.8);
                      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
                    "
                  >
                    <div
                      id="header"
                      style="
                        background-image: url('./images/fondo\ email.png');
                        background-size: cover;
                        margin: 0 auto;
                        width: 100%;
                        height: 160px;
                        border-radius: 20px 20px 0 0;
                      "
                    >
                      <img
                        id="logo-top"
                        style="margin: 40px"
                        src="http://res.cloudinary.com/dmu6eqzqy/image/upload/v1731360711/Rustik-logo/ulwcjystr37bqblnje3p.png"
                        alt="Rustik"
                      />
                    </div>
              
                    <div
                      id="content"
                      style="
                        position: relative;
                        top: -30px;
                        margin: 0 auto;
                        background-color: #f3f4f6;
                        color: #0c1123;
                        width: 100%;
                        max-width: 70%;
                        padding: 20px;
                        border-radius: 20px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                        font-family: Arial, sans-serif;
                      "
                    >
                      <h1 id="greeting" style="text-align: center; color: #088395">¡Hola, René!</h1>
                      <p id="message" style="font-size: 16px; text-align: center">
                        Gracias por tu reserva en Rustik. Aquí están los detalles de tu reserva:
                      </p>
                      <br />
                      <p class="reservation-detail">
                        <strong>Cabaña:</strong> La Bella Vista
                      </p>
                      <p class="reservation-detail">
                        <strong>Fecha de inicio:</strong> 2024-12-15
                      </p>
                      <p class="reservation-detail">
                        <strong>Fecha de fin:</strong> 2024-12-20
                      </p>
                      <p class="reservation-detail"><strong>Precio total:</strong> $450.75</p>
                      <br />
                      <p id="confirmation" style="font-size: 16px; text-align: center">
                        ¡Estamos emocionados de que hayas elegido Rustik para tu escapada! Esperamos que disfrutes tu estancia.
                      </p>
                      <p id="details-link" style="font-size: 16px; text-align: center">
                        Para más detalles, visita tu reserva en Rustik:
                      </p>
              
                      <button
                        id="reservation-button"
                        style="
                          background-color: #fbffbd;
                          color: #0c1123;
                          border: none;
                          margin: 10px;
                          padding: 12px 32px;
                          border-radius: 8px;
                          font-size: 16px;
                          cursor: pointer;
                          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                          transition: all 0.3s ease-in-out;
                        "
                        onmouseover="this.style.backgroundColor='#E9ECB7';"
                        onmouseout="this.style.backgroundColor='#FBFFBD';"
                      >
                        Ver Reservación
                      </button>
                    </div>
                    <div id="footer" style="padding-bottom: 30px">
                      <img
                        id="logo-bottom"
                        src="http://res.cloudinary.com/dmu6eqzqy/image/upload/v1731360812/Rustik-logo/o1sepuqvrih5biexqajy.png"
                        alt="Rustik"
                        style="height: 30px"
                      />
              
                      <!-- Social media icons -->
                      <div style="margin-top: 20px">
                        <a href="https://facebook.com" target="_blank" style="text-decoration: none; font-size: 0">
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                            alt="Facebook"
                            style="width: 20px; margin: 0 10px"
                          />
                        </a>
                        <a href="https://instagram.com" target="_blank" style="text-decoration: none; font-size: 0">
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg"
                            alt="Instagram"
                            style="width: 20px; margin: 0 10px"
                          />
                        </a>
                        <a href="https://twitter.com" target="_blank" style="text-decoration: none; font-size: 0">
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg"
                            alt="Twitter"
                            style="width: 20px; margin: 0 10px"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </body>
              </html>
              
                    username, cabin.getName(), initialDate, endDate, totalPrice, RUSTIK_URL
            );


            helper.setText(body, true);

            mailSender.send(message);
            System.out.println("Correo de confirmación de reserva enviado con éxito a " + toEmail);
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
            System.out.println("Correo de cancelación de reserva enviado con éxito a " + toEmail);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}