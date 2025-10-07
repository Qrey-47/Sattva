<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../vendor/autoload.php';

class Mailer {
  public static function send($to, $subject, $htmlBody) {
    $mail = new PHPMailer(true);
    try {
      $mail->isSMTP();
      $mail->Host       = 'smtp.gmail.com';
      $mail->SMTPAuth   = true;
      $mail->Username   = getenv('SMTP_USER');
      $mail->Password   = getenv('SMTP_PASS');
      $mail->SMTPSecure = 'tls';
      $mail->Port       = 587;

      $mail->setFrom(getenv('SMTP_USER'), 'Sattva Organics');
      $mail->addAddress($to);
      $mail->isHTML(true);
      $mail->Subject = $subject;
      $mail->Body    = $htmlBody;
      $mail->send();
    } catch (Exception $e) {
      error_log("Mailer Error: {$mail->ErrorInfo}\n", 3, __DIR__ . '/../logs/mail.log');
    }
  }
}
