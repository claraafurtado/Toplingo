'use strict'

const countries = {
    "en-US": "Inglês",
    "pt-BR": "Português",
    "es-ES": "Espanhol"
}

const selects=document.querySelectorAll('select')
const btnTraduzir=document.getElementById('btnTraduzir')
const body=document.querySelector('body')
const btnVoice=document.getElementById('btnFala')

    selects.forEach((tag) => {

        for (let country in countries) {
    
            let selected = ""
    
            if(tag.classList.contains("selectFrom") && country === "pt") {
                selected = "pt"
            }else if(tag.classList.contains("selectTo") && country === "en") {
                selected = "en"
            }if(tag.classList.contains("selecTo") && country == "es"){
                selected = "es"
            }
    
            const option = `<option value="${country}"${selected}>${countries[country]}</option>`
    
            tag.insertAdjacentHTML("beforeend", option)
        }
    })



const from=document.getElementById('from').value


async function traduzirFrase(){
    const idiomaFrase=document.getElementById('from').value
    const idiomaTraduzir=document.getElementById('to').value
    const frase=document.getElementById('inputFrase').value
    const traducao=document.getElementById('inputTraducao')
    if(frase.toLowerCase()=='alice'){
        toggleDarkMode()
    }else{
        const url=`https://api.mymemory.translated.net/get?q=${frase}&langpair=${idiomaFrase}|${idiomaTraduzir}`
        const response=await fetch(url)
        const obj=await response.json()
        //console.log(obj)
        const fraseTraduzida=obj.responseData.translatedText
        //console.log(fraseTraduzida)
        traducao.placeholder=fraseTraduzida
    }
}

function toggleDarkMode() {
    var body = document.body;
    var button = document.getElementById("button-modo");

    if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode");
         
    } else {
        body.classList.add("dark-mode");
        
    }
}

btnVoice.addEventListener('click',()=>{
    const recognition=new(window.SpeechRecognition||window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)
    recognition.lang = 'pt-BR';
    recognition.lang = 'es-ES';
    recognition.lang = 'en-US';
    const traduzirTexto=document.getElementById('inputFrase')

    recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        traduzirTexto.value = speechResult;
    };

    recognition.start();
})