'use strict';

const $form = document.getElementById('publisher');
const $field = $form.elements.message;
const $list = document.getElementById('messages');

$form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const xhr = new XMLHttpRequest();

  xhr.open('POST', '/publish');
  xhr.send(JSON.stringify({ message: $field.value }));

  $field.value = '';
  return false;
});

const TIMEOUT = 500;

const subscribe = () => {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    const $listItem = document.createElement('li');
    $listItem.classList.add('text-item', 'list__item');
    $listItem.textContent = xhr.responseText;

    $list.appendChild($listItem);

    subscribe();
  });

  const resend = () => {
    setTimeout(subscribe, TIMEOUT);
  };

  xhr.addEventListener('error', resend);
  xhr.addEventListener('abort', resend);

  xhr.open('GET', '/subscribe');
  xhr.send();
};

subscribe();
