import { publish } from "gh-pages";

publish("dist", {
  branch: "gh-pages",
  dotfiles: true,
  repo: "git@github.com:mtoohey31/json2lua",
  user: {
    name: "Matthew Toohey",
    email: "contact@mtoohey.com",
  },
});
