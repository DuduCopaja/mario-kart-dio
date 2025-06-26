const personagens = [
  {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
  },
  {
    NOME: "Peach",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 2,
    PONTOS: 0,
  },
  {
    NOME: "Yoshi",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 4,
    PODER: 3,
    PONTOS: 0,
  },
  {
    NOME: "Bowser",
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
  },
  {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
  },
  {
    NOME: "Donkey Kong",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
  },
];

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  const random = Math.random();
  if (random < 0.33) return "RETA";
  if (random < 0.66) return "CURVA";
  return "CONFRONTO";
}

async function logRollResult(nome, atributo, dado, valor) {
  console.log(
    `${nome} 🎲 rolou um dado de ${atributo} ${dado} + ${valor} = ${
      dado + valor
    }`
  );
}

async function playRaceEngine(player1, player2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);
    const block = await getRandomBlock();
    console.log(`Bloco: ${block}`);

    const dice1 = await rollDice();
    const dice2 = await rollDice();

    let total1 = 0;
    let total2 = 0;

    if (block === "RETA") {
      total1 = dice1 + player1.VELOCIDADE;
      total2 = dice2 + player2.VELOCIDADE;
      await logRollResult(
        player1.NOME,
        "velocidade",
        dice1,
        player1.VELOCIDADE
      );
      await logRollResult(
        player2.NOME,
        "velocidade",
        dice2,
        player2.VELOCIDADE
      );
    } else if (block === "CURVA") {
      total1 = dice1 + player1.MANOBRABILIDADE;
      total2 = dice2 + player2.MANOBRABILIDADE;
      await logRollResult(
        player1.NOME,
        "manobrabilidade",
        dice1,
        player1.MANOBRABILIDADE
      );
      await logRollResult(
        player2.NOME,
        "manobrabilidade",
        dice2,
        player2.MANOBRABILIDADE
      );
    } else if (block === "CONFRONTO") {
      const power1 = dice1 + player1.PODER;
      const power2 = dice2 + player2.PODER;
      console.log(`${player1.NOME} confrontou com ${player2.NOME}! 🥊`);
      await logRollResult(player1.NOME, "poder", dice1, player1.PODER);
      await logRollResult(player2.NOME, "poder", dice2, player2.PODER);

      if (power1 > power2 && player2.PONTOS > 0) {
        console.log(
          `${player1.NOME} venceu o confronto! ${player2.NOME} perdeu um ponto. 🐢`
        );
        player2.PONTOS--;
      } else if (power2 > power1 && player1.PONTOS > 0) {
        console.log(
          `${player2.NOME} venceu o confronto! ${player1.NOME} perdeu um ponto. 🐢`
        );
        player1.PONTOS--;
      } else if (power1 === power2) {
        console.log("Confronto empatado! Nenhum ponto foi perdido!");
      }
    }

    if (total1 > total2) {
      console.log(`${player1.NOME} marcou um ponto!`);
      player1.PONTOS++;
    } else if (total2 > total1) {
      console.log(`${player2.NOME} marcou um ponto!`);
      player2.PONTOS++;
    }

    console.log("---------------------------------------");
  }
}

function declareWinner(p1, p2) {
  console.log("Resultado Final:");
  console.log(`${p1.NOME}: ${p1.PONTOS} ponto(s)`);
  console.log(`${p2.NOME}: ${p2.PONTOS} ponto(s)`);

  if (p1.PONTOS > p2.PONTOS) {
    console.log(`\n${p1.NOME} venceu a corrida! 🏆`);
  } else if (p2.PONTOS > p1.PONTOS) {
    console.log(`\n${p2.NOME} venceu a corrida! 🏆`);
  } else {
    console.log("A corrida terminou em empate!");
  }
}

function sortearPersonagens(lista) {
  const copia = [...lista];
  const escolhido1 = copia.splice(
    Math.floor(Math.random() * copia.length),
    1
  )[0];
  const escolhido2 = copia[Math.floor(Math.random() * copia.length)];
  return [escolhido1, escolhido2];
}

(async function main() {
  const [player1, player2] = sortearPersonagens(personagens);

  console.log(
    `🏁 Corrida entre ${player1.NOME} e ${player2.NOME} começando...🚩\n`
  );

  await playRaceEngine(player1, player2);
  declareWinner(player1, player2);
})();
