export default async function handler(req, res) {

    const cookie = req.headers.cookie || "";

    if (cookie.includes("bio_auth=true")) {

        return res.status(200).json({
            loggedIn: true
        });

    }

    res.status(401).json({
        loggedIn: false
    });

}
