import {
  ColorScheme,
  ColorSchemeProvider,
  Global,
  MantineProvider,
} from "@mantine/core";

import { createEmotionCache } from "@mantine/core";
import { StylesPlaceholder } from "@mantine/remix";

import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { useState } from "react";

import { getUser } from "./session.server";

import { theme } from './theme';

createEmotionCache({ key: "mantine" });

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    user: await getUser(request),
  });
};

export default function App() {
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <html lang="en">
        <head>
          <StylesPlaceholder />
          <Meta />
          <Links />
        </head>
        <body>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </MantineProvider>
  );
}

// export default function App() {
//   const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
//   const toggleColorScheme = (value?: ColorScheme) =>
//     setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

//   return (
//     <ColorSchemeProvider
//       colorScheme={colorScheme}
//       toggleColorScheme={toggleColorScheme}
//     >
//       <MantineProvider
//         withNormalizeCSS
//         withGlobalStyles
//         theme={{ colorScheme }}
//       >
//         <html lang="en">
//           <head>
//             <StylesPlaceholder />
//             <Meta />
//             <Links />
//           </head>
//           <body>
//             <GlobalStyles />
//             <Outlet />

//             <ScrollRestoration />
//             <Scripts />
//             <LiveReload />
//           </body>
//         </html>
//       </MantineProvider>
//     </ColorSchemeProvider>
//   );
// }

// const GlobalStyles = () => (
//   <Global
//     styles={{
//       "html, body": { height: "100%", margin: 0 },
//     }}
//   />
// );
