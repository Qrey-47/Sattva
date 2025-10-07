<?php
require 'vendor/autoload.php';
require_once __DIR__ . '/mail/Mailer.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

\Stripe\Stripe::setApiKey($_ENV['STRIPE_SECRET_KEY']);

$payload = @file_get_contents('php://input');
$event = json_decode($payload, true);

if ($event['type'] === 'checkout.session.completed') {
  $session = $event['data']['object'];
  $email = $session['customer_details']['email'];
  $amount = number_format($session['amount_total'] / 100, 2);

  $body = "
    <h2>Payment Successful!</h2>
    <p>Thank you for shopping with us.</p>
    <p><strong>Amount Paid:</strong> \$$amount</p>
  ";

  Mailer::send($email, 'Order Confirmation - Sattva Organics', $body);
}

http_response_code(200);
?>
