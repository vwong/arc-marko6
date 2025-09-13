import { withFlags } from "arc-server";
import express from "express";
import path from "node:path";
import url from "node:url";
import { routerMiddleware } from "@marko/run-adapter-node/middleware";


const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const app = express();
app.use(
  "/assets",
  express.static(path.join(__dirname, "public", "assets"), {
    index: false,
    immutable: true,
    maxAge: "365 days",
  }),
);
app.use(function arcflags(req, _res, next) {
  withFlags(
    {
      onprem: false,
    },
    next,
  );
});
app.use(routerMiddleware());
app.listen(process.env.PORT || 3000);
