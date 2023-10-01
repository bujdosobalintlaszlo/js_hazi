        var fileInput = document.getElementById("fajl");
        var output = document.getElementById("output");
        var valaszok = [];
        var jo;
        var sorrend = [];
        fileInput.addEventListener('change', () => {
            let fr = new FileReader();
            fr.readAsText(fileInput.files[0]);

            fr.onload = function () {
                originalText = fr.result;
                var verses = originalText.split("\n");
                var wordList = [];
                jo = [];

                verses.forEach(function (verse) {
                    var verseWords = verse.split(/\s+/);
                    wordList = wordList.concat(verseWords);
                });

                for (var i = 1; i < 11; i++) {
                    var randomWordIndex;
                    var selectedWord;
                
                    do {
                        randomWordIndex = Random(0, wordList.length - 1);
                        selectedWord = wordList[randomWordIndex];
                    } while (selectedWord.includes(".") || selectedWord === "");
                    
                    jo.push(selectedWord);
                    console.log(jo);
                    wordList[randomWordIndex] = (i).toString();
                }
                
                var newHTML = "";

                verses.forEach(function (verse) {
                    var verseWords = verse.split(/\s+/);

                    verseWords.forEach(function (word) {
                        newHTML += wordList.shift() + " ";
                    });

                    newHTML = newHTML.trim() + '<br>';
                });

                output.innerHTML = newHTML;
                output.style.backgroundColor = "bisque";
                output.style.border = "3px solid black";
                KiGen();
            }
        });

        function Random(also, felso) {
            return Math.floor(Math.random() * (felso - also + 1) + also);
        }

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
                    //eredmeny.placeholder= jo[j];
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