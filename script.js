const words = ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape", "Honeydew", "Ivy", "Jackfruit", 
               "Kiwi", "Lemon", "Mango", "Nectarine", "Orange", "Papaya", "Quince", "Raspberry", "Strawberry", "Tomato",
               "Ugli fruit", "Vanilla", "Watermelon", "Xigua", "Yam", "Zucchini"];

function generateCard() {
    const card = document.createElement('div');
    card.className = 'bingo-card';
    card.setAttribute('role', 'row');
    const shuffled = words.sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, 24); // Select 24 words

    selected.splice(12, 0, "Cooley"); // Insert "Cooley" in the middle

    selected.forEach((word, index) => {
        const cell = document.createElement('div');
        cell.classList.add('bingo-cell');
        cell.setAttribute('role', 'gridcell');
        if (word === "Cooley") {
            cell.classList.add('free-space', 'marked'); // Mark "Cooley" as a free space and pre-marked
        }
        cell.textContent = word;
        cell.onclick = function() { 
            this.classList.toggle('marked'); 
            checkBingo(this.parentElement);
        }; // Toggle rainbow gradient animation on click
        card.appendChild(cell);
    });
    return card;
}

function generateMultipleCards() {
    const numberOfCards = parseInt(document.getElementById('num-cards').value);
    const container = document.getElementById('bingo-container');
    container.innerHTML = ''; // Clear previous cards
    for (let i = 0; i < numberOfCards; i++) {
        const cardContainer = document.createElement('div');
        cardContainer.className = 'bingo-card-container';
        cardContainer.appendChild(generateCard());
        container.appendChild(cardContainer);
    }
}

function resetBingoCards() {
    document.getElementById('bingo-container').innerHTML = '';
}

function checkBingo(card) {
    const cells = card.querySelectorAll('.bingo-cell');
    const markedCells = Array.from(cells).filter(cell => cell.classList.contains('marked'));

    const isBingo = checkRows(cells) || checkColumns(cells) || checkDiagonals(cells);

    if (isBingo) {
        alert('Bingo!');
    }
}

function checkRows(cells) {
    for (let i = 0; i < 5; i++) {
        const row = cells.slice(i * 5, (i + 1) * 5);
        if (row.every(cell => cell.classList.contains('marked'))) {
            return true;
        }
    }
    return false;
}

function checkColumns(cells) {
    for (let i = 0; i < 5; i++) {
        const column = [cells[i], cells[i + 5], cells[i + 10], cells[i + 15], cells[i + 20]];
        if (column.every(cell => cell.classList.contains('marked'))) {
            return true;
        }
    }
    return false;
}

function checkDiagonals(cells) {
    const leftDiagonal = [cells[0], cells[6], cells[12], cells[18], cells[24]];
    const rightDiagonal = [cells[4], cells[8], cells[12], cells[16], cells[20]];

    return leftDiagonal.every(cell => cell.classList.contains('marked')) ||
           rightDiagonal.every(cell => cell.classList.contains('marked'));
}

// Initially generate one card
generateMultipleCards();
