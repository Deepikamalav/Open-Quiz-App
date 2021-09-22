const begin = document.querySelector("#begin");
const submit = document.querySelector("#submit");
const numb = document.querySelector("#numb");
var finalData = [];
var actual_answer = {};
var user_input = {};

begin.addEventListener("click", (e) => {
  main(numb.value);
  begin.remove();
  numb.remove();
});

submit.addEventListener("click", (e) => {
  actual_answer = create_actual_answer();
  score = calculate_score(user_input, actual_answer);
  document.querySelector("#score").innerHTML = score;
});

function create_actual_answer() {
  finalData.forEach((question, index) => {
    actual_answer[index] = question.correct_answer;
  });
  return actual_answer;
}

function calculate_score(user_input, actual_answer) {
  console.log(user_input);
  console.log(actual_answer);
  score = 0;
  for (let key in user_input) {
    if (user_input[key] == actual_answer[key]) {
      score++;
    }
  }
  return score;
}

const main = async (numb) => {
  let data = await fetch(`https://opentdb.com/api.php?amount=${numb}`);
  let quizData = await data.json();
  finalData = quizData.results;
  createQuestion(finalData);
};

const createQuestion = (quiz) => {
  quiz.forEach((elem, index) => {
    // Options
    let option = document.createElement("div");
    option.style.color = "red";
    option.innerHTML = elem.correct_answer;

    document.body.append(option);
    let inc = elem.incorrect_answers;
    inc.push(elem.correct_answer);
    var needed_options = shuffle(inc);
    createBlocks(elem.question, needed_options, index);
  });
};

const createBlocks = (question, options, question_index) => {
  let parentDiv = document.createElement("DIV");
  parentDiv.classList.add("parent-div");

  let questionDiv = document.createElement("DIV");
  questionDiv.innerHTML = question;
  questionDiv.style.color = "green";
  parentDiv.append(questionDiv);

  let optionsDiv = document.createElement("DIV");
  options.forEach((option, index) => {
    let label = document.createElement("LABEL");
    label.innerHTML = option;
    let radio = document.createElement("INPUT");
    radio.setAttribute("type", "radio");
    radio.setAttribute("name", "ques-" + question_index);
    radio.addEventListener("click", (event) => {
      user_input[question_index] = option;
    });

    optionsDiv.append(label, radio);
    parentDiv.append(optionsDiv);
  });

  document.body.append(parentDiv);
};

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}
