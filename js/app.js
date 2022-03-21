const main = document.querySelector(".main")
const mainBtn = main.querySelector("button");
const qna = document.querySelector(".qna");
const result = document.querySelector(".result");
const endPoint = 12;//ㅊㅗㅇ ㅈㅣㄹ무ㄴ 개수
const select = [0,0,0,0,0,0,0,0,0,0,0,0];

function calResult() {
  var result = select.indexOf(Math.max(...select));
  return result;
}

function setResult() {
  let point = calResult();
  const resultName = document.querySelector(".resultName");
  resultName.innerHTML = infoList[point].name;

  var resultImg = document.createElement('img');
  const imgDiv = document.querySelector("#resultImg");
  var imgUrl = 'img/image-' + point + '.png';
  resultImg.src = imgUrl;
  resultImg.alt = point;//공유하기 할때씀
  resultImg.classList.add("img-fluid");
  imgDiv.appendChild(resultImg);

  const resultDesc = document.querySelector(".resultDesc");
  resultDesc.innerHTML = infoList[point].desc;
}

function goResult() {
  qna.style.WebkitAnimation = "fadeOut 1s";
  qna.style.animation = "fadeOut 1s";
  setTimeout(() => {
    result.style.WebkitAnimation = "fadeIn 1s";
    result.style.animation = "fadeIn 1s";
    setTimeout(() => {
      result.style.display = "block";
      qna.style.display = "none";
    }, 450)});
    setResult();
    calResult();
}

function addAnswer(answerText, qInx, idx) {
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
    var target = qnaList[qInx].a[idx].type;
    for(let i = 0; i < target.length; i++) {
      select[target[i]] += 1;
    }
    
    for(let i = 0; i < children.length; i++) {
      children[i].style.display = "none";
    }
    goNext(++qInx);
  }, 450)
  
  },false);
}

function goNext(qInx) {
  if(qInx === endPoint) {
    goResult();
    return;
  }
  var q = document.querySelector(".questionBox");
  q.innerHTML = qnaList[qInx].q;
  for(let i in qnaList[qInx].a) {
    addAnswer(qnaList[qInx].a[i].answer, qInx ,i);
  }
  var status = document.querySelector(".statusBar");
  status.style.width = (100/endPoint) * (qInx+1) + '%';
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

