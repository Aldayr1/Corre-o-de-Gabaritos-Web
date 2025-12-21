# 📝 Gerador e Corretor de Gabaritos Web

![Status do Projeto](https://img.shields.io/badge/status-em_desenvolvimento-yellow)
![Licença](https://img.shields.io/badge/license-MIT-blue)
![Web](https://img.shields.io/badge/platform-web-green)

## 📖 Sobre o Projeto

Este projeto consiste em uma solução completa baseada inteiramente em **tecnologias web** para a **criação de folhas de resposta (gabaritos)** e a **correção automatizada** das mesmas. 

O objetivo é fornecer uma ferramenta leve, acessível via navegador e que não dependa de instalação de softwares complexos ou hardwares específicos (como leitoras ópticas dedicadas), ideal para professores, escolas e pequenos exames.

## ✨ Funcionalidades

* **Geração de Gabaritos:**
    * Configuração do número de questões e alternativas.
    * Personalização do cabeçalho (Nome da Instituição, Logo, Disciplina).
    * Exportação pronta para impressão (Layout responsivo/PDF).
* **Correção de Provas:**
    * Interface para lançamento das respostas dos alunos (ou upload).
    * Comparação automática com o gabarito oficial.
    * Cálculo imediato de nota e acertos.
* **Relatórios:**
    * Visualização simples de estatísticas de erros e acertos (Opcional/Futuro).

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando apenas padrões web:

* **HTML5** - Estruturação semântica.
* **CSS3** - Estilização e layout para impressão.
* **JavaScript (Vanilla)** - Lógica de geração dinâmica e correção no lado do cliente.
* **[Opcional: PHP/Python]** - Backend para processamento de dados (se aplicável).
* **[Opcional: Biblioteca PDF]** - (Ex: html2pdf ou jspdf).

## 📂 Estrutura de Pastas

```bash
/
├── assets/          # Imagens, logos e estilos CSS
├── js/              # Scripts de lógica (geração e correção)
├── index.html       # Página principal
├── gerador.html     # Página de criação do gabarito
├── corretor.html    # Página de inserção/correção
└── README.md
