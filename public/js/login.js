const enterSystem = async (email, password) => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/v1/users/signin',
      data: {
        email: email,
        password: password,
      },
    });
    console.log(res);
    if (res.status === 200) {
      alert('You have entered System Succesful ');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (err) {
    console.log(`error:${err}`);
  }
};

document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  console.log(email, password);
  enterSystem(email, password);
});
