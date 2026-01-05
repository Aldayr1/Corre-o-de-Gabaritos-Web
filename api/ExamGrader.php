<?php

class ExamGrader {

    /**
     * Corrige a prova comparando respostas com gabarito.
     *
     * @param array $officialKey Array associativo [numero_questao => letra_resposta]
     * @param array $studentAnswers Array associativo [numero_questao => letra_resposta]
     * @param int $totalQuestions Número total de questões esperadas (opcional, usa count do gabarito se não informado)
     * @return array Resultado detalhado
     */
    public function grade(array $officialKey, array $studentAnswers, int $totalQuestions = 0): array {
        if ($totalQuestions === 0) {
            $totalQuestions = count($officialKey);
        }

        $correctCount = 0;
        $wrongCount = 0;
        $details = [];

        // Garante que percorremos todas as questões esperadas
        for ($i = 1; $i <= $totalQuestions; $i++) {
            $expected = isset($officialKey[$i]) ? strtoupper($officialKey[$i]) : null;
            $given = isset($studentAnswers[$i]) ? strtoupper($studentAnswers[$i]) : null;

            // Se não houver gabarito para a questão, ignoramos ou tratamos como erro?
            // Vamos assumir que se não tem gabarito, não conta, mas aqui forçamos o loop pelo total.
            if ($expected === null) {
                // Questão anulada ou não configurada
                $isCorrect = false;
            } else {
                $isCorrect = ($expected === $given);
            }

            if ($isCorrect) {
                $correctCount++;
            } else {
                $wrongCount++;
            }

            $details[] = [
                'question' => $i,
                'correct' => $isCorrect,
                'expected' => $expected,
                'given' => $given
            ];
        }

        $score = ($totalQuestions > 0) ? ($correctCount / $totalQuestions) * 10 : 0;

        return [
            'score' => $score,
            'total_questions' => $totalQuestions,
            'correct_count' => $correctCount,
            'wrong_count' => $wrongCount,
            'details' => $details
        ];
    }
}
