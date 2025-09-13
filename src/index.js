import { withFlags } from "arc-server";
import compression from "compression";
import express from "express";
import path from "node:path";
import url from "node:url";
import zlib from "node:zlib";
import { routerMiddleware } from "@marko/run-adapter-node/middleware";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

let count = 0;

const app = express();
app.use(
  compression({
    flush: zlib.constants.Z_PARTIAL_FLUSH,
    threshold: 500,
  }),
);
app.use(
  "/assets",
  express.static(path.join(__dirname, "public", "assets"), {
    index: false,
    immutable: true,
    maxAge: "365 days",
  }),
);
app.use(function arcflags(req, _res, next) {
  if (req.originalUrl === "/") {
    count++;
  }
  withFlags(
    {
      variant: count % 2 === 0,
    },
    next,
  );
});
app.use(routerMiddleware());
app.listen(process.env.PORT || 3000);
