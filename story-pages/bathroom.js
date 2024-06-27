document.addEventListener('DOMContentLoaded', (event) => {
    const texts = ["You've ruined everything.", "What are you talking about?", "You think I haven't noticed?"];
    const typedText = document.getElementById('typedText');
    const blackScreen = document.getElementById('blackScreen');
    const imageTextContainer = document.getElementById('imageTextContainer');
    const textContainer = document.getElementById('textContainer');
    const choices = document.getElementById('choices');
    const toggleButton = document.getElementById('toggleButton');
    let currentText = 0;
    let currentChar = 0;

    function type() {
        if (currentChar < texts[currentText].length) {
            typedText.innerHTML += texts[currentText].charAt(currentChar);
            currentChar++;
            setTimeout(type, 100);
        } else {
            setTimeout(() => {
                typedText.classList.add('text-hidden');
                currentChar = 0;
                currentText++;
                if (currentText < texts.length) {
                    setTimeout(() => {
                        typedText.innerHTML = '';
                        typedText.classList.remove('text-hidden');
                        type();
                    }, 1000);
                } else {
                    setTimeout(() => {
                        blackScreen.classList.add('hidden');
                        imageTextContainer.style.opacity = '1';
                        choices.style.opacity = '1';
                        toggleButton.style.opacity = '1';
                        document.body.style.overflow = 'auto';  // Allow scrolling again
                    }, 1000);
                }
            }, 1000);
        }
    }

    type();

    toggleButton.addEventListener('click', () => {
        const isHidden = textContainer.style.opacity === '0';
        textContainer.style.opacity = isHidden ? '1' : '0';
        choices.style.opacity = isHidden ? '1' : '0';
    });
});
