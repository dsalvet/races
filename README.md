# 🏃 My Running Races

A lightweight, single-page overview of all my running races — past results and upcoming events.

## Features

- **Upcoming races** — displayed as cards with date, location, distance, price and target time
- **Apple Calendar export** — click an upcoming race date to download an `.ics` file for Apple Calendar
- **Past race results** — sortable table showing:
  - Chip time (net) and gun time (gross)
  - Target time and how the actual result compared (faster / slower)
  - Distance, date, price, finish position
  - Short notes per race
- **Stats bar** — total races, total distance, goals met, total entry fees

## How to use

1. Open `index.html` in any browser (no build step required).
2. Edit **`data.js`** to add, remove or update races:
   - `racesData.upcoming` — races that haven't happened yet
   - `racesData.past` — completed races with results
3. The page re-renders automatically on every load.
4. Click an upcoming race date to download an `.ics` file for that race.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Main page — layout & rendering logic |
| `data.js` | Race data (upcoming + past) |
| `styles.css` | Styling |

## Race data fields

### Upcoming race
| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier |
| `name` | string | Race name |
| `date` | string | ISO date, e.g. `"2026-09-06"` |
| `location` | string | City / country |
| `distance` | number | Distance in km |
| `distanceLabel` | string | Human label, e.g. `"Half Marathon"` |
| `price` | number | Entry fee |
| `currency` | string | Currency code, e.g. `"CZK"` |
| `targetTime` | string | Goal time in `H:MM:SS` format |
| `startTime` | string | Optional local start time in `HH:MM` or `HH:MM:SS` for timed calendar events |
| `endTime` | string | Optional local end time in `HH:MM` or `HH:MM:SS` for timed calendar events |
| `url` | string | Race website (optional) |
| `notes` | string | Any notes (optional) |

If `startTime` is omitted, the calendar export creates an all-day event for that race date. Apple Calendar can import the downloaded `.ics` file directly.

### Past race (all upcoming fields plus)
| Field | Type | Description |
|-------|------|-------------|
| `chipTime` | string | Net (chip) time `H:MM:SS` |
| `gunTime` | string | Gross (gun) time `H:MM:SS` |
| `position` | number | Finish position in category / overall |
| `totalParticipants` | number | Total starters |
| `bib` | string | Bib number |
