class AbrigoAnimais {
  constructor() {
    this.animais = {
      Rex: ["RATO", "BOLA"],
      Mimi: ["BOLA", "LASER"],
      Fofo: ["BOLA", "RATO", "LASER"],
      Zero: ["RATO", "BOLA"],
      Bola: ["CAIXA", "NOVELO"],
      Bebe: ["LASER", "RATO", "BOLA"],
      Loco: ["SKATE", "RATO"]
    };

    this.brinquedosValidos = ["RATO", "BOLA", "LASER", "CAIXA", "NOVELO", "SKATE"];
  }

  encontraPessoas(pessoa1, pessoa2, ordemAnimais) {
    const lista1 = pessoa1.split(",");
    const lista2 = pessoa2.split(",");
    const listaAnimais = ordemAnimais.split(",");

    // Validação de brinquedos
    const brinquedosSet = new Set([...lista1, ...lista2]);
    if (brinquedosSet.size !== lista1.length + lista2.length) return { erro: "Brinquedo inválido" };
    for (const b of brinquedosSet) {
      if (!this.brinquedosValidos.includes(b)) return { erro: "Brinquedo inválido" };
    }

    // Validação de animais
    const animaisSet = new Set(listaAnimais);
    if (animaisSet.size !== listaAnimais.length) return { erro: "Animal inválido" };
    for (const a of listaAnimais) {
      if (!this.animais[a]) return { erro: "Animal inválido" };
    }

    // Função auxiliar
    const segueOrdem = (listaPessoa, listaAnimal) => {
      let i = 0;
      for (const b of listaPessoa) {
        if (b === listaAnimal[i]) i++;
        if (i === listaAnimal.length) return true;
      }
      return false;
    };

    const resultado = [];
    const adotados = { 1: 0, 2: 0 };

    for (const nome of listaAnimais) {
      const brinquedos = this.animais[nome];
      const pode1 = segueOrdem(lista1, brinquedos);
      const pode2 = segueOrdem(lista2, brinquedos);

      const isGato = ["Mimi", "Fofo", "Zero"].includes(nome);

      if (nome === "Loco") {
        const jaTemAdocao = resultado.some(r => !r.includes("abrigo"));
        if (!jaTemAdocao) {
          resultado.push(`${nome} - abrigo`);
          continue;
        }
      }

      if (isGato && pode1 && pode2) {
        resultado.push(`${nome} - abrigo`);
        continue;
      }

      if (pode1 && !pode2 && adotados[1] < 3) {
        resultado.push(`${nome} - pessoa 1`);
        adotados[1]++;
      } else if (pode2 && !pode1 && adotados[2] < 3) {
        resultado.push(`${nome} - pessoa 2`);
        adotados[2]++;
      } else {
        resultado.push(`${nome} - abrigo`);
      }
    }

    return { lista: resultado.sort() };
  }
}

export { AbrigoAnimais as AbrigoAnimais };