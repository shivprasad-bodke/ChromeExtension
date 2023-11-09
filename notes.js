//   ************************************************ NOTES SECTION *******************************************

let submit=document.querySelector(".submit");
let notesElem=document.querySelector('.notes');
let title=document.querySelector("#text");
let desc=document.querySelector('#desc');
let notes=JSON.parse(localStorage.getItem("notes"));

if(notes){
    notes.forEach(element => {
        addNotes(element)
    });
}

submit.addEventListener("click", (e)=>{
    e.preventDefault();
    addNotes()
})
function addNotes(obj) {
    let card=document.createElement("div");
    card.classList.add("card");
    let titleval=title.value;
    let descVal=desc.value;
    if(obj){
        titleval=obj.title;
        descVal=obj.desc;
    }
    if(titleval){
        card.innerHTML=`<h3>${titleval}</h3>
                                    <p class="ptag">${descVal}</p>
                             <button class="del">Delete</button>`;
        notesElem.appendChild(card);
        updateLs()
    }
    let del=card.querySelector(".del");
    del.addEventListener('click', ()=>{
        card.remove();
        updateLs();
    })
}
function updateLs() {
    let card=document.querySelectorAll(".card");
    let arr=[];
    card.forEach(element => {
        arr.push({
            title:element.children[0].innerText,
            desc:element.children[1].innerText
        })
    });
    localStorage.setItem("notes", JSON.stringify(arr));
}






//************************************** */ JAVASCRIPT FOR STOPWATCH *****************************************

let [milliseconds,seconds,minutes,hours] = [0,0,0,0];
let timerRef = document.querySelector('.timerDisplay');
let int = null;

//  start button 
document.getElementById('startTimer').addEventListener('click', ()=>{
    if(int!==null){
        clearInterval(int);
    }
    int = setInterval(displayTimer,10);
});

//pause button 
document.getElementById('pauseTimer').addEventListener('click', ()=>{
    clearInterval(int);
});

// reset button
document.getElementById('resetTimer').addEventListener('click', ()=>{
    clearInterval(int);
    [milliseconds,seconds,minutes,hours] = [0,0,0,0];
    timerRef.innerHTML = '00 : 00 : 00 : 000 ';
});

function displayTimer(){
    milliseconds+=10;
    if(milliseconds == 1000)
    {
        milliseconds = 0;
        seconds++;
        if(seconds == 60)
        {
            seconds = 0;
            minutes++;
            if(minutes == 60)
            {
                minutes = 0;
                hours++;
            }
        }
    }

 let h = hours < 10 ? "0" + hours : hours;
 let m = minutes < 10 ? "0" + minutes : minutes;
 let s = seconds < 10 ? "0" + seconds : seconds;
 let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;

 timerRef.innerHTML = ` ${h} : ${m} : ${s} : ${ms}`;
}

