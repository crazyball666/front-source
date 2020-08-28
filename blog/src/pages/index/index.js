import "./index.scss"

export default function () {
  console.log($(".articles"))
  $(".articles").removeAttr("hidden");
}