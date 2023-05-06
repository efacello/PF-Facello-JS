const resultDisplay = document.querySelector('#result');
const choicesDisplay = document.querySelector('#choices');
const choices = ['piedra', 'papel', 'tijera'];
let playerScore = 0;
let computerScore = 0;

const handleClick = async (e) => {
  const userChoice = e.target.innerHTML;
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  await getResults(userChoice, computerChoice);
  await showScore();
};

choices.forEach(choice => {
  const button = document.createElement('button');
  button.innerHTML = choice;
  button.addEventListener('click', handleClick);
  choicesDisplay.appendChild(button);
});

async function updateScore(playerScore, computerScore) {
  const response = await fetch("score.json");
  const score = await response.json();
  score.player += playerScore;
  score.computer += computerScore;
  const putOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(score)
  };
  const putResponse = await fetch("score.json", putOptions);
}

async function showScore() {
  const response = await fetch("score.json");
  const score = await response.json();
  console.log(`Score: Player ${score.player} - Computer ${score.computer}`);
}

async function getResults(userChoice, computerChoice) {
  switch (userChoice + computerChoice) {
    case 'tijerapapel':
    case 'piedratijera':
    case 'papelpiedra':
      playerScore++;
      resultDisplay.innerHTML = 'Tu elección fue ' + userChoice + ' y el universo eligió ' + computerChoice + ', fue suerte... ganaste!';
      break;
    case 'papeltijera':
    case 'tijerapiedra':
    case 'piedrapapel':
      computerScore++;
      resultDisplay.innerHTML = 'Tu elección fue ' + userChoice + ' y el universo eligió ' + computerChoice + ', jaja! Perdiste!!!!';
      break;
    case 'tijeratijera':
    case 'piedrapiedra':
    case 'papelpapel':
      resultDisplay.innerHTML = 'Tu elección fue ' + userChoice + ' y el universo eligió ' + computerChoice + ', están en equilibrio!';
      break;
  }
}

window.addEventListener('beforeunload', async () => {
  await updateScore(playerScore, computerScore);
});

showScore();