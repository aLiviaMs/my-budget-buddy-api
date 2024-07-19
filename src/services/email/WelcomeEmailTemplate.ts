export const WelcomeEmailTemplate = (name: string): string => `
  <!DOCTYPE html>
  <html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #014351;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #dddddd;
      }
      .header h1 {
        margin: 0;
        color: #333333;
      }
      .content {
        padding: 20px 0;
      }
      .content p {
        line-height: 1.6;
        color: #333333;
      }
      .footer {
        text-align: center;
        padding-top: 20px;
        border-top: 1px solid #dddddd;
        color: #777777;
      }
      strong {
        color: #014351
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Bem-vindo ao Budget Buddy!</h1>
      </div>
      <div class="content">
        <p>Salve ${name}!</p>
        <p>Bem-vindo ao <strong>Budget Buddy</strong>! Estamos empolgados para ajudar você a organizar suas despesas financeiras.</p>
        <p>Com o Budget Buddy, você pode facilmente acompanhar seus gastos, definir orçamentos e alcançar seus objetivos financeiros.</p>
      </div>
      <div class="footer">
        <p>Atenciosamente,<br>Equipe Budget Buddy</p>
      </div>
      <!-- TODO: Add button confirmation -->
    </div>
  </body>
  </html>
`;
