const sendData = async (name, email) => {
  try {
    const data = await axios({
      method: 'PATCH',
      url: 'http://localhost:8000/api/v1/users/updateMe',
      data: {
        name,
        email,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

document.querySelector('.form-user-data').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.querySelector('#email').value;
  const name = document.querySelector('#name').value;
  sendData(name, email);
});
