let inpName = document.querySelector("#inpName");
let inpImage = document.querySelector("#inpImage");
let inpProfession = document.querySelector("#inpProfession");
let cards = document.querySelector(".carousel");
let cards2 = document.querySelector("#cardUl");
let btnSave = document.querySelector("#btnSave");
let btnModal = document.querySelector("#btnCreate");
let cardsForm = document.querySelector(".form1");
let formInputs = document.querySelectorAll(".form1 input");
let modal = document.querySelector(".main-modal");
let btnClose = document.querySelector(".inner-modal button");
let btnSaveChanges = document.querySelector("#btnSaveChanges");

cardsRead();

btnSave.addEventListener("click", (elem) => {
  elem.preventDefault();
  let inputsCheck = true;
  for (let i = 0; i < formInputs.length; i++) {
    if (!formInputs[i].value.trim()) {
      inputsCheck = false;
      alert("Заполните данные");
      break;
    }
  }
  if (inputsCheck) {
    let obj = {
      image: inpImage.value,
      name: inpName.value,
      profession: inpProfession.value,
    };
    let data = JSON.parse(localStorage.getItem("students")) || [];
    data.push(obj);
    localStorage.setItem("students", JSON.stringify(data));
    modal.style.display = "none";
    formInputs.forEach((elem) => {
      elem.value = "";
    });
    cardsRead();
  }
});

function cardsRead() {
  if (!localStorage.getItem("students")) {
    localStorage.setItem("students", "[]");
  }
  cards2.innerHTML = "";
  let data = JSON.parse(localStorage.getItem("students"));
  data.forEach((elem, index) => {
    cards2.innerHTML += `<li class="card">
    <div class="img">
      <img src="${elem.image}" alt="" />
      <h3 class="card-name">${elem.name}</h3>
      <div class="card-profession">${elem.profession}</div>
      <button onclick = "editCard(${index})" class="card-btn">✎</button>
      <button onclick = "deleteCard(${index})" class="card-btn">✂</button>
    </div>
  </li>`;
  });
}

// edit
function editCard(index) {
  modal.style.display = "flex";
  btnSave.style.display = "none";
  btnSaveChanges.style.display = "block";

  let data = JSON.parse(localStorage.getItem("students"));

  inpImage.value = data[index].image;
  inpImage.setAttribute("id", index);
  inpName.value = data[index].name;
  inpName.setAttribute("id", index);
  inpProfession.value = data[index].profession;
  inpProfession.setAttribute("id", index);
}

btnSaveChanges.addEventListener("click", (event) => {
  event.preventDefault();
  let inputsCheck = true;
  for (let i = 0; i < formInputs.length; i++) {
    if (!formInputs[i].value.trim()) {
      inputsCheck = false;
      alert("Заполните данные");
      break;
    }
  }

  if (inputsCheck) {
    let inpImageID = inpImage.getAttribute("id");
    let inpNameID = inpName.getAttribute("id");
    let inpProfessionID = inpProfession.getAttribute("id");

    let data = JSON.parse(localStorage.getItem("students"));

    let newObj = {
      image: inpImage.value,
      name: inpName.value,
      profession: inpProfession.value,
    };

    data.splice(inpImageID, 1, newObj);
    data.splice(inpNameID, 1, newObj);
    data.splice(inpProfessionID, 1, newObj);

    localStorage.setItem("students", JSON.stringify(data));
    modal.style.display = "none";
    cardsRead();
  }
});

function deleteCard(index) {
  let data = JSON.parse(localStorage.getItem("students"));
  data.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(data));
  cardsRead();
}

btnModal.addEventListener("click", () => {
  modal.style.display = "flex";
  btnSaveChanges.style.display = "none";
  btnSave.style.display = "flex";
  formInputs.forEach((elem) => {
    elem.value = "";
  });
});

btnClose.addEventListener("click", () => {
  modal.style.display = "none";
});

// -----------------

let textModalSaveBtn = document.querySelector("#textModalSave");
let textModalInput = document.querySelector(".inner-text-modal textarea");
let textModaCloseBtn = document.querySelector("#textModalClose");
let textInfo = document.querySelector("#get-text-info-new");
let textAddBtn = document.querySelector(".get-text button");
let textModal = document.querySelector(".text-modal");
let newText = document.querySelector(".newText");
let newTextBlock = document.querySelector(".newTextBlock");
let newTextSave = document.querySelector("#newTextSave");
let textEditBtn = document.querySelector(".textEditBtn");

textRead();

newTextSave.addEventListener("click", (e) => {
  e.preventDefault();
  let textCheck = true;
  if (!newText.value.trim()) {
    textCheck = false;
    alert("Поле не может быть пустым");
  }
  if (textCheck) {
    let text = `${newText.value}`;
    let data = JSON.parse(localStorage.getItem("text")) || [];
    data.push(text);
    localStorage.setItem("text", JSON.stringify(data));
    newTextBlock.style.display = "none";
    newText.value = "";
  }
  textRead();
});

function textRead() {
  if (!localStorage.getItem("text")) {
    localStorage.setItem("text", "[]");
  }
  textInfo.innerHTML = "";
  let data = JSON.parse(localStorage.getItem("text"));
  data.forEach((elem, index) => {
    if (index < 6) {
      textInfo.innerHTML += `<h3>0${index + 4}</h3>
      <p>${elem}</p>
      <div class = "textBtns">
      <button onclick = "editText(${index})">Изменить</button>
      <button onclick = "deleteText(${index})">Удалить</button></div>`;
    } else {
      textInfo.innerHTML += `<h3>${index + 4}</h3>
      <p>${elem}</p>
      <div class = "textBtns">
      <button onclick = "editText(${index})">Изменить</button>
      <button onclick = "deleteText(${index})">Удалить</button></div>`;
    }
  });
}

function deleteText(index) {
  let data = JSON.parse(localStorage.getItem("text"));
  data.splice(index, 1);
  localStorage.setItem("text", JSON.stringify(data));
  textRead();
}

textAddBtn.addEventListener("click", () => {
  newTextBlock.style.display = "flex";
});

textModaCloseBtn.addEventListener("click", () => {
  textModal.style.display = "none";
});

function editText(index) {
  textModal.style.display = "flex";

  let data = JSON.parse(localStorage.getItem("text"));

  textModalInput.value = data[index];
  textModalInput.setAttribute("id", index);
}

textModalSaveBtn.addEventListener("click", () => {
  let textCheck = true;
  if (!textModalInput.value.trim()) {
    textCheck = false;
    alert("Поле не может быть пустым");
  }

  if (textCheck) {
    let textInputID = textModalInput.getAttribute("id");

    let data = JSON.parse(localStorage.getItem("text"));
    let newText = textModalInput.value;

    data.splice(textInputID, 1, newText);

    localStorage.setItem("text", JSON.stringify(data));
    textModal.style.display = "none";
    textRead();
  }
});

// -----------------------------------------
