document
  .querySelector('.nav__el--logout')
  .addEventListener('click', async () => {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:8000/api/v1/users/logout',
    });
    if (res.status === 200) {
      alert('You logout website');
      window.setTimeout(() => {
        location.reload(true);
      }, 1000);
    } else {
      alert('You have error and not logout!');
    }
  });
