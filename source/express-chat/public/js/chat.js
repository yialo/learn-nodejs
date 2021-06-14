const ALERT_DURATION = 3000;
const MAX_RECONNECT_ATTEMPT = 3;

const socket = io({
  reconnection: false,
});

const $room = document.querySelector('.chat-room');
const $status = $room.querySelector('.chat-room__status');
const $messageArea = $room.querySelector('.chat-room__message-area');
const $form = $room.querySelector('form');
const $text = $form.querySelector('input');
const $alert = $room.querySelector('.chat-room__alert');

const currentUserName = document.querySelector('.chat-room__username')?.textContent;

const createMessageList = () => {
  const $list = document.createElement('ul');
  $list.classList.add('chat-room__message-list');
  return $list;
};

const printStatus = (statusText) => {
  $status.textContent = statusText;
};

let isAlertVisible = false;

const showAlert = (message) => {
  isAlertVisible = true;
  $alert.textContent = message;
  $alert.classList.add('visible');

  setTimeout(() => {
    $alert.classList.remove('visible');
    $alert.addEventListener('transitionend', (event) => {
      if (event.propertyName === 'opacity' && isAlertVisible) {
        $alert.textContent = '';
        isAlertVisible = false;
      }
    }, { once: true });
  }, ALERT_DURATION);
};

const addMessageToList = (author, text) => {
  const $author = document.createElement('span');
  $author.classList.add('chat-room__message-author');
  $author.textContent = author;

  const $text = document.createElement('span');
  $text.classList.add('chat-room__message-text');
  $text.textContent = text;

  const $message = document.createElement('li');
  $message.classList.add('chat-room__message')
  $message.append($author, $text);

  let $list = $messageArea.querySelector('.chat-room__message-list');

  if ($list === null) {
    $list = createMessageList();
    $messageArea.replaceChild($list, $messageArea.firstElementChild);
  }

  $list.appendChild($message);

  $messageArea.scrollTo({
    top: $list.offsetHeight,
    behavior: 'smooth',
  });
};

const sendMessage = (event) => {
  event.preventDefault();

  const messageText = $text.value.trim();
  $text.value = '';

  if (!messageText) {
    return;
  }

  $text.disabled = true;

  socket.emit('message', messageText, () => {
    addMessageToList(currentUserName, messageText);

    $text.disabled = false;
    $text.focus();
  });
};

$form.addEventListener('submit', sendMessage);

let reconnectAttempt = 0;

const reconnect = () => {
  if (reconnectAttempt < MAX_RECONNECT_ATTEMPT) {
    reconnectAttempt++;
    printStatus('Устанавливаем соединение...');
    socket.once('connect_error', () => {
      setTimeout(reconnect, 500);
    });
    socket.connect();
  } else {
    printStatus('Восстановить соединение не удалось');
  }
};

$text.focus();

socket
  .on('connect', () => {
    $form.addEventListener('submit', sendMessage);
    $text.disabled = false;
    printStatus('Соединение установлено');
  })
  .on('disconnect', () => {
    $form.removeEventListener('submit', sendMessage);
    $text.disabled = true;
    printStatus('Соединение потеряно');
    reconnect();
  })
  .on('message', ({ author, text }) => {
    addMessageToList(author, text);
  })
  .on('join', (username) => {
    if (username !== currentUserName) {
      showAlert(`Пользователь ${username} подключился`);
    }
  })
  .on('leave', (username) => {
    if (username !== currentUserName) {
      showAlert(`Пользователь ${username} отключился`);
    }
  })
  .on('logout', () => {
    window.location = '/';
  })
  .on('error', () => {
    reconnect();
  });
