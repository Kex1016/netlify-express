import { Response, Request } from "express";
const html = String.raw;

export const errorHtml = (req: Request, res: Response) => html`<html>
  <head>
    <title>Anilist</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style></style>
    <title>Hello there</title>
  </head>
  <body>
    <header>
      <code>
        <pre>
      ${JSON.stringify(req.headers, null, 2)}
    </pre
        >
      </code>
    </header>

    <main>
      <h1>You are not supposed to be here!</h1>
      <h2>Check out what's here then I guess:</h2>

      <ul>
        <li>
          <a href="/anilist/discord">discord profile svg</a>
        </li>
        <li>
          <a href="/anilist/statsfm">stats.fm profile svg</a>
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
