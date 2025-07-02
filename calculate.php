<?php
header('Content-Type: application/json');

// Validate and sanitize input
function sanitizeInput($value) {
    return filter_var($value, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

$num1 = sanitizeInput($data['num1']);
$num2 = sanitizeInput($data['num2']);
$operation = $data['operation'];

$result = 0;
$error = null;

// Perform calculation
try {
    switch ($operation) {
        case 'add':
            $result = $num1 + $num2;
            break;
        case 'subtract':
            $result = $num1 - $num2;
            break;
        case 'multiply':
            $result = $num1 * $num2;
            break;
        case 'divide':
            if ($num2 == 0) {
                throw new Exception('Division by zero');
            }
            $result = $num1 / $num2;
            break;
        case 'percentage':
            $result = $num1 / 100;
            break;
        default:
            throw new Exception('Invalid operation');
    }

    // Format the result to handle floating point precision
    $result = number_format($result, 10, '.', '');
    // Remove trailing zeros after decimal point
    $result = rtrim(rtrim($result, '0'), '.');

    echo json_encode([
        'result' => $result,
        'error' => null
    ]);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'result' => null,
        'error' => $e->getMessage()
    ]);
}