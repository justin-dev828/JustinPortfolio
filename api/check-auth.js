export default async function handler(req, res) {


    const cookies = req.headers.cookie || "";


    if(cookies.includes("bio_auth=true")){


        return res.status(200).json({
            authenticated:true
        });


    }


    return res.status(401).json({
        authenticated:false
    });


}