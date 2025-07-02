<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>iOS Style Calculator</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="calculator">
        <div class="display">
            <div class="previous-operand"></div>
            <div class="current-operand">0</div>
        </div>
        <div class="keypad">
            <button class="operator" data-action="clear">AC</button>
            <button class="operator" data-action="plusMinus">±</button>
            <button class="operator" data-action="percentage">%</button>
            <button class="operator" data-action="divide">÷</button>
            
            <button class="number">7</button>
            <button class="number">8</button>
            <button class="number">9</button>
            <button class="operator" data-action="multiply">×</button>
            
            <button class="number">4</button>
            <button class="number">5</button>
            <button class="number">6</button>
            <button class="operator" data-action="subtract">−</button>
            
            <button class="number">1</button>
            <button class="number">2</button>
            <button class="number">3</button>
            <button class="operator" data-action="add">+</button>
            
            <button class="number zero">0</button>
            <button class="number">.</button>
            <button class="operator" data-action="equals">=</button>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.1/gsap.min.js"></script>
    <script src="js/calculator.js"></script>
</body>
</html>