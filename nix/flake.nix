{
  description = "json2lua";

  inputs = {
    nixpkgs.url = "nixpkgs/nixpkgs-unstable";
    utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, utils }: utils.lib.eachDefaultSystem (system:
    let
      pkgs = import nixpkgs { inherit system; };
      inherit (pkgs) mkShell nodejs nodePackages python3 svelte-language-server;
      inherit (nodePackages) pnpm;
    in
    {
      devShells.default = mkShell {
        packages = [
          nodejs
          pnpm
          python3
          svelte-language-server
        ];
      };
    });
}
