export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            success: false
        });
    }

    const { password } = req.body;

    if (password !== process.env.BIO_PASSWORD) {
        return res.status(401).json({
            success: false
        });
    }

    res.setHeader(
        "Set-Cookie",
        "bio_auth=true; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400"
    );

    res.status(200).json({
        success: true
    });

}
