/**  @jsx h  */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="deno.ns" />

import { serve } from "https://deno.land/std@0.160.0/http/server.ts";
import { h, html } from "./mod.tsx";
import UnoCSS from "./plugins/unocss.ts";
import ColorScheme from "./plugins/color-scheme.ts";

html.use(
  UnoCSS(),
  ColorScheme("auto"),
  (ctx) => {
    ctx.scripts = [`console.log("Hello plugin!")`, ...(ctx.scripts ?? [])];
  },
);

serve((_res) =>
  html({
    lang: "en",
    title: "Hello World!",
    meta: {
      description: "This is a description.",
    },
    links: [
      { rel: "mask-icon", href: "/logo.svg", color: "#ffffff" },
    ],
    styles: [
      "*{margin:0;padding:0}",
    ],
    scripts: [
      "console.log('Hello World!')",
    ],
    headers: [["Cache-Control", "public, max-age=0, must-revalidate"]],
    body: (
      <div class="flex items-center flex-col justify-center w-screen h-screen">
        <p class="text-5xl font-bold text-green-600">Hello World!</p>
        <span
          class="inline-block mt-2 dark:hidden cursor-pointer"
          /* @ts-ignore */
          onclick="setColorScheme('dark')"
        >
          Dark Mode
        </span>
        <span
          class="hidden mt-2 dark:inline-block cursor-pointer"
          /* @ts-ignore */
          onclick="setColorScheme('light')"
        >
          Light Mode
        </span>
      </div>
    ),
  })
);
