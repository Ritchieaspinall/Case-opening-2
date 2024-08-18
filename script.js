function generateMoneyValues(min, max, count) {
    let values = [];
    while (values.length < count) {
        let value = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!values.includes(value)) {
            values.push(value);
        }
    }
    return values;
}

function populateRoulette() {
    const roulette = document.querySelector('.roulette');
    const moneyValues = generateMoneyValues(1, 10000, 10);

    moneyValues.forEach(value => {
        const item = document.createElement('div');
        item.className = 'item';
        item.textContent = `$${value.toLocaleString()}`;
        roulette.appendChild(item);
    });
}

function startRoulette() {
    const roulette = document.querySelector('.roulette');
    const items = document.querySelectorAll('.item');
    const spinSound = document.getElementById('spin-sound');
    const winSound = document.getElementById('win-sound');
    const totalItems = items.length;

    const selectedIndex = Math.floor(Math.random() * totalItems);

    const itemWidth = items[0].offsetWidth + 10;
    const offset = -(itemWidth * selectedIndex) + (rouletteContainerWidth() / 2 - itemWidth / 2);

    spinSound.play();

    roulette.style.transition = 'transform 3s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
    roulette.style.transform = `translateX(-${itemWidth * totalItems * 3 + offset}px)`;

    setTimeout(() => {
        spinSound.pause();
        spinSound.currentTime = 0;

        winSound.play();

        setTimeout(() => {
            alert(`You won $${items[selectedIndex].textContent}!`);
        }, 1000);
    }, 3000);
}

function rouletteContainerWidth() {
    return document.querySelector('.roulette-container').offsetWidth;
}

window.onload = populateRoulette;
