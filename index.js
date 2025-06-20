
// const numberInput = document.getElementById('numberInput');
// const calculateBtn = document.getElementById('calculateBtn');
// const resultParagraph = document.getElementById('result');


// calculateBtn.addEventListener('click', function () {

//     const inputNumber = parseInt(numberInput.value);

//     if (isNaN(inputNumber)) {
//         resultParagraph.textContent = "Please enter a valid number.";
//         return;
//     }


//     if (inputNumber === 0) {
//         resultParagraph.textContent = "The factorial of 0 is 1.";
//         return;
//     }


//     let factorial = 1;
//     for (let i = 1; i <= inputNumber; i++) {
//         factorial = factorial * i;
//     }


//     resultParagraph.textContent = "The factorial of " + inputNumber + " is " + factorial + ".";
// });



// --- DOM Element Selection ---
        const numberInput = document.getElementById('numberInput');
        const loopBtn = document.getElementById('loopBtn');
        const reduceBtn = document.getElementById('reduceBtn');
        const resultContainer = document.getElementById('resultContainer');
        
        // --- Event Listeners ---
        loopBtn.addEventListener('click', () => calculateFactorial('loop'));
        reduceBtn.addEventListener('click', () => calculateFactorial('reduce'));
        numberInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                calculateFactorial('loop'); // Default to loop on Enter key
            }
        });


        /**
         * Main calculation handler
         * @param {string} method - The calculation method ('loop' or 'reduce')
         */
        function calculateFactorial(method) {
            const num = parseInt(numberInput.value, 10);
            
            // --- Input Validation ---
            if (isNaN(num)) {
                displayResult('error', 'Please enter a valid number.');
                return;
            }
            if (num < 0) {
                displayResult('error', 'Factorial is not defined for negative numbers.');
                return;
            }
            if (num > 20) {
                // Factorials get extremely large. BigInt is needed beyond 20.
                displayResult('error', 'Please enter a number ≤ 20 for standard JavaScript precision.');
                return;
            }

            let result;
            try {
                if (method === 'loop') {
                    result = factorialWithLoop(num);
                } else {
                    result = factorialWithReduce(num);
                }
                displayResult('success', result, num);
            } catch (e) {
                displayResult('error', e.message);
            }
        }

        /**
         * Updates the UI to display the result or an error message.
         * @param {string} type - 'success' or 'error'
         * @param {BigInt|string} value - The result or error message.
         * @param {number} [originalNum] - The original number for generating the breakdown.
         */
        function displayResult(type, value, originalNum) {
            resultContainer.innerHTML = ''; // Clear previous content
            resultContainer.classList.remove('animate-result');
            void resultContainer.offsetWidth; // Trigger reflow to restart animation

            const wrapper = document.createElement('div');
            wrapper.className = 'animate-result';

            if (type === 'error') {
                wrapper.innerHTML = `<p class="text-red-400 font-semibold text-lg">${value}</p>`;
            } else {
                // Format with commas for readability
                const formattedResult = value.toLocaleString('en-US');
                const breakdown = generateBreakdown(originalNum);

                wrapper.innerHTML = `
                    <p class="text-gray-400 text-sm mb-1">Result for ${originalNum}!</p>
                    <p class="gradient-text font-black text-4xl md:text-5xl tracking-tighter">${formattedResult}</p>
                    <p class="text-gray-500 text-xs mt-2 break-all">${breakdown}</p>
                `;
            }

            resultContainer.appendChild(wrapper);
            resultContainer.classList.add('animate-result');
        }
        
        /**
         * Generates the calculation breakdown string (e.g., 6! = 6 x 5 x ...)
         * @param {number} n - The number.
         * @returns {string} The formatted breakdown string.
         */
        function generateBreakdown(n) {
            if (n === 0 || n === 1) return `${n}! = ${n}`;
            let str = `${n}! = `;
            for(let i = n; i > 0; i--) {
                str += i + (i === 1 ? '' : ' &times; ');
            }
            return str;
        }

        /**
         * Calculates factorial using a for loop. Using BigInt for large numbers.
         * @param {number} n
         * @returns {BigInt}
         */
        function factorialWithLoop(n) {
            if (n === 0) return 1n; // Use 'n' for BigInt literals
            let result = 1n;
            for (let i = BigInt(n); i > 0; i--) {
                result *= i;
            }
            return result;
        }

        /**
         * Calculates factorial using Array.reduce(). Using BigInt for large numbers.
         * @param {number} n
         * @returns {BigInt}
         */
        function factorialWithReduce(n) {
            if (n === 0) return 1n;
            const numberArray = Array.from({ length: n }, (_, i) => BigInt(i + 1));
            return numberArray.reduce((acc, val) => acc * val, 1n);
        }