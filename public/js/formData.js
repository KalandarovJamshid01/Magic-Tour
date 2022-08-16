const formData = async (name, email, photo) => {
  try {
    const data = await axios({
      url: 'http://localhost:8000/api/v1/users/updateMeData',
      method: 'PATCH',
      data: {
        name: name,
        email: email,
        photo: photo,
      },
    });
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

document.querySelector('.form-user-data').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const photo = document.querySelector('#photo').files[0];
  console.log(name, email, photo);
  formData(name, email, photo);
});
