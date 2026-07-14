export default async function handler(req, res) {

    const username = "justin-dev828";


    const response = await fetch(
        `https://api.github.com/users/${username}`
    );


    const data = await response.json();



    res.status(200).json({

        username: data.login,

        avatar: data.avatar_url,

        repos: data.public_repos,

        followers: data.followers,

        following: data.following,

        created: data.created_at

    });

}