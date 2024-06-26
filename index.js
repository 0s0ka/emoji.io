import { data } from "./data.js";

// реализация отрисовки карточек на странице
let content = document.querySelector(".card_wr");

function renderCards(dataRender) {
  content.innerHTML = "";
  for (let elem of dataRender) {
    let div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <span class="card__symbol">${elem.symbol}</span>
    <p class="card__title">${elem.title}</p>
    <p class="card__keywords">${elem.keywords}</p>
    `;
    content.append(div);
  }
}

// удаление дублирования в keywords
function getUniqueValues(data) {
  return data.map((obj) => {
    let uniqueKeywords = [
      ...new Set(obj.keywords.toLowerCase().split(" ")),
    ].join(" ");
    return { ...obj, keywords: uniqueKeywords };
  });
}
let uniqueData = getUniqueValues(data);
renderCards(uniqueData);

// реализация поиска по результатам ввода в инпут
const input = document.querySelector("#input");
function searchEmoji(event) {
  const queryInput = event.target.value.toLowerCase().trim();
  const filteredResult = uniqueData.filter(
    (obj) =>
      obj.title.toLocaleLowerCase().includes(queryInput) ||
      obj.keywords.toLocaleLowerCase().includes(queryInput)
  );
  renderCards(filteredResult);
}
input.addEventListener("input", searchEmoji);
