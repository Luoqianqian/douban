const BASE_URL = 'http://localhost:5000/api';

export async function getScore(id) {
  const res = await fetch(`${BASE_URL}/score/${id}`);
  const json = await res.json();

  const length = json.length;
  const total = json.reduce((acc, cur) => acc + cur.score, 0);

  if(length) {
    return (total / length).toFixed(1);
  }
  return 0;
}

export async function getBookmarkByUser(user = '') {
  const res = await fetch(`${BASE_URL}/bookmark/${user}`);
  const json = await res.json();
  return json;
};