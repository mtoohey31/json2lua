<script lang="ts">
  import ParseError from "../parse-error";

  import type { SyntaxNode } from "web-tree-sitter";

  import type Parser from "web-tree-sitter";

  export let parser: Parser | null;

  function luaify(node: SyntaxNode): string {
    if (node.hasError()) {
      throw new ParseError(node);
    }
    console.log(node.toString());
    // TODO: catch errors here
    return luaifyRecursive(node.children[0]);
  }

  function luaifyRecursive(node: SyntaxNode): string {
    switch (node.type) {
      case "number":
      case "true":
      case "false":
      case "string":
        // TODO: handle string escaping
        return node.text;
      case "null":
        return "nil";
      case "array":
      case "object":
        return (
          "{ " +
          node.namedChildren.map((c) => luaifyRecursive(c)).join(", ") +
          " }"
        );
      case "pair":
        // TODO: handle keys with unsupported syntax
        return (
          node.childForFieldName("key").descendantsOfType("string_content")[0]
            .text +
          " = " +
          luaifyRecursive(node.childForFieldName("value"))
        );
      default:
        console.error("unsupported type: " + node.type);
    }
  }

  let jsonInput = `[
  345,
  10.1,
  10,
  -10,
  null,
  true,
  false,
  { "stuff": "good" }
]`;

  let luaOutput = "";

  $: if (parser) {
    try {
      luaOutput = luaify(parser.parse(jsonInput).rootNode);
    } catch (ParseError) {
      // TODO: improve error handling by displaying errors
      console.log("error");
    }
  }
</script>

<div class="flex-grow flex gap-4 px-4">
  <div class="flex-grow flex flex-col">
    <label for="json-input">JSON Input</label>
    <textarea
      id="json-input"
      class="flex-grow p-2 font-mono rounded-xl bg-gray-200 border-4 border-blue-500"
      style="resize: none;"
      bind:value={jsonInput}
    />
  </div>
  <div class="flex-grow flex flex-col">
    <label for="lua-output">Lua Output</label>
    <textarea
      id="lua-output"
      class="flex-grow p-2 font-mono rounded-xl bg-gray-200 border-4 border-orange-500"
      style="resize: none;"
      contenteditable={false}
      bind:value={luaOutput}
    />
  </div>
</div>
