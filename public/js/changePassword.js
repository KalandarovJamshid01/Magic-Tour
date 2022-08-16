const changePass = async (oldPassword, newPassword, newConfirmPassword) => {
  try {
    const data = await axios({
      url: 'http://localhost:8000/api/v1/users/updateMePassword',
      method: 'PATCH',
      data: {
        oldPassword: oldPassword,
        newPassword: newPassword,
        newPasswordConfirm: newConfirmPassword,
      },
    });
    if (data.status === 200) {
      alert('Your password has been updated');
    } else {
      alert('Something went wrong!');
    }
  } catch (err) {
    console.log(err.response.message);
  }
};

document
  .querySelector('.form-user-settings')
  .addEventListener('submit', (e) => {
    e.preventDefault();

    const oldPass = document.querySelector('#password-current').value;
    const newPass = document.querySelector('#password').value;
    const confirmNewPass = document.querySelector('#password-confirm').value;
    console.log(oldPass, newPass, confirmNewPass);
    changePass(oldPass, newPass, confirmNewPass);
  });
