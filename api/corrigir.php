<?php

header('Content-Type: application/json');

// Habilitar exibição de erros para debug (em produção deve ser desativado)
ini_set('display_errors', 0);
error_reporting(E_ALL);

require_once 'ExamGrader.php';

try {
    // Verificar método HTTP
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Método não permitido. Use POST.');
    }

    // Ler input JSON
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (!$data) {
        throw new Exception('JSON inválido ou vazio.');
    }

    // Validar dados
    if (!isset($data['gabarito']) || !is_array($data['gabarito'])) {
        throw new Exception('Gabarito oficial não fornecido ou inválido.');
    }

    $officialKey = $data['gabarito'];
    $studentAnswers = isset($data['respostas']) && is_array($data['respostas']) ? $data['respostas'] : [];
    $totalQuestions = isset($data['total_questions']) ? intval($data['total_questions']) : 0;

    // Processar correção
    $grader = new ExamGrader();
    $result = $grader->grade($officialKey, $studentAnswers, $totalQuestions);

    echo json_encode($result);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'error' => $e->getMessage()
    ]);
}
