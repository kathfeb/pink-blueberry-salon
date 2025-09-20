import {
  defineConfig,
  minimal2023Preset as preset,
} from "@vite-pwa/assets-generator/config";

export default defineConfig({
  preset,
  images: ["public/logo.png"], // Necesitarás crear este logo
  headLinkOptions: {
    preset: "2023",
  },
});
