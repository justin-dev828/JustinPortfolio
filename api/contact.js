import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);


export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }


    try {

        const { name, email, message } = req.body;


        if (!name || !email || !message) {

            return res.status(400).json({
                error: "Missing data"
            });

        }


        const result = await resend.emails.send({

            from: "onboarding@resend.dev",

            to: "justin.cf879@gmail.com",

            subject: "Neue Nachricht vom Portfolio",

            html: `
            <h2>Neue Kontaktanfrage</h2>

            <p><b>Name:</b> ${name}</p>

            <p><b>Email:</b> ${email}</p>

            <p><b>Nachricht:</b></p>

            <p>${message}</p>
            `

        });


        return res.status(200).json({

            success:true,
            id:result.data?.id

        });


    } catch(error) {


        console.error("RESEND ERROR:", error);


        return res.status(500).json({

            error:error.message

        });


    }

}
