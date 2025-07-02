<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>iOS Style Calculator</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="theme-toggle" id="theme-toggle">
        <svg class="sun-icon" viewBox="0 0 24 24">
            <path d="M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3zm0-2V3M12 21v-4M4.22 19.78l2.83-2.83M19.78 19.78l-2.83-2.83M3 12h4M21 12h-4M4.22 4.22l2.83 2.83M19.78 4.22l-2.83 2.83"/>
        </svg>
        <svg class="moon-icon" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
    </div>

    <div class="calculator">
        <div class="calculator-3d"></div>
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
    <script src="dist/main.js" type="module"></script>
</body>
</html>