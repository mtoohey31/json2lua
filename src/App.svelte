<script lang="ts">
  import { mdiGithub } from "@mdi/js";
  import { onMount } from "svelte";
  import Parser from "web-tree-sitter";
  import Converter from "./lib/Converter.svelte";

  let parser = null;

  onMount(async () => {
    const jsonLanguage = await Parser.Language.load("./tree-sitter-json.wasm");
    parser = new Parser();
    parser.setLanguage(jsonLanguage);
  });
</script>

<main class="w-screen h-screen bg-white">
  <div class="flex flex-col h-full">
    <h1 class="text-3xl p-4">JSON2Lua</h1>
    <Converter {parser} />
    <footer class="flex justify-around p-2">
      <div class="hover:underline">
        <a href="https://github.com/mtoohey31/json2lua">
          <svg class="inline h-5" viewBox="0 0 24 24"
            ><path d={mdiGithub} /></svg
          >
          Source</a
        >
      </div>
    </footer>
  </div>
</main>
