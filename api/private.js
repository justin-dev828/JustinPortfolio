export default function handler(req, res) {


    const cookie = req.headers.cookie || "";


    if(!cookie.includes("bio_auth=true")){


        return res.redirect(302, "/index.html#private-bio");


    }



    res.status(200).sendFile(
        "private/index.html"
    );


}