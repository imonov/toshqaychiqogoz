"use strict";

const values = {
    0: "Tosh",
    1: "Qaychi",
    2: "Qog'oz",
};

let winCnt =
    localStorage.getItem("win") == null ? 0 : localStorage.getItem("win");
let rscCnt =
    localStorage.getItem("rsc") == null ? 0 : localStorage.getItem("rsc");
let eqlCnt =
    localStorage.getItem("eql") == null ? 0 : localStorage.getItem("eql");

const selectBtn = document.querySelectorAll(".btn-select");
const resultText = document.querySelector(".result");
const countLbl = document.querySelector(".count");
countLbl.innerHTML = `Yutishlar: ${winCnt}; Mag'lubiyatlar: ${rscCnt}; Durranglar: ${eqlCnt}`;

const getComVal = () => Math.floor(Math.random() * 3);

let result = false;

selectBtn.forEach((btn) => {
    btn.addEventListener("click", function (e) {
        if (winCnt + eqlCnt + rscCnt >= 10) {
            winCnt = 0;
            eqlCnt = 0;
            rscCnt = 0;
            return;
        }

        const sVal = this.dataset.value;
        const compValue = getComVal();

        if (sVal == compValue) {
            console.log("Durang");
            result = "durrang";
            eqlCnt++;
        } else if (
            (sVal == 0 && compValue == 1) ||
            (sVal == 1 && compValue == 2) ||
            (sVal == 2 && compValue == 0)
        ) {
            console.log(`Yutdik ${values[sVal]}: ${values[compValue]}`);
            result = true;
            winCnt++;
        } else {
            console.log(`Yutqazdik ${values[sVal]}: ${values[compValue]}`);
            result = false;
            rscCnt++;
        }

        resultText.innerHTML = `
<p>Men: ${values[sVal]}<br>Kompyuter: ${values[compValue]}</p>
`;

        let resHTML = "";

        if (result === true) {
            resHTML = `<h2 class="win">Yutdingiz 🎉</h2>`;
        } else if (result === false) {
            resHTML = `<h2 class="lose">Yutqazdingiz 😢</h2>`;
        } else {
            resHTML = `<h2 class="draw">Durang 🤝</h2>`;
        }

        resultText.innerHTML += resHTML;
        countLbl.innerHTML = `Yutishlar: ${winCnt}; Mag'lubiyatlar: ${rscCnt}; Durranglar: ${eqlCnt}`;

        localStorage.setItem("win", winCnt);
        localStorage.setItem("rsc", rscCnt);
        localStorage.setItem("eql", eqlCnt);
    });
});
