// import { words } from "./words";
const pts = document.querySelector(".pts");
let contador = 0;

export default class Card {
  opened = false;
  content;
  totalPoints = 0;

  constructor(content) {
    this.content = content;
  }

  open(html, value) {
    if (value === this.content.hide) {
      this.opened = true;
      setTimeout(function () {
        html.getElementsByClassName("front")[0].style.background = "green";
        html.getElementsByClassName("front")[0].style.color = "#e6e6e6";
      }, 500);
      contador += 20;
      console.log(contador);
      pts.innerText = contador;
    } else {
      this.opened = true;
      setTimeout(function () {
        html.getElementsByClassName("front")[0].style.background = "red";
        html.getElementsByClassName("front")[0].style.color = "#e6e6e6";
      }, 500);
      contador -= 10;
      pts.innerText = contador;
    }
  }

  render(id) {
    let that = this;

    let root = document.createDocumentFragment();
    let caixaCards = document.createElement("div");
    caixaCards.setAttribute("class", "caixa-card");

    let card = document.createElement("div");
    card.addEventListener("click", function () {
      if (!that.opened) {
        Swal.fire({
          title: `Quanto dá ${that.content.open}=?`,
          input: "text",
          confirmButtonText: "responder",
          inputValidator: (value) => {
            if (value) {
              this.classList.toggle("card-open");
              that.open(this, value);
              setTimeout(() => {
                this.setAttribute("class", "card noHover");
              }, 5000);
            }
          },
        });
      }
    });
    card.addEventListener("mouseleave", function () {
      if (that.opened) {
        //this.setAttribute("class", "card noHover")
      }
    });
    card.setAttribute("class", "card");
    card.setAttribute("id", `card-${id}`);

    let content = document.createElement("div");
    content.setAttribute("class", "content");

    let front = document.createElement("div");
    front.setAttribute("class", "front");

    front.appendChild(document.createTextNode(`${that.content.open}`));

    let back = document.createElement("div");
    back.setAttribute("class", "back");

    back.appendChild(document.createTextNode(`${that.content.hide}`));

    content.appendChild(front);
    content.appendChild(back);

    card.appendChild(content);

    caixaCards.appendChild(card);
    root.appendChild(caixaCards);

    return root;
  }
}
