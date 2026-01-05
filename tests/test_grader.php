<?php

require_once __DIR__ . '/../api/ExamGrader.php';

echo "Iniciando testes do ExamGrader...\n\n";

$grader = new ExamGrader();

// Teste 1: Tudo certo
$gabarito1 = [1 => 'A', 2 => 'B', 3 => 'C'];
$respostas1 = [1 => 'A', 2 => 'B', 3 => 'C'];
$result1 = $grader->grade($gabarito1, $respostas1, 3);

assert($result1['score'] == 10);
assert($result1['correct_count'] == 3);
echo "Teste 1 (Tudo Certo): Passou\n";

// Teste 2: Tudo errado
$respostas2 = [1 => 'B', 2 => 'C', 3 => 'D'];
$result2 = $grader->grade($gabarito1, $respostas2, 3);
assert($result2['score'] == 0);
assert($result2['correct_count'] == 0);
echo "Teste 2 (Tudo Errado): Passou\n";

// Teste 3: Parcial e Case Insensitive
$respostas3 = [1 => 'a', 2 => 'c', 3 => 'C']; // 1 e 3 certos
$result3 = $grader->grade($gabarito1, $respostas3, 3);
assert(abs($result3['score'] - 6.66) < 0.1);
assert($result3['correct_count'] == 2);
echo "Teste 3 (Parcial/Case): Passou\n";

// Teste 4: Questões faltantes no aluno
$respostas4 = [1 => 'A']; // Faltam 2 e 3
$result4 = $grader->grade($gabarito1, $respostas4, 3);
assert($result4['correct_count'] == 1);
assert($result4['wrong_count'] == 2);
echo "Teste 4 (Incompleto): Passou\n";

echo "\nTodos os testes passaram!\n";
