import type { SyntaxNode } from "web-tree-sitter";

export default class ParseError extends Error {
  node: SyntaxNode;

  constructor(node: SyntaxNode) {
    super();
    this.node = node;
  }
}
