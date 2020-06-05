let start = '12:00 AM';
let end = '12:00 AMx';

function formatTime(str) {
  const [time, ampm] = str.split(' ');
  const [hr, min] = time.split(':');
  const h = parseInt(hr);

  const hh =
    h === 12
      ? ampm === 'AMx'
        ? 24
        : ampm === 'AM'
        ? 0
        : h
      : ampm === 'AM'
      ? h
      : ampm === 'PM'
      ? h + 12
      : h + 24;

  return hh * 60 + parseInt(min);
}

let e = formatTime(end);
let s = formatTime(start);
let diff = e - s;

console.log({
  end: e,
  start: s,
  diff,
});
