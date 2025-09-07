import { AbrigoAnimais } from "./abrigo-animais";

describe("Abrigo de Animais", () => {
  let abrigo;

  beforeEach(() => {
    abrigo = new AbrigoAnimais();
  });

  test("Deve rejeitar animal inválido", () => {
    const resultado = abrigo.encontraPessoas("RATO,BOLA", "LASER,SKATE", "Lulu");
    expect(resultado.erro).toBe("Animal inválido");
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve encontrar pessoa 1 para Rex e deixar Fofo no abrigo", () => {
    const resultado = abrigo.encontraPessoas("RATO,BOLA", "LASER,SKATE", "Rex,Fofo");
    expect(resultado.lista).toContain("Rex - pessoa 1");
    expect(resultado.lista).toContain("Fofo - abrigo");
    expect(resultado.lista).toHaveLength(2);
    expect(resultado.erro).toBeFalsy();
  });

  test("Deve intercalar brinquedos e distribuir corretamente os animais", () => {
    const resultado = abrigo.encontraPessoas(
      "BOLA,LASER",
      "SKATE,RATO",
      "Mimi,Fofo,Rex,Bola"
    );
    expect(resultado.lista).toContain("Bola - abrigo");
    expect(resultado.lista).toContain("Fofo - abrigo");
    expect(resultado.lista).toContain("Mimi - pessoa 1");
    expect(resultado.lista).toContain("Rex - abrigo");
    expect(resultado.lista).toHaveLength(4);
    expect(resultado.erro).toBeFalsy();
  });

  test("Brinquedo repetido deve gerar erro", () => {
    const resultado = abrigo.encontraPessoas("RATO,RATO", "BOLA", "Rex");
    expect(resultado.erro).toBe("Brinquedo inválido");
  });

  test("Animal repetido deve gerar erro", () => {
    const resultado = abrigo.encontraPessoas("RATO,BOLA", "LASER,SKATE", "Rex,Rex");
    expect(resultado.erro).toBe("Animal inválido");
  });

  test("Pessoa 1 não deve adotar mais que 3 animais", () => {
    const resultado = abrigo.encontraPessoas(
      "RATO,BOLA,LASER",
      "SKATE",
      "Rex,Zero,Bebe,Mimi,Fofo"
    );
    const adotados1 = resultado.lista.filter(r => r.includes("pessoa 1"));
    expect(adotados1.length).toBeLessThanOrEqual(3);
  });

  test("Loco só vai pro abrigo se ninguém tiver adotado ainda", () => {
    const resultado = abrigo.encontraPessoas("SKATE,RATO", "LASER,BOLA", "Loco,Rex");
    expect(resultado.lista).toContain("Loco - abrigo");
  });

  test("Distribuição completa com todos os animais", () => {
    const resultado = abrigo.encontraPessoas(
      "RATO,BOLA,LASER",
      "SKATE",
      "Rex,Mimi,Fofo,Zero,Bola,Bebe,Loco"
    );
    expect(resultado.lista).toHaveLength(7);
    expect(resultado.erro).toBeFalsy();
  });
});