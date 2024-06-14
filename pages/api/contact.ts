import type { NextApiRequest, NextApiResponse } from "next";
import { transporter } from "../../utils/nodemailer";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    console.log(req.body)

    try {
      await transporter.sendMail({
        from: email,
        to: process.env.EMAIL_TO,
        subject: `Nova mensagem de contato de ${name}`,
        text: message,
        html: `<p><strong>Nome:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Mensagem:</strong> ${message}</p>`,
      });

      res.status(200).json({ message: "Email enviado com sucesso" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};
export default handler;
