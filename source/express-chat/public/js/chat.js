const MAX_RECONNECT_ATTEMPT = 3;

const socket = io({
  reconnection: false,
});

const $room = document.querySelector('.chat-room');
const $status = $room.querySelector('.chat-room__status');
const $messageArea = $room.querySelector('.chat-room__message-area');
const $form = $room.querySelector('form');
const $text = $form.querySelector('input');

const createMessageList = () => {
  const $list = document.createElement('ul');
  $list.classList.add('chat-room__message-list');
  return $list;
};

const printStatus = (statusText) => {
  $status.textContent = statusText;
};

const addMessageToList = (messageText) => {
  const $message = document.createElement('li');
  $message.textContent = messageText;

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

  $text.disabled = true;

  const messageText = $text.value;

  socket.emit('message', messageText, () => {
    addMessageToList(messageText);

    $text.disabled = false;
    $text.focus();
  });

  $text.value = '';
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
    alert('Соединение потеряно навсегда:(');
  }
};

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
  .on('message', addMessageToList);
