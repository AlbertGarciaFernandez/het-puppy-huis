import "./lib/load-env";

import { createGalleryApp } from "./lib/gallery-app";
import { getGalleryServerConfig } from "./lib/env";

try {
  const config = getGalleryServerConfig();
  const app = createGalleryApp();

  app.listen(config.port, () => {
    console.log(`Gallery API running on http://localhost:${config.port}`);
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}
