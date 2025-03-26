const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";

app.use(
  cors({
    origin: "*",
    methods: ["GET"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.get("/live.m3u8", (req, res) => {
  res.setHeader("Content-Type", "application/x-mpegURL");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  const segmentFiles = fs
    .readdirSync("video_segments")
    .filter((file) => file.endsWith(".ts"))
    .sort((a, b) => {
      const numA = parseInt(a.replace("segment", "").replace(".ts", ""));
      const numB = parseInt(b.replace("segment", "").replace(".ts", ""));
      return numA - numB;
    });

  if (segmentFiles.length === 0) {
    console.log("No hay segmentos disponibles");
    return res.status(404).send("No hay segmentos disponibles");
  }

  console.log(`Encontrados ${segmentFiles.length} segmentos`);

  let m3u8Content = "#EXTM3U\n";
  m3u8Content += "#EXT-X-VERSION:3\n";
  m3u8Content += "#EXT-X-TARGETDURATION:10\n";
  m3u8Content += "#EXT-X-MEDIA-SEQUENCE:0\n";
  m3u8Content += "#EXT-X-PLAYLIST-TYPE:EVENT\n";
  m3u8Content += "#EXT-X-ALLOW-CACHE:NO\n";

  segmentFiles.forEach((segment, index) => {
    m3u8Content += "#EXTINF:10.0,\n";
    m3u8Content += `/segments/${segment}\n`;
  });

  m3u8Content += "#EXT-X-ENDLIST\n";

  res.send(m3u8Content);
});

app.get("/segments/:filename", (req, res) => {
  const filePath = path.join(__dirname, "video_segments", req.params.filename);

  if (fs.existsSync(filePath)) {
    res.setHeader("Content-Type", "video/MP2T");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    fs.createReadStream(filePath).pipe(res);
  } else {
    console.log(`Segmento no encontrado: ${req.params.filename}`);
    res.status(404).send("Segmento no encontrado");
  }
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(port, host, () => {
  console.log(`Servidor HLS ejecutándose en http://${host}:${port}`);
  console.log(
    `Directorio de segmentos: ${path.join(__dirname, "video_segments")}`
  );
});
