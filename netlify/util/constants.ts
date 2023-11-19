const html = String.raw;

export const errorHtml = () => html`
    <html lang="en">
    <head>
        <title>Anilist</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <style></style>
        <title>Hello there</title>
    </head>
    <body>
    <header>
        <code>
            bruh moment
        </code>
    </header>

    <main>
        <h1>You are not supposed to be here!</h1>
        <h2>Check out what's here then I guess:</h2>
        <h3>
            DISCLAIMER: THIS IS EXTREMELY EARLY IN DEV. CHECK OUT GH REPO IN THE
            FOOTER. NOTHING IS WORKING YET.
        </h3>

        <ul>
            <li>
                <a href="/anilist/discord">discord profile svg</a>
            </li>
            <li>
                <a href="/anilist/statsfm">stats.fm profile svg</a>
            </li>
            <li>
                <a href="/avatar">random avatar</a>
            </li>
        </ul>
    </main>

    <footer>
        <p>
            <a href="https://github.com/Kex1016/netlify-express">github</a>
        </p>
    </footer>
    </body>
    </html>`;
