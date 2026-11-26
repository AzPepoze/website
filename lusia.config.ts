import { EASE } from "lusiajs";
import { defineConfig } from "lusiajs/config";

export default defineConfig({
  outdir: "dist",
  animate: {
    duration: 400,
    ease: [EASE.STYLE.QUART, EASE.INOUT],
  },
});
