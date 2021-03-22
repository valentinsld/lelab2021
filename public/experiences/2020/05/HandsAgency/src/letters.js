export class letters {
  constructor() {
    let titleItems = document.querySelector("h1").children;
    let body = document.querySelector("body");

    for (let item of titleItems) {
      var text = item.innerHTML.split("");
      var newHTML = "";

      text.forEach((e) => {
        newHTML += `<div class="letter"><span>${e}</span><br><span class="strokeText">${e}</span></div>`;
      });

      item.innerHTML = newHTML;
    }

    var letters = document.querySelectorAll(".letter");

    letters.forEach((e) => {
      e.addEventListener("mouseover", function () {
        var that = this;

        that.style.transform = "translateY(-150px)";
        body.classList.add("hov");

        setTimeout(() => {
          that.style.transform = "";
          body.classList.remove("hov");
        }, 1400);
      });
    });
  }
}
