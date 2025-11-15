
import { EventEmitter } from 'events';

const notifier = new EventEmitter();

// Listeners
notifier.on('userLoggedIn', (name) => {
  console.log(`User ${name} logged in.`);
});

notifier.on('userLoggedOut', (name) => {
  console.log(`User ${name} logged out.`);
});

notifier.on('sessionExpired', (name) => {
  console.log(`Session expired for ${name}.`);
});

// Emit events
notifier.emit('userLoggedIn', 'John');
notifier.emit('userLoggedOut', 'John');

// Bonus: Emit after 5 seconds
setTimeout(() => {
  notifier.emit('sessionExpired', 'John');
}, 5000);
