interface InvoiceEmail {
  to: string;
  name: string;
  amount: number;
  invoiceUrl?: string | null;
}

export default async function sendInvoiceEmail({
  to,
  name,
  amount,
  invoiceUrl,
}: InvoiceEmail) {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": process.env.BREVO_API_KEY!,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "Sattva Organics", email: "noreply@sattva.com" },
      to: [{ email: to, name }],
      subject: "Your Payment Invoice - Sattva Organics",
      htmlContent: `
        <h2>Thank you for your purchase, ${name}!</h2>
        <p>We’ve received your payment of <strong>$${amount}</strong>.</p>
        ${
          invoiceUrl
            ? `<p>You can view or download your invoice here:</p>
               <a href="${invoiceUrl}" target="_blank">${invoiceUrl}</a>`
            : "<p>Your invoice will be sent shortly.</p>"
        }
        <p>Best regards,<br/>Sattva Team</p>
      `,
    }),
  });

  const data = await response.json();
  console.log("Brevo Email Sent:", data);
}
