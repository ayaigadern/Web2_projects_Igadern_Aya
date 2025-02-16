const questions= [
    { question: "Quel est le symbole chimique de l'or ?", answers: ["Au", "Ag", "Fe"], correct: 0 },
    { question: "Qui a peint la Joconde ?", answers: ["Vincent Van Gogh", "Léonard de Vinci", "Pablo Picasso"], correct: 1 },
    { question: "Quel est le plus grand désert du monde ?", answers: ["Sahara", "Antarctique", "Gobi"], correct: 1 },
    { question: "Quel est le nom du plus long fleuve du monde ?", answers: ["Amazone", "Nil", "Mississippi"], correct: 1 },
    { question: "Qui a écrit 'Les Misérables' ?", answers: ["Victor Hugo", "Émile Zola", "Gustave Flaubert"], correct: 0 },
    { question: "Combien y a-t-il de continents sur Terre ?", answers: ["5", "6", "7"], correct: 2 },
    { question: "Quel pays a remporté la Coupe du Monde de football en 2018 ?", answers: ["Brésil", "Allemagne", "France"], correct: 2 },
    { question: "Qui a découvert l'Amérique en 1492 ?", answers: ["Marco Polo", "Christophe Colomb", "James Cook"], correct: 1 },
    { question: "Quel est l'élément principal de l'air que nous respirons ?", answers: ["Oxygène", "Azote", "Hydrogène"], correct: 1 },
    { question: "Quelle planète est surnommée la planète rouge ?", answers: ["Vénus", "Mars", "Jupiter"], correct: 1 }
];
document.getElementById("btn").addEventListener("click",function(){
    document.getElementById("btn").innerText="suivant =>";
})
document.querySelector(".container").style.display="none";
let time_max=10;
let index=-1;
let timer;
let timerInterval;
let score=0;
function load(){
    clearInterval(timerInterval);
    index++;
    let plus=document.createElement("div");
    plus.className="plus";

    let time=document.createElement("div");
    time.className="time";
    time.innerText=time_max;

    let all=document.querySelector(".all");

    let prevCont = document.querySelector(".container:last-child");
            if (prevCont) {
                prevCont.classList.add("disabled"); // Ajouter la classe pour désactiver
                prevCont.querySelectorAll("input").forEach(input => input.disabled = true);
            }

    let cont=document.createElement("div");
    cont.className="container";

    let ques=document.createElement("div");
    ques.className="questions";

    let answers=document.createElement("div");
    answers.className="answers";

    if(index<questions.length){
        
        ques.innerText=questions[index].question;
        questions[index].answers.forEach((element,i) => {
            let label=document.createElement("label");
            let checkbox=document.createElement("input");
            checkbox.type="checkbox";
            checkbox.name=`question${index}`;
            checkbox.value=i;
            
            label.appendChild(checkbox);
            let span=document.createElement("span");
            span.innerText=element;
            label.appendChild(span);
            answers.appendChild(label);

            checkbox.addEventListener("change", () => save(index));
        });
        plus.appendChild(ques);
        plus.appendChild(time);
        cont.appendChild(plus);
        cont.appendChild(answers);
        all.appendChild(cont);
        
    }
    document.getElementById("btn").addEventListener("click", function () {
        if (time) {
            time.innerText = "";
        }
    });
    
    startTimer(time);
    
    
};

//timer
function startTimer(timeElement) {
    let remainingTime = time_max;

    timerInterval = setInterval(() => {
        remainingTime--;
        timeElement.innerText = remainingTime;

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            timeElement.innerText = "Temps écoulé !";
            setTimeout(()=>{
                
                timeElement.innerText="";
            },1500);
            
            if(index<questions.length-1){
                load();
            }
            
        }
    }, 1000);
};

//save
let useranswer=[];
function save(questionIndex) {
    let selected = document.querySelectorAll(`input[name="question${questionIndex}"]:checked`);
    let answers = [];
    selected.forEach(input => {
        answers.push(parseInt(input.value)); 
    });
    useranswer[questionIndex] = answers; 
}

//save

//result
function Results(){
    useranswer.forEach((item, ind) => {
        if (item && item.includes(questions[ind].correct)) {
            score++;
        }
    });
    let a=document.querySelector(".result");
    a.innerText=`Votre score est de ${score} sur ${questions.length}`;
    window.scrollTo(0, 0);
}
//result



document.getElementById("btn").addEventListener("click",function(){
    if(index==questions.length-1){
        save(index);
        document.getElementById("btn").innerText="Terminer";
        document.getElementById("btn").addEventListener("click",function(){
            Results();
            score=0;
        })
    }else{
        load();
    }
   
});



