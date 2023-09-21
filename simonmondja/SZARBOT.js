let zold = document.getElementById("zold");
zold.style.pointerEvents = "none";
let piros = document.getElementById("piros");
piros.style.pointerEvents = "none";
let kek = document.getElementById("kek");
kek.style.pointerEvents = "none";
let sarga = document.getElementById("sarga");
sarga.style.pointerEvents = "none";
var idozitoId;
var kor = 1;
var idozito;
var szinek = ["zold", "piros", "sarga", "kek"];
var helyesSorrend = [];
var jatekosValasz = [];
var idoke = 0;
var p = document.createElement("p");
alert("KI KELL VÁRNI A GENERÁLÁST!");

// Vegyél fel egy új változót a generálás állapotának követésére
let generaloAktiv = true;

function Adatok() {
    let hely = document.getElementById("adatok");
    p.innerHTML = kor;
    p.style.fontSize = "48px";
    p.style.color = "white";
    hely.appendChild(p);
}

function Random(also, felso) {
    return Math.floor(Math.random() * (felso - also + 1) + also);
}

function Start() {
    helyesSorrend = [];
    jatekosValasz = [];
    let zold = document.getElementById("zold");
    zold.style.backgroundColor = "green";
    zold.style.opacity = "50%";
    let piros = document.getElementById("piros");
    piros.style.backgroundColor = "red";
    piros.style.opacity = "50%";
    let kek = document.getElementById("kek");
    kek.style.backgroundColor = "blue";
    kek.style.opacity = "50%";
    let sarga = document.getElementById("sarga");
    sarga.style.backgroundColor = "yellow";
    sarga.style.opacity = "50%";
    idozito = 3000;
    console.log(idozito);
    Adatok();
    // A generálás előtt állítsd be a generálás állapotát hamisra
    generaloAktiv = false;
    Jatek();
    var start = document.getElementById("start");
    start.disabled = true;
    // A generálás után állítsd vissza a generálás állapotát igazra
    generaloAktiv = true;
}

function Jatek() {
    helyesSorrend.push(szinek[Random(0, 3)]);

    setTimeout(function () {
        MegjelenitSorrend(helyesSorrend);
    }, 1000);

    let szinekElemek = document.querySelectorAll(".szin");
    szinekElemek.forEach(function (szinElem) {
        szinElem.style.pointerEvents = "none";
    });

    setTimeout(function () {
        szinekElemek.forEach(function (szinElem) {
            szinElem.style.pointerEvents = "auto";
        });
    }, helyesSorrend.length * 1000 + 1000);
}


function MegjelenitSorrend(sorrend) {
    // Ellenőrizd, hogy a generálás aktív-e
    if (!generaloAktiv) {
        return;
    }

    let delay = 0;
    idoke = 0;
    for (let i = 0; i < sorrend.length; i++) {
        setTimeout(function () {
            Kirajzol(sorrend[i]);
        }, delay);
        delay += 1000;
    }
    let zold = document.getElementById("zold");
    zold.style.pointerEvents = "auto";
    let piros = document.getElementById("piros");
    piros.style.pointerEvents = "auto";
    let kek = document.getElementById("kek");
    kek.style.pointerEvents = "auto";
    let sarga = document.getElementById("sarga");
    sarga.style.pointerEvents = "auto";
}

function Kirajzol(szin) {
    clearInterval(idozitoId);
    if (idoke === 0) {
        ora();
    }
    let elem = document.querySelector(`[data-szin="${szin}"]`);
    let zold = document.getElementById("zold");
    zold.style.pointerEvents = "none";
    let piros = document.getElementById("piros");
    piros.style.pointerEvents = "none";
    let kek = document.getElementById("kek");
    kek.style.pointerEvents = "none";
    let sarga = document.getElementById("sarga");
    sarga.style.pointerEvents = "none";
    elem.style.opacity = "100%";
    setTimeout(function () {
        elem.style.opacity = "50%";
    }, 500);
}

function Kattintas(szin) {
    Kirajzol(szin);
    jatekosValasz.push(szin);

    if (!Ellenoriz(jatekosValasz, helyesSorrend)) {
        alert("Hibás válasz! A játék véget ért.");
        return;
    }

    if (jatekosValasz.length === helyesSorrend.length) {
        
        kor++;
        idozito += 2000 + helyesSorrend.length + 1 * 1000;
        Adatok();
        jatekosValasz = [];
        setTimeout(Jatek, 1000);
    }
}

function Ellenoriz(jatekosValasz, helyesSorrend) {
    for (let i = 0; i < jatekosValasz.length; i++) {
        if (jatekosValasz[i] !== helyesSorrend[i]) {
            return false;
        }
    }
    return true;
}

var idozitoId;

function ora() {
    var ido = idozito / 1000;
    idozitoId = setInterval(function () {
        if (ido > 0) {
            ido--;
        } else {
            clearInterval(idozitoId);
            alert("Lejárt az idő");
            location.reload();
        }
    }, 1000);
}

function Reset() {
    location.reload();
}
