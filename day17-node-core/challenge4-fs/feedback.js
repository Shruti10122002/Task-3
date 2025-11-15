
import { writeFile, readFile } from 'fs/promises';

const feedback = 'Node.js is awesome!';

async function saveAndRead() {
  try {
    await writeFile('feedback.txt', feedback);
    console.log('Data written successfully.');

    console.log('Reading file...');
    const data = await readFile('feedback.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

saveAndRead();
