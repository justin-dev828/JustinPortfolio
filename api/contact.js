import { Resend } from "resend";

const resend = new Resend(process.env.re_FB9afm7H_91GPr8vVFA7Drw7DMdGC7WCT);


export default async function handler(req, res) {

    if(req.method !== "POST") {

        return res.status(405).json({
            error:"Method not allowed"
        });

    }


    try {


        const {
            name,
            email,
            message
        } = req.body;



        await resend.emails.send({

            from:"JustinByte Portfolio <onboarding@resend.dev>",

            to:"justin.cf879@gmail.com",

            subject:"Neue Nachricht von deinem Portfolio",

            html:`

            <h2>Neue Portfolio Nachricht</h2>

            <p><b>Name:</b> ${name}</p>

            <p><b>E-Mail:</b> ${email}</p>

            <p><b>Nachricht:</b></p>

            <p>${message}</p>

            `

        });



        res.status(200).json({

            success:true

        });



    } catch(error){


        console.error(error);


        res.status(500).json({

            error:"Mail konnte nicht gesendet werden"

        });


    }

}