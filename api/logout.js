export default async function handler(req, res) {

    res.setHeader(
        "Set-Cookie",
        "bio_auth=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0"
    );

    res.status(200).json({
        success: true
    });

}
