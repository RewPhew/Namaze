const changeTimingButton = document.getElementById('change-timing');
const timingParagraphs = document.querySelectorAll('.timing-container p');
const rakatContainer = document.querySelector('.rakat-container');

function toggleEditMode() {
  if (changeTimingButton.textContent === 'Update') {
    changeTimingButton.textContent = 'Save';
    timingParagraphs.forEach(paragraph => {
      paragraph.style.display = 'none';
      const [preText, postText] = paragraph.textContent.split(' : ');
      const input = document.createElement('input');
      input.type = 'text';
      input.value = postText.trim();
      input.placeholder = `Set ${preText.charAt(0).toUpperCase() + preText.slice(1)}`;
      input.autocomplete = 'off';
      input.spellcheck = false;
      paragraph.parentNode.insertBefore(input, paragraph.nextSibling);
    });
  } else {
    changeTimingButton.textContent = 'Update';
    timingParagraphs.forEach(paragraph => {
      const input = paragraph.nextElementSibling;
      const inputValue = input.value;
      paragraph.textContent = `${paragraph.textContent.split(' : ')[0]} : ${inputValue}`;
      localStorage.setItem(paragraph.id, inputValue);
      input.parentNode.removeChild(input);
      paragraph.style.display = 'block';
    });
  }
}

changeTimingButton.addEventListener('click', toggleEditMode);

window.addEventListener('load', () => {
  timingParagraphs.forEach(paragraph => {
    const [preText, postText] = paragraph.textContent.split(' : ');
    const savedValue = localStorage.getItem(paragraph.id);
    paragraph.textContent = `${preText} : ${savedValue || postText.trim()}`;
  });
});
