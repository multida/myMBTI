const main = document.querySelector(".main")
const mainBtn = main.querySelector("button");
const qna = document.querySelector(".qna");
const qnaP = qna.querySelector("p");


function addAnswer(answerText, qInx) {
  var a = document.querySelector(".answerBox");
  var answer = document.createElement("button");
  answer.classList.add("answerList");
  answer.classList.add("fadeIn");


  a.appendChild(answer);
  answer.innerHTML = answerText;

  answer.addEventListener("click", function(){
    var children = document.querySelectorAll(".answerList");
  for(let i = 0; i < children.length; i++) {
    children[i].disabled = true;
    children[i].style.WebkitAnimation = "fadeOut 0.5s";
    children[i].style.animation = "fadeOut 0.5s";
    children[i].style.display = "none";
  }
  setTimeout(() => {
    for(let i = 0; i < children.length; i++) {
      children[i].style.display = "none";
    }
    goNext(++qInx);
  }, 450)
  
  },false);
}

function goNext(qInx) {
  var q = document.querySelector(".questionBox");
  q.innerHTML = qnaList[qInx].q;
  for(let i in qnaList[qInx].a) {
    addAnswer(qnaList[qInx].a[i].answer, qInx);
  }
}

function showQna() {
  main.style.WebkitAnimation = "fadeOut 1s";
  main.style.animation = "fadeOut 1s";
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 1s";
    qna.style.animation = "fadeIn 1s";
    setTimeout(() => {
      qna.style.display = "block";
      main.style.display = "none";
    }, 450);
  }, 450);
  let qInx = 0;
  goNext(qInx);
}

mainBtn.addEventListener("click", showQna);

