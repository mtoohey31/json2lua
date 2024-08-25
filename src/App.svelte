<script lang="ts">
  import { mdiGithub } from "@mdi/js";
  import { onMount } from "svelte";
  import Parser from "web-tree-sitter";
  import Converter from "./lib/Converter.svelte";

  let parser: Parser | null = null;
  let parserLoadError = false;

  onMount(async () => {
    await Parser.init();

    let retries = 5;
    while (retries > 0) {
      try {
        let fetchedParser = new Parser();
        const jsonLanguage = await Parser.Language.load(
          "./tree-sitter-json.wasm"
        );
        fetchedParser.setLanguage(jsonLanguage);
        parser = fetchedParser;
        return;
      } catch {
        retries -= 1;
      }
    }
    parserLoadError = true;
    return;
  });
</script>

<main class="w-screen h-screen bg-white">
  <div class="flex flex-col h-full">
    <h1 class="text-3xl p-4">JSON2Lua</h1>
    {#if parserLoadError}
      <div class="flex-grow transition:fade">
        <div
          class="text-center relative text-red-500"
          style="top: 50%; transform: translateY(-50%);"
        >
          Failed to load parser... please try reloading the page.
        </div>
      </div>
    {:else}
      <Converter {parser} />
    {/if}
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
