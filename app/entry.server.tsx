import { renderToString } from 'react-dom/server';
import { RemixServer } from '@remix-run/react';
import type { EntryContext } from '@remix-run/node';
import { injectStyles, createStylesServer } from '@mantine/remix';

const server = createStylesServer();

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  let markup = renderToString(<RemixServer context={remixContext} url={request.url} />);
  responseHeaders.set('Content-Type', 'text/html');

  return new Response(`<!DOCTYPE html>${injectStyles(markup, server)}`, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}

// import { PassThrough } from "stream";
// import { renderToPipeableStream, renderToString } from "react-dom/server";
// import { RemixServer } from "@remix-run/react";
// import { Response } from "@remix-run/node";
// import type { EntryContext, Headers } from "@remix-run/node";
// import isbot from "isbot";
// import { injectStyles, createStylesServer } from '@mantine/remix';

// const ABORT_DELAY = 5000;

// const server = createStylesServer();

// export default function handleRequest(
//   request: Request,
//   responseStatusCode: number,
//   responseHeaders: Headers,
//   remixContext: EntryContext
// ) {
//   const callbackName = isbot(request.headers.get("user-agent"))
//     ? "onAllReady"
//     : "onShellReady";

//   return new Promise((resolve, reject) => {
//     let didError = false;
//     let markup = renderToString(<RemixServer context={remixContext} url={request.url} />);

//     // return new Response(`<!DOCTYPE html>${injectStyles(markup, server)}`, {
//     //   status: responseStatusCode,
//     //   headers: responseHeaders,
//     // });

//     const { pipe, abort } = renderToPipeableStream(
//       //<RemixServer context={remixContext} url={request.url} />,
//       `<!DOCTYPE html>${injectStyles(markup, server)}`,
//       {
//         [callbackName]() {
//           let body = new PassThrough();

//           responseHeaders.set("Content-Type", "text/html");

//           resolve(
//             new Response(body, {
//               status: didError ? 500 : responseStatusCode,
//               headers: responseHeaders,
//             })
//           );
//           pipe(body);
//         },
//         onShellError(err: unknown) {
//           reject(err);
//         },
//         onError(error: unknown) {
//           didError = true;
//           console.error(error);
//         },
//       }
//     );
//     setTimeout(abort, ABORT_DELAY);
//   });
// }
