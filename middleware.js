import { NextResponse } from "next/server";


export function middleware(request) {


    const url = request.nextUrl.clone();


    const cookie = request.cookies.get("bio_auth");


    if(!cookie){


        url.pathname = "/index.html";


        return NextResponse.redirect(url);


    }


    return NextResponse.next();


}


export const config = {

    matcher: [
        "/private/:path*"
    ]

};