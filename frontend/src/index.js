import './css/style.css'; 
import { interval, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { switchMap, map, catchError } from 'rxjs/operators';


const URL = 'http://localhost:3000/messages/unread';
const POLLING_INTERVAL = 4000;

function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(date.getHours())}:${pad(date.getMinutes())} ${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`;
}

function truncateSubject(subject) {
  if (!subject) return '';
  return subject.length > 15 ? subject.slice(0, 15) + '...' : subject;
}

const messages$ = interval(POLLING_INTERVAL).pipe(
  switchMap(() => 
    ajax.getJSON(URL).pipe(
      map(response => response.messages || []),
      catchError(() => of([])) 
    )
  ),
  map(messages => messages.map(msg => ({
    from: msg.from,
    subject: truncateSubject(msg.subject),
    received: formatDate(msg.received)
  })))
);

messages$.subscribe(newMessages => {
  if (newMessages.length === 0) return;

  const tableBody = document.getElementById('messages-list');
  if (!tableBody) return;

  newMessages.forEach(msg => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="cell-from">${msg.from}</td>
      <td class="cell-subject">${msg.subject}</td>
      <td class="cell-date">${msg.received}</td>
    `;
    tableBody.appendChild(row);
  });
});

