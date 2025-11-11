document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = e.target.username.value;
  const password = e.target.password.value;

  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  alert(await res.json().then(d => d.message));
});

document.getElementById('getProfile').addEventListener('click', async () => {
  const res = await fetch('/api/meu-perfil');
  const data = await res.json();

  if (res.ok) {
    document.getElementById('profileData').textContent = 
      JSON.stringify(data, null, 2);
  } else {
    document.getElementById('profileData').textContent = 
      `Erro: ${data.message}`;
  }
});