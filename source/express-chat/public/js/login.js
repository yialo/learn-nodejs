const $form = document.querySelector('.login-form');

const $title = document.querySelector('h1');
const $username = $form.querySelector('[name="username"]');
const $password = $form.querySelector('[name="password"]');
const $submit = $form.querySelector('button');
const $error = $form.querySelector('.login-form__error');

const disableControls = () => {
  $username.disabled = true;
  $password.disabled = true;
  $submit.disabled = true;
  $submit.textContent = 'Загружаем...';
};

const enableControls = () => {
  $username.disabled = false;
  $password.disabled = false;
  $submit.disabled = false;
  $submit.textContent = 'Войти';
};

const send = async () => {
  const body = new FormData($form);

  try {
    const response = await window.fetch('/login', {
      method: 'POST',
      body,
    });

    if (response.status === 200) {
      $form.remove();
      $title.textContent = 'Вы вошли на сайт';

      setTimeout(() => {
        window.location.href = '/chat';
      }, 500);
    } else {
      const { status, message } = await response.json();
      throw new Error(`Ошибка ${status}: ${message}`);
    }
  } catch ({ message }) {
    $error.textContent = message;
    enableControls();
  }
};

$form.addEventListener('submit', (event) => {
  event.preventDefault();

  if ($username.value === '' || $password.value === '') {
    $error.textContent = 'Не все поля заполнены';
  } else {
    send();

    $error.textContent = '';
    disableControls();
  }
});
