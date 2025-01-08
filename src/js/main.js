document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.header-burger');
  const list = document.querySelector('.header-list');

  if (burger) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      list.classList.toggle('active');
    });
  }
});

let currentInput = null;
let isKeyboardVisible = false; 

document.querySelectorAll('input, textarea').forEach(input => {
  input.addEventListener('click', function () {
    currentInput = this;
    if (isKeyboardVisible) {
        openKeyboardForInput();
    }
  });
});

document.querySelectorAll('.virtual-block').forEach(element => {
  element.addEventListener('click', () => {
    isKeyboardVisible = true;
    if (currentInput) {
      openKeyboardForInput();
    }
  });
});

function openKeyboardForInput() {
  const keyboard = document.querySelector('.keyboard');

  if (currentInput) {
    const inputRect = currentInput.getBoundingClientRect();
    
    const keyboardHeight = keyboard?.offsetHeight; 
    const viewportHeight = window.innerHeight; 

    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;
    const x = inputRect.left + scrollX;
    const y = inputRect.top + scrollY;
    const heightInput = currentInput.offsetHeight;

    keyboard.style.left = `${x}px`;
    keyboard.style.top = `${y + heightInput}px`;
    keyboard.style.display = 'block'; 
    isKeyboardVisible = true; 
  }
}

document.addEventListener('click', (event) => {
  const keyboard = document.querySelector('.keyboard');
  const virtualBlocks = document.querySelectorAll('.virtual-block');
  const inputElements = document.querySelectorAll('input, textarea');


  const clickedOutside = 
    !keyboard.contains(event.target) && 
    !Array.from(virtualBlocks).some(block => block.contains(event.target)) && 
    !Array.from(inputElements).includes(event.target);

  if (clickedOutside) {
    keyboard.style.display = 'none';
    isKeyboardVisible = false;
  }
});
