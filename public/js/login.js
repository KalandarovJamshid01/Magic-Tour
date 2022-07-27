const enterSystem = async (login, password) => {
  const res = axios.post('http://localhost:8000/api/v1/users/sigin', {
    data: {
      email: login,
      password: password,
    },
  });
  console.log(res);
};

document.querySelector('.form').addEvenListener('submit', (e) => {
  e.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  console.log(email);
  enterSystem(email, password);
});
