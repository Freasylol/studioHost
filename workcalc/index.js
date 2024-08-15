document.addEventListener('DOMContentLoaded', () => {
    // const result = document.getElementById('result');
    const output = document.querySelector('.output');
    const textarea = document.querySelector('.textarea');
    const standardBtn = document.querySelector('.standard-btn');
    const wordCountBlock = document.querySelector('.word-count');
    const symbCount = document.querySelector('.symb-count');
    const pageCount = document.querySelector('.page-count');
    const resetBtn = document.querySelector('.reset-button');
    // const radios = document.querySelectorAll('.')

    const radioButtons = document.querySelectorAll('.radio');

    const readingSpeedObject = {
        'slow': 120,
        'standard': 150,
        'fast': 180
    }

    let readingSpeed = 150;

    resetBtn.addEventListener('click', function(event) {
        textarea.value = '';
        standardBtn.checked = true;
        output.textContent = '0 сек.';
        wordCountBlock.textContent = '0 слов';
        symbCount.textContent = '0 знаков без пробела';
        pageCount.textContent = '0.00 A4, Times New Roman, 14pt';
    });
    

    radioButtons.forEach(radio => {
        radio.addEventListener('change', function (event) {
            console.log(event.target.value);
            if (event.target.checked) {
               
                readingSpeed = readingSpeedObject[event.target.value];
                const {readingTimeMinutes, readingTimeSeconds, symbolsCount, wordCount} = calculateIndicators();
                setDataToBlocks(readingTimeSeconds, symbolsCount, wordCount);
            }
        });
    });

    function countWords(text) {
        return text.trim().split(/\s+/).length;
    }

    function countSymbols(text) {
        return text.trim().length;
    }
    

    function calculateIndicators() {
        const text = textarea.value;
        const symbPerPage = 2580;
        const wordCount = countWords(text);
        console.log(wordCount);
        const symbolsCount = countSymbols(text);
        const pagesCount = Math.ceil((symbolsCount / 2580) * 100.0) / 100.0;
        const wordsPerMinute = readingSpeed;
        const readingTimeMinutes = wordCount / wordsPerMinute;
        const readingTimeSeconds = Math.ceil(readingTimeMinutes * 60);
        return {readingTimeSeconds: readingTimeSeconds, wordCount: wordCount, symbolsCount: symbolsCount, pagesCount: pagesCount};
    }

    function setDataToBlocks(readingTimeSeconds, wordCount, symbolsCount, pagesCount) {
        output.textContent = readingTimeSeconds + ' сек.';
        // console.log(wordCount);
        wordCountBlock.textContent = wordCount + ' слов';
        symbCount.textContent = symbolsCount + ' символов без пробелов';
        pageCount.textContent = pagesCount.toFixed(2) + ' A4, Times New Roman, 14pt';
    }

    textarea.addEventListener('input', function() {
        const {readingTimeSeconds, wordCount, symbolsCount, pagesCount} = calculateIndicators();
        setDataToBlocks(readingTimeSeconds,wordCount, symbolsCount, pagesCount);
    });
});
