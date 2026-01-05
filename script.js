// Variável global para rastrear se as bibliotecas estão carregadas
let bibliotecasCarregadas = false;

// Função para verificar se as bibliotecas estão carregadas
function verificarBibliotecas() {
    if (typeof html2canvas !== 'undefined' && typeof window.jspdf !== 'undefined') {
        bibliotecasCarregadas = true;
        console.log('✅ Bibliotecas carregadas com sucesso!');
        return true;
    }
    return false;
}

// Esperar as bibliotecas carregarem (apenas se estiver na página do gerador que usa essas libs)
if (document.getElementById('preview')) {
    const verificador = setInterval(() => {
        if (verificarBibliotecas()) {
            clearInterval(verificador);
        }
    }, 100);
}

// Função para escapar HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Gera o HTML com os cantos pretos
function generateGabaritoHTML(headerText, numQuestions, numAlternatives) {
    const alternatives = ['A', 'B', 'C', 'D', 'E', 'F'].slice(0, numAlternatives);
    const questionsPerCol = Math.ceil(numQuestions / 3);

    let html = `
        <div class="gabarito-page">
            <div class="corner-square corner-top-left"></div>
            <div class="corner-square corner-top-right"></div>
            <div class="corner-square corner-bottom-left"></div>
            <div class="corner-square corner-bottom-right"></div>

            <div class="header-text">${escapeHtml(headerText)}</div>

            <div class="questions-container">
    `;

    for (let col = 0; col < 3; col++) {
        html += `<div class="gabarito-column">`;
        const start = (col * questionsPerCol) + 1;
        const end = Math.min((col + 1) * questionsPerCol, numQuestions);

        for (let q = start; q <= end; q++) {
            html += `
                <div class="question-row">
                    <div class="question-number">${q}</div>
                    <div class="alternatives">
            `;
            alternatives.forEach(alt => {
                html += `<div class="bubble">${alt}</div>`;
            });
            html += `</div></div>`;
        }

        // Preenche visualmente coluna vazia se necessário
        if (start > numQuestions) html += ``;

        html += `</div>`;
    }

    html += `
            </div>
            <div style="position: absolute; bottom: 12mm; right: 15mm; font-size: 10px; color: #aaa;">

            </div>
        </div>
    `;

    return html;
}

// Função para atualizar pré-visualização
function updatePreview() {
    const headerText = document.getElementById('headerText').value || 'GABARITO';
    const numQuestions = parseInt(document.getElementById('numQuestions').value) || 20;
    const numAlternatives = parseInt(document.getElementById('numAlternatives').value) || 4;

    const preview = document.getElementById('preview');
    if (preview) {
        preview.innerHTML = generateGabaritoHTML(headerText, numQuestions, numAlternatives);
    }
}

// Função para gerar PDF (Versão corrigida e única)
async function generatePDF() {
    const headerText = document.getElementById('headerText').value || 'GABARITO';
    const numQuestions = parseInt(document.getElementById('numQuestions').value) || 20;
    const numAlternatives = parseInt(document.getElementById('numAlternatives').value) || 4;

    // Verificar se as bibliotecas estão carregadas
    if (!bibliotecasCarregadas) {
        console.log('⏳ Aguardando bibliotecas carregarem...');

        // Tentar verificar novamente
        for (let i = 0; i < 50; i++) {
            await new Promise(resolve => setTimeout(resolve, 100));
            if (verificarBibliotecas()) {
                bibliotecasCarregadas = true;
                break;
            }
        }

        if (!bibliotecasCarregadas) {
            alert('❌ Bibliotecas não carregaram.  Tente recarregar a página (F5).');
            return;
        }
    }

    try {
        // Mostrar feedback ao usuário
        const botao = event.target;
        botao.textContent = '⏳ Gerando PDF...';
        botao.disabled = true;

        // Criar elemento temporário
        const element = document.createElement('div');
        element.innerHTML = generateGabaritoHTML(headerText, numQuestions, numAlternatives);
        element.style.position = 'absolute';
        element.style.left = '-9999px';
        element.style.width = '210mm';
        document.body.appendChild(element);

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        // Pegar todas as páginas do gabarito
        const pages = element.querySelectorAll('.gabarito-page');

        for (let i = 0; i < pages.length; i++) {
            if (i > 0) {
                pdf.addPage();
            }

            // Converter página para canvas
            const canvas = await html2canvas(pages[i], {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff'
            });

            // Adicionar ao PDF
            const imgData = canvas.toDataURL('image/png');
            const pageHeight = pdf.internal.pageSize.getHeight();
            const pageWidth = pdf.internal.pageSize.getWidth();

            pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
        }

        // Salvar PDF
        const data = new Date();
        const dataBr = data.toLocaleDateString('pt-BR').replace(/\//g, '-');
        const nomeArquivo = `gabarito_${dataBr}.pdf`;

        pdf.save(nomeArquivo);

        // Remover elemento temporário
        document.body.removeChild(element);

        // Restaurar botão
        botao.textContent = '📥 Gerar e Baixar PDF';
        botao.disabled = false;

        console.log('✅ PDF gerado com sucesso!');
        alert('✅ PDF gerado e baixado com sucesso!');

    } catch (error) {
        console.error('❌ Erro ao gerar PDF:', error);
        alert('❌ Erro ao gerar PDF.  Verifique o console (F12 > Console).');

        // Restaurar botão em caso de erro
        const botao = event.target;
        botao.textContent = '📥 Gerar e Baixar PDF';
        botao.disabled = false;
    }
}

// Inicialização apenas se estiver na página do gerador
if (document.getElementById('headerText')) {
    // Atualizar pré-visualização quando inputs mudam
    document.getElementById('headerText').addEventListener('input', updatePreview);
    document.getElementById('numQuestions').addEventListener('change', updatePreview);
    document.getElementById('numAlternatives').addEventListener('change', updatePreview);

    // Atualizar pré-visualização ao carregar
    window.addEventListener('load', function() {
        console.log('📄 Aplicação carregada...');
        updatePreview();

        // Verificar bibliotecas após 1 segundo
        setTimeout(() => {
            if (verificarBibliotecas()) {
                console.log('✅ Sistema pronto para gerar PDFs!');
            } else {
                console.warn('⚠️  Bibliotecas ainda não carregadas, mas continuando...');
            }
        }, 1000);
    });
}
