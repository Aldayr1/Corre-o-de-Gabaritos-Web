# 📝 Sistema Integrado de Avaliações (Gerador e Corretor)

![Status do Projeto](https://img.shields.io/badge/status-pronto-green)
![Licença](https://img.shields.io/badge/license-MIT-blue)
![Backend](https://img.shields.io/badge/backend-PHP-purple)

## 📖 Sobre o Projeto

Este projeto é uma solução web completa para **geração de folhas de resposta (gabaritos)** e **correção automatizada de provas**. Ideal para professores e instituições de ensino que desejam agilidade sem depender de leitores ópticos caros.

O sistema é dividido em dois módulos principais:
1.  **Gerador**: Cria arquivos PDF prontos para impressão.
2.  **Corretor**: Interface para lançamento de gabaritos e correção automática via backend.

## ✨ Funcionalidades

### 🖨️ Gerador de Gabaritos
* Personalização completa do cabeçalho.
* Configuração flexível (até 100 questões, 2 a 6 alternativas).
* Geração de PDF em alta qualidade (A4).
* Layout otimizado para impressão e economia de tinta.

### ✅ Corretor Automático
* Interface intuitiva para definição do Gabarito Oficial.
* Lançamento rápido das respostas dos alunos.
* **Backend em PHP** para processamento seguro e preciso.
* Relatório imediato com:
    * Nota calculada (0-10).
    * Total de acertos/erros.
    * Detalhamento questão por questão.

## 🚀 Tecnologias Utilizadas

* **Frontend**: HTML5, CSS3, JavaScript (Vanilla).
* **Backend**: PHP (>= 7.0).
* **Bibliotecas**: `jspdf` e `html2canvas` (Geração de PDF).

## 📂 Estrutura de Pastas

```bash
/
├── api/
│   ├── ExamGrader.php   # Classe com lógica de correção
│   └── corrigir.php     # Endpoint da API
├── tests/
│   └── test_grader.php  # Testes unitários do backend
├── index.html           # Menu Principal
├── gerador.html         # Módulo Gerador (Frontend)
├── corretor.html        # Módulo Corretor (Frontend)
├── script.js            # Lógica do Gerador
├── style.css            # Estilos globais
└── README.md
```

## 🛠️ Como Usar

### Pré-requisitos
* Um servidor web com suporte a PHP (Apache, Nginx, ou PHP Built-in Server).

### Instalação e Execução
1. Clone o repositório.
2. Inicie o servidor PHP na raiz do projeto:
   ```bash
   php -S localhost:8000
   ```
3. Acesse `http://localhost:8000` no seu navegador.

### Passo a Passo
1. **Para Gerar Provas**: Clique em "Gerador de Gabaritos", configure a prova e baixe o PDF.
2. **Para Corrigir**:
    * Clique em "Corretor Automático".
    * Defina o número de questões.
    * Preencha o Gabarito Oficial.
    * Preencha as respostas do aluno.
    * Clique em "Calcular Nota" para ver o resultado.
