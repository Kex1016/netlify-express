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

type DiscordResponse = {
  profile: any;
  streams: any;
  current: {
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
  };
};

export async function StatsFmSvg(req: Request, res: Response) {
  let cached = cache.get("statsfm") as DiscordResponse | undefined;

  if (!cached) {
    const resp = await fetch("https://cakes-api.netlify.app/statsfm").then(
      (res) => res.json()
    );

    cached = {
      ...resp,
    };

    cache.put("statsfm", cached, 1000 * 60);
  }

  // Get file and make it into a buffer
  const baseUrl = "https://downloads.haiiro.moe/fonts/";
  const fontRegularBuffer = await fetch(baseUrl + "Roboto-Regular.ttf").then(
    (res) => res.arrayBuffer()
  );

  const fontRegular = `data:font/ttf;base64,${Buffer.from(
    fontRegularBuffer
  ).toString("base64")}`;

  const fontBoldBuffer = await fetch(baseUrl + "Roboto-Bold.ttf").then((res) =>
    res.arrayBuffer()
  );

  const fontBold = `data:font/ttf;base64,${Buffer.from(fontBoldBuffer).toString(
    "base64"
  )}`;

  const fontLightBuffer = await fetch(baseUrl + "Roboto-Light.ttf").then(
    (res) => res.arrayBuffer()
  );

  const fontLight = `data:font/ttf;base64,${Buffer.from(
    fontLightBuffer
  ).toString("base64")}`;

  const fontCSS = `
    @font-face {
      font-family: "TheFont";
      src: url("${fontRegular}") format("truetype");
      font-weight: 400;
      font-style: normal;
    }
    @font-face {
      font-family: "TheFont";
      src: url("${fontBold}") format("truetype");
      font-weight: 700;
      font-style: normal;
    }
    @font-face {
      font-family: "TheFont";
      src: url("${fontLight}") format("truetype");
      font-weight: 300;
      font-style: normal;
    }
  `;

  const response = svg`
  <svg width="750" height="450" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Rounded rect mask for the avatar -->
      <mask id="avatar-mask">
        <rect style="fill:#000000;fill-opacity:1;stroke-width:0.999436" id="rect2" width="512" height="512" x="0" y="0" />
        <path style="fill:#000000" id="path1"
          d="m -27.789412,38.371229 c -0.457079,0.409247 -0.914158,0.818494 -1.371237,1.227741 0,0 0.254951,0.162546 0.254951,0.162546 v 0 c 0.594134,-0.321422 1.188268,-0.642844 1.782402,-0.964266 z" />
        <path style="fill:#ffffff;fill-opacity:1"
          d="m 23.118821,18.636737 c -3.572588,18.064161 -2.937218,36.360552 -1.389347,54.582066 0.691609,8.141603 1.143528,16.278728 2.262642,24.379901 1.526797,11.052346 3.642093,22.003176 4.304901,33.161876 1.810288,30.47709 2.155343,61.05245 4.333381,91.50886 1.393796,19.49005 2.226161,38.61268 -0.115199,58.06774 -1.343478,11.16336 -4.037801,22.23231 -6.0701,33.29162 -2.697984,14.68183 -4.860429,29.68684 -5.364985,44.62191 -0.184134,5.45043 0.212165,10.85704 0.416051,16.29847 0.275525,7.3534 0.439981,14.57864 1.771591,21.84844 2.663656,14.542 7.214629,28.7263 7.07436,43.66832 -0.04604,4.90471 -0.754682,9.91642 -0.221661,14.80434 0.540245,4.95417 2.259122,9.77536 1.889701,14.81832 -0.267401,3.65029 -2.476745,6.97321 -3.280255,10.54254 -0.362305,1.60942 -2.409722,9.32362 -1.123509,10.48669 3.813162,3.44809 22.833107,3.09533 28.456747,3.32972 30.582016,1.27466 61.315341,-1.09226 91.882391,-1.92987 20.75268,-0.56866 41.41907,-2.05983 62.14751,-3.17091 13.67096,-0.73279 27.42482,-0.69889 41.11413,-1.0211 11.63151,-0.27377 23.20196,-0.99947 34.84453,-0.99431 10.56209,0.005 21.11733,-0.0973 31.67998,0.011 9.77471,0.10028 19.53363,0.53206 29.3044,0.025 15.20574,-0.78906 30.32367,-2.9869 45.47841,-4.40206 8.55231,-0.79863 17.13752,-0.97686 25.69432,-1.69482 14.30821,-1.20053 28.58488,-2.87157 42.8723,-4.30138 8.41446,-0.84208 16.85683,-1.67981 25.24801,-2.7299 0.52777,-0.066 3.6335,-0.035 4.08963,-0.77905 1.01216,-1.65115 -1.20685,-6.67808 -1.63026,-8.12973 -5.52446,-18.94053 -12.98112,-37.24978 -15.9686,-56.87386 -1.2343,-8.1078 -1.85161,-16.42131 -1.42429,-24.6196 0.36842,-7.06844 1.44574,-14.07161 1.76591,-21.14325 0.51485,-11.37186 -0.82447,-22.53873 0.94304,-33.87692 2.97043,-19.05475 8.6501,-37.48341 10.62457,-56.72085 2.79136,-27.19653 1.4822,-54.46069 0.11577,-81.68661 -0.62138,-12.38074 0.40394,-24.74864 -1.30199,-37.07518 -1.73015,-12.50156 -6.20453,-24.41479 -8.69645,-36.74819 -2.68315,-13.27984 -3.55823,-26.618396 -7.67827,-39.61713 -3.16677,-9.991196 -7.85782,-19.729259 -8.38579,-30.344123 -0.20501,-4.121674 0.0428,-8.286968 0.50213,-12.383984 0.0411,-0.366656 0.57658,-2.399325 0.13494,-2.687421 -2.91486,-1.901469 -15.93471,-2.758182 -19.74631,-3.231995 -21.20528,-2.635992 -42.5714,-1.586513 -63.84687,-3.355922 -15.57804,-1.295572 -31.11044,-3.386368 -46.72003,-4.237384 -17.29015,-0.942639 -34.60325,-0.196436 -51.90057,-0.77382 -12.05026,-0.402237 -24.13243,-0.763612 -36.17159,-1.417303 -7.34195,-0.398646 -14.65773,-1.273711 -22.01484,-1.395783 -6.81141,-0.113017 -13.6567,0.433249 -20.4608,0.707493 -11.78956,0.475188 -23.57246,0.974334 -35.35881,1.536577 -13.90828,0.663465 -27.77851,1.830351 -41.67791,2.538477 -12.10705,0.616811 -24.239585,0.933537 -36.335721,1.726251 -3.014734,0.197569 -5.959145,0.948822 -8.971662,1.189232 -8.269021,0.659896 -16.761974,0.973797 -25.047799,0.906471 -5.110343,-0.04152 -9.558021,0.103334 -14.522159,-1.280575"
          id="path2" />
      </mask>
      <style>
        ${fontCSS}
        #main {
          /* set scale so it goes down from 512px to ~200 */
          --scale: 0.4;
        }

        text {
          fill: white;
          font-family: 'TheFont', sans-serif;
        }

        #song-name {
          transform: translate(50%, calc(512px * var(--scale) + 40px));
          font-weight: 700;
        }

        #artist-name {
          transform: translate(50%, calc(512px * var(--scale) + 40px));
          font-weight: 400;
        }

        #album {
          transform: translate(50%, calc(512px * var(--scale) + 40px));
          font-weight: 300;
        }

        #cover {
          mask: url(#avatar-mask);
          transform: translate(calc(50% - (var(--scale) * 512px / 2)), 0) scale(var(--scale));
          border-radius: 93% 7% 92% 8% / 3% 91% 9% 97%;
        }
      </style>
    </defs>
    <g id="main">
      <!-- Cover image -->
      <image x="0" y="0" width="512" height="512" id="cover"
        href="${cached!.current.item.track.albums[0].image}" />
      <!-- Song name -->
      <text x="0" y="0" font-size="40" text-anchor="middle" id="song-name">
        ${cached!.current.item.track.name}
      </text>
      <!-- Artist name -->
      <text x="0" y="40" font-size="30" text-anchor="middle" id="artist-name">
        ${cached!.current.item.track.artists[0].name}
      </text>
      <!-- Album -->
      <text x="0" y="90" font-size="20" text-anchor="middle" id="album">
        ${cached!.current.item.track.albums[0].name}
      </text>
    </g>
  </svg>
  `;

  res.setHeader("Content-Type", "image/svg+xml");
  res.send(response);
}
