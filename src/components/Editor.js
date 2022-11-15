import { isNew, setDocumentTitle } from '../utils/helper.js';
import { UNTITLED } from '../utils/constants.js';

export default function Editor({
  $target,
  initialState = { title: '', content: '' },
  onEditing,
}) {
  isNew(new.target);

  const $editor = document.createElement('div');
  $editor.className = 'editor';

  $editor.innerHTML = `
      <input type="text" name="title" class="title" placeholder="${UNTITLED}"/>
      <textarea name="content" class="content" placeholder="내용을 입력하세요."></textarea>
  `;

  $target.appendChild($editor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  this.render = () => {
    const { title, content } = this.state;

    $editor.querySelector('[name=title]').value = title;
    $editor.querySelector('[name=content]').value = content;

    setDocumentTitle(title);
  };

  this.render();

  $editor.addEventListener('keyup', (e) => {
    const { target } = e;

    const name = target.getAttribute('name');

    if (this.state[name] !== undefined) {
      const nextState = { ...this.state, [name]: target.value };

      this.setState(nextState);
      onEditing(this.state);
    }
  });
}
