import { publish } from "gh-pages";

publish(
  "dist",
  {
    branch: "gh-pages",
    dotfiles: true,
    repo: "https://github.com/mtoohey31/json2lua",
    user: {
      name: "Matthew Toohey",
      email: "contact@mtoohey.com",
    },
  },
  () => {
    console.log("Deploy Complete!");
  }
);
