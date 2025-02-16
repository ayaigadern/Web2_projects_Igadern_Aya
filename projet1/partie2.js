let questions=[];

document.querySelector(".api").addEventListener("click", function(event) {
    event.preventDefault();
    document.querySelector(".quiz").style.display="flex";
    document.querySelector(".all2").style.display="none";
   
    document.querySelector(".container").style.display="none";

    
    // Récupération des valeurs du formulaire
    let number = parseInt(document.querySelector(".num").value)||10;
    let category = parseInt(document.querySelector(".slct").value||9);
    let diff = document.querySelector(".slct2").value||"easy"; 
    let type = document.querySelector(".slct3").value||"boolean"; 
    let encoding = document.querySelector(".slct4").value||"default-encoding"; 

    // Construction de l'URL de l'API
    const apiUrl = `https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${diff}&type=${type}`;

    // Appel à l'API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Transformation des données de l'API
            questions = data.results.map(question => {
                return {
                    question: question.question,
                    correctAnswer: question.correct_answer,
    
                    allAnswers: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5)
                };
            });
            console.log(questions);
            

        })
        .catch(error => console.error('Error fetching questions:', error));

       

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
                questions[index].allAnswers.forEach((element,i) => {
                    let label=document.createElement("label");
                    let checkbox=document.createElement("input");
                    checkbox.type="checkbox";
                    checkbox.name=`question${index}`;
                    checkbox.value=element;
                    console.log("malak",checkbox.value);
                    
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
                if (index === questions.length - 1) {
                    cont.classList.add("disabled");
                    cont.querySelectorAll("input").forEach(input => input.disabled = true);
                }
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
        let useranswer = [];
function save(questionIndex) {
    let selected = document.querySelectorAll(`input[name="question${questionIndex}"]:checked`);
    useranswer[questionIndex] = [];
    selected.forEach(checkbox => {
        useranswer[questionIndex].push(checkbox.value);
    });
}
       
        
        //save
        
        //result
        function Results() {
            useranswer.forEach((item, ind) => {
                if (item && item.includes(questions[ind].correctAnswer)) {
                    score++;
                }
            });
            let a = document.querySelector(".result");
            a.innerText = `Votre score est de ${score} sur ${questions.length}`;
            window.scrollTo(0, 0);
        }
        //result
        
        
        
        document.getElementById("btn").addEventListener("click",function(){
            if(index==questions.length-1){
                clearInterval(timerInterval);
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
        
});


