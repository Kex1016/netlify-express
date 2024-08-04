import { Request, Response } from "express";
import { Cache } from "memory-cache";

const cache = new Cache();

// A simple template string function for SVG
function svg(strings: TemplateStringsArray, ...keys: string[]) {
  let result = strings[0];
  keys.forEach((key, i) => {
    result += key + strings[i + 1];
  });
  return result;
}

type SfmCurrent = {
  item: {
    date: string;
    isPlaying: boolean;
    progressMs: number;
    deviceName: string;
    track: {
      albums: {
        id: number;
        image: string;
        name: string;
      }[];
      artists: {
        id: number;
        name: string;
      }[];
      durationMs: number;
      explicit: boolean;
      id: number;
      name: string;
    };
    platform: string;
  };
  message?: string;
};

type DiscordResponse = {
  profile: any;
  streams: any;
  current: SfmCurrent;
};

export async function StatsFmSvg(req: Request, res: Response) {
  let sfmCached = cache.get("statsfm") as DiscordResponse | undefined;

  if (!sfmCached) {
    const resp = await fetch("https://cakes-api.netlify.app/statsfm").then(
      (res) => res.json()
    );

    sfmCached = {
      ...resp,
    };

    cache.put("statsfm", sfmCached, 1000 * 60);
  }

  if (sfmCached!.current.message) {
    // Send an empty SVG
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(
      svg`<svg width="0" height="0" xmlns="http://www.w3.org/2000/svg"></svg>`
    );
    return;
  }

  let fontRegular: string, fontBold: string;

  type FontType = {
    fontRegular: string;
    fontBold: string;
  };

  const fontCache = cache.get("fonts") as FontType | undefined;

  if (fontCache) {
    fontRegular = fontCache.fontRegular;
    fontBold = fontCache.fontBold;
  } else {
    // Get file and make it into a buffer
    const baseUrl = "https://downloads.haiiro.moe/fonts/";
    
    const fontRegularBuffer = await fetch(
      baseUrl + "PixelifySans-Regular.ttf"
    ).then((res) => res.arrayBuffer());
    fontRegular = `data:font/ttf;base64,${Buffer.from(
      fontRegularBuffer
    ).toString("base64")}`;
    
    const fontBoldBuffer = await fetch(
      baseUrl + "PixelifySans-Bold.ttf"
    ).then((res) => res.arrayBuffer());
    fontBold = `data:font/ttf;base64,${Buffer.from(
      fontBoldBuffer
    ).toString("base64")}`;

    cache.put("fonts", { fontRegular, fontBold }, 1000 * 60 * 60);
  }

  const fontCSS = `
    @font-face {
      font-family: "TheFont";
      src: url("${fontRegular}") format("truetype");
      font-style: normal;
    }
    
    @font-face {
      font-family: "TheFont";
      src: url("${fontBold}") format("truetype");
      font-style: bold;
    }
  `;

  let image: string;
  const cacheCover = cache.get("cover") as string | undefined;

  if (cacheCover) {
    image = cacheCover;
  } else {
    const imageBuffer = await fetch(
      sfmCached!.current.item.track.albums[0].image
    ).then((res) => res.arrayBuffer());

    const imageExtension = sfmCached!.current.item.track.albums[0].image
      .split(".")
      .pop();

    image = `data:image/${imageExtension};base64,${Buffer.from(
      imageBuffer
    ).toString("base64")}`;

    cache.put("cover", image, 1000 * 10);
  }

  const response = svg`
  <svg width="750" height="250" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="pixelate" x="0%" y="0%" width="100%" height="100%">
        <!--Thanks to Zoltan Fegyver for figuring out pixelation and producing the awesome pixelation map. -->
        <feGaussianBlur stdDeviation="2" in="SourceGraphic" result="smoothed" />
        <feImage width="15" height="15" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAIAAAACDbGyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAWSURBVAgdY1ywgOEDAwKxgJhIgFQ+AP/vCNK2s+8LAAAAAElFTkSuQmCC" result="displacement-map" />
        <feTile in="displacement-map" result="pixelate-map" />
        <feDisplacementMap in="smoothed" in2="pixelate-map" xChannelSelector="R" yChannelSelector="G" scale="50" result="pre-final"/>
        <feComposite operator="in" in2="SourceGraphic"/>
      </filter>
      <mask id="text-mask" x="0" y="0" width="100%" height="100%">
        <linearGradient id="mask-gradient">
          <stop offset="0%" stop-color="white" />
          <stop offset="85%" stop-color="white" />
          <stop offset="100%" stop-color="black" />
        </linearGradient>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#mask-gradient)" />
      </mask>
      <style>
        ${fontCSS}
        #main {
          /* set scale so it goes down from 512px to ~200 */
          --scale: 0.4;
        }

        text {
          mask: url(#text-mask);
          paint-order: stroke fill;
          fill: #FCBC9C;
          stroke: #4D392F;
          stroke-width: 5px;
          stroke-linejoin: miter;
          stroke-linecap: butt;
          font-family: 'TheFont', sans-serif;
        }

        #cover {
          filter: url(#pixelate);
          transform: translate(10px, 20px) scale(var(--scale));
          border-radius: 93% 7% 92% 8% / 3% 91% 9% 97%;
        }
  
        #song-name {
          font-size: 50px;
          font-weight: bold;
        }

        #artist-name {
          font-size: 40px;
          font-weight: normal;
        }

        #album {
          font-size: 25px;
          font-weight: normal;
        }
      </style>
    </defs>
    <g id="main">
      <!-- Cover image -->
      <image x="0" y="0" width="512" height="512" id="cover"
        href="${image}" />
      <!-- Song name -->
      <text x="234.8px" y="100px" id="song-name">
        ${sfmCached!.current.item.track.name
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")}
      </text>
      <!-- Artist name -->
      <text x="234.8px" y="145px" id="artist-name">
        ${sfmCached!.current.item.track.artists[0].name
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")}
      </text>
      <!-- Album -->
      <text x="234.8px" y="200px" id="album">
        ${sfmCached!.current.item.track.albums[0].name
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")}
      </text>
    </g>
  </svg>
  `;

  res.setHeader("Content-Type", "image/svg+xml");
  res.send(response);
}
