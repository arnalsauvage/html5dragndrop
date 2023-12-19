// select the item element
const item = document.querySelector('.item');
let derniereBoxCliquee = document.getElementById("box1").id;
let dernierItemClique;

console.log("Dernier cliqué = " + derniereBoxCliquee);

// attach the dragstart event handler
item.addEventListener('dragstart', dragStart);

// handle the dragstart
function dragStart(e) {
    console.log('drag starts...');
    e.dataTransfer.setData('text/plain', e.target.id);
    e.dataTransfer.effectAllowed = "move";
    derniereBoxCliquee = e.target.parentNode.id;
    dernierItemClique = e.target.id;
    console.log("Dernier cliqué = " + derniereBoxCliquee);
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
}

const boxes = document.querySelectorAll('.box');

boxes.forEach(box => {
    box.addEventListener('dragenter', dragEnter)
    box.addEventListener('dragover', dragOver);
    box.addEventListener('dragleave', dragLeave);
    box.addEventListener('drop', drop);
    box.addEventListener('dragend', dragEnd);
});

function dragEnter(e) {
    e.preventDefault(); // autoriser le dragEnter sur l'élément
    e.target.classList.add('drag-over');
}

function dragOver(e) {
    e.preventDefault(); // autoriser le dragOver sur l'élément
    e.target.classList.add('drag-over');
}

function dragLeave(e) {
    e.target.classList.remove('drag-over');
}

function drop(e) {
    e.target.classList.remove('drag-over');

    // get the draggable element
    const id = e.dataTransfer.getData('text/plain');
    console.log("Id : " + id);
    const draggable = document.getElementById(id);

    // add it to the drop target
    e.target.appendChild(draggable);

    // display the draggable element
    draggable.classList.remove('hide');
}

function dragEnd(e) {
    const monDropEffect = e.dataTransfer.dropEffect;
    console.debug("DragEnd est bien lancé ! monDropEffect = " + monDropEffect);
    if (monDropEffect === "none") {
        console.debug("le drop a échoué !");
        // on peut connaître la box d'origine : const boxOrigine = document.getElementById(derniereBoxCliquee);

        // display the draggable element
        const elementClique = document.getElementById(dernierItemClique);
        elementClique.classList.remove('hide');
    }
}