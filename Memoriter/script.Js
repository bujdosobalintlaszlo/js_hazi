        var fajl = document.getElementById("fajl");
        var output = document.getElementById("output");
        var valaszok = [];
        var jo;
        var sorrend = [];

        fajl.addEventListener('change', () => {
            let fr = new FileReader();
            fr.readAsText(fajl.files[0]);

            fr.onload = function () {
                eredeti = fr.result;
                var verses = eredeti.split("\n");
                var szolista = [];
                jo = [];

                verses.forEach(function (verse) {
                    var vers = verse.split(/\s+/);
                    szolista = szolista.concat(vers);
                });
                //----------------------------------------------
                var randomIndexek = [];
                for (var i = 0; i < 10; i++) {
                    var randomIndex;
                    do {
                        randomIndex = Math.floor(Math.random() * szolista.length);
                    } while (randomIndexek.includes(randomIndex) || szolista[randomIndex].includes(".") || szolista[randomIndex] === "");
                    randomIndexek.push(randomIndex);
                }

                randomIndexek.sort(function(a, b) {
                    return a - b;
                });

                
                for (var i = 0; i < randomIndexek.length; i++) {
                    var selectedWord = szolista[randomIndexek[i]];
                    jo.push(selectedWord);
                    szolista[randomIndexek[i]] = (i + 1).toString(); 
                }
                //-------------------------------------------------
                for (var i = 0; i < jo.length; i++) {
                    console.log(jo[i]);
                }
                
                var newHTML = "";

                verses.forEach(function (verse) {
                    var vers = verse.split(/\s+/);

                    vers.forEach(function (word) {
                        newHTML += szolista.shift() + " ";
                    });

                    newHTML = newHTML.trim() + '<br>';
                });

                output.innerHTML = newHTML;
                output.style.backgroundColor = "bisque";
                output.style.border = "3px solid black";
                KiGen();
            }
        });

        var Random = (also, felso) => Math.floor(Math.random() * (felso - also + 1) + also);

        function KiGen()
        {
            let hely = document.getElementById("input");
            for(let i = 0; i< 10;i++)
            {
                let inp = document.createElement("input");
                inp.type="text";
                inp.id = i;
                inp.placeholder = i+1 + ". számú szó";
                hely.appendChild(inp);
            }
        }
        function Ell()
        {
            for(let i = 0; i < 10; i++)
            {
                let eredmeny = document.getElementById(i);
                valaszok.push(eredmeny.value);
                console.log(valaszok);
            }
            for(let j =0; j < jo.length;j++)
            {
                if(jo[j] == valaszok[j])
                {
                    let eredmeny = document.getElementById(j);
                    eredmeny.style.border= "2px solid green";
                    eredmeny.style.color="green";
                    eredmeny.value = jo[j];
                }
                else
                {
                    let eredmeny = document.getElementById(j);
                    eredmeny.style.border= "2px solid red";
                    eredmeny.style.color="red";
                    eredmeny.value = jo[j];
                }
            }
            Disable();
        }
        function Disable()
        {
            
            for(let j =0; j < jo.length;j++)
            {
                let eredmeny = document.getElementById(j);
                eredmeny.disabled = true;
            }
        }
