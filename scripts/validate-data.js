const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dataPath = path.join(__dirname, '..', 'data.js');
const source = fs.readFileSync(dataPath, 'utf8');
const racesData = vm.runInNewContext(`${source}\n; racesData`);

if (!Array.isArray(racesData.upcoming) || !Array.isArray(racesData.past)) {
  throw new Error('data.js must export upcoming and past race arrays.');
}

const raceIds = new Set();
const races = [...racesData.upcoming, ...racesData.past];

for (const race of races) {
  if (!race.id || !race.name || !race.date || !race.location || !Number.isFinite(race.distance)) {
    throw new Error(`Race ${race.id || race.name || '(unknown)'} is missing required data.`);
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(race.date)) {
    throw new Error(`Race ${race.id} has an invalid date: ${race.date}`);
  }

  if (raceIds.has(race.id)) throw new Error(`Duplicate race id: ${race.id}`);
  raceIds.add(race.id);

  for (const photo of race.photos || []) {
    const sourcePath = typeof photo === 'string' ? photo : photo.src;
    if (typeof sourcePath !== 'string' || !sourcePath.startsWith('photos/')) {
      throw new Error(`Race ${race.id} has an invalid photo path.`);
    }

    const parts = sourcePath.split('/');
    if (parts.length !== 3 || parts.some(part => !part || part === '.' || part === '..')) {
      throw new Error(`Race ${race.id} photo must use photos/<event-slug>/<file-name>: ${sourcePath}`);
    }

    if (!fs.existsSync(path.join(__dirname, '..', sourcePath))) {
      throw new Error(`Race ${race.id} references a missing photo: ${sourcePath}`);
    }
  }
}

console.log(`Validated ${races.length} races and ${races.reduce((count, race) => count + (race.photos || []).length, 0)} photos.`);