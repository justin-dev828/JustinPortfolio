// =================================
// JustinByte.exe Portfolio
// Vercel GitHub API
// api/github.js
// =================================


export default async function handler(req, res) {


    const username = "justin-dev828";


    try {


        const response = await fetch(
            `https://api.github.com/users/${username}`,
            {
                headers: {
                    "Accept": "application/vnd.github+json",
                    "User-Agent": "JustinByte-Portfolio"
                }
            }
        );



        if(!response.ok){

            return res.status(response.status).json({

                error: "GitHub API Fehler"

            });

        }



        const data = await response.json();




        res.status(200).json({


            username: data.login,


            avatar: data.avatar_url,


            repos: data.public_repos,


            followers: data.followers,


            following: data.following,


            created: data.created_at,


            profile: data.html_url


        });



    } catch(error){



        res.status(500).json({


            error: "GitHub Daten konnten nicht geladen werden"


        });


    }


}