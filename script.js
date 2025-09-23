// Função para escrever valores por extenso em reais
    function numeroPorExtenso(valor) {
      const unidades = ["", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"];
      const especiais = ["dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"];
      const dezenas = ["", "", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
      const centenas = ["", "cem", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];

      function extenso(n) {
        if (n === 0) return "";
        if (n < 10) return unidades[n];
        if (n < 20) return especiais[n - 10];
        if (n < 100) return dezenas[Math.floor(n / 10)] + (n % 10 !== 0 ? " e " + unidades[n % 10] : "");
        if (n === 100) return "cem";
        if (n === 1000) return "um mil";
        if (n < 1000) return centenas[Math.floor(n / 100)] + (n % 100 !== 0 ? " e " + extenso(n % 100) : "");
        if (n < 1000000) {
          const milhar = Math.floor(n / 1000);
          const resto = n % 1000;
          let milharTexto = milhar === 1 ? "mil" : extenso(milhar) + " mil";
          return milharTexto + (resto !== 0 ? " " + extenso(resto) : "");
        }
        return "";
      }

      let partes = valor.toFixed(2).split(".");
      let reais = parseInt(partes[0]);
      let centavos = parseInt(partes[1]);

      let resultado = "";
      if (reais > 0) {
        resultado += extenso(reais) + (reais === 1 ? " real" : " reais");
      }
      if (centavos > 0) {
        if (reais > 0) resultado += " e ";
        resultado += extenso(centavos) + (centavos === 1 ? " centavo" : " centavos");
      }
      return resultado || "zero reais";
    }

    // Atualiza valor numérico e por extenso
    document.getElementById("valor").addEventListener("input", function () {
      const valor = parseFloat(this.value);
      const campoExtenso = document.getElementById("valor-extenso");
      const campoNumeral = document.getElementById("valor-numeral");

      if (!isNaN(valor)) {
        campoExtenso.textContent = numeroPorExtenso(valor);
        // Remove ponto de milhar e mantém duas casas decimais
        campoNumeral.textContent = valor.toFixed(2).replace('.', ',');
      } else {
        campoExtenso.textContent = "__________________________";
        campoNumeral.textContent = "______";
      }
    });

    // Atualiza cidade no rodapé
    document.getElementById("cidade").addEventListener("input", function () {
      // Deixa a primeira letra maiúscula automaticamente
      let cidade = this.value;
      if (cidade.length > 0) {
        cidade = cidade.charAt(0).toUpperCase() + cidade.slice(1);
      }
      document.getElementById("cidade-extenso").textContent = cidade || "______";
    });

    // Atualiza data no rodapé
    let dataBase = null;
    document.getElementById("data").addEventListener("input", function () {
      if (this.value) {
        dataBase = new Date(this.value + "T00:00:00");
        const meses = [
          "janeiro", "fevereiro", "março", "abril", "maio", "junho",
          "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
        ];
        document.getElementById("dia-extenso").textContent = dataBase.getDate();
        document.getElementById("mes-extenso").textContent = meses[dataBase.getMonth()];
        document.getElementById("ano-extenso").textContent = dataBase.getFullYear();
      } else {
        dataBase = null;
        document.getElementById("dia-extenso").textContent = "__";
        document.getElementById("mes-extenso").textContent = "______";
        document.getElementById("ano-extenso").textContent = "____";
      }
    });

    // Atualiza prazo -> calcula data final
    document.getElementById("prazo").addEventListener("input", function () {
      const texto = this.value.trim();
      const dias = parseInt(texto.replace(/\D/g, "")); // pega só o número
      const campoPrazo = document.getElementById("prazo-data");

      if (!isNaN(dias) && dataBase) {
        let prazoData = new Date(dataBase);
        prazoData.setDate(prazoData.getDate() + dias);
        const dia = String(prazoData.getDate()).padStart(2, "0");
        const mes = String(prazoData.getMonth() + 1).padStart(2, "0");
        const ano = prazoData.getFullYear();
        campoPrazo.textContent = `${dia}/${mes}/${ano}`;
      } else {
        campoPrazo.textContent = "__/__/____";
      }
    });