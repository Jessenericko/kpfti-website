/* Ubah data profil dan password. */
(() => {
  if (!window.KP) return;
  const { auth, user, toast } = KP;
  const form = document.getElementById('profile-form');

  form.nim.value = user.nim;
  form.nama.value = user.nama;
  form.email.value = user.email;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const { nama, email, oldPassword, newPassword } = form;
    const fail = (input, message) => {
      input.classList.add('invalid');
      input.focus();
      toast(message, 'error');
    };

    if (!nama.value.trim()) return fail(nama, 'Nama wajib diisi.');
    if (!email.checkValidity()) return fail(email, 'Format email tidak valid.');
    if (oldPassword.value || newPassword.value) {
      if (oldPassword.value !== user.password) return fail(oldPassword, 'Password lama salah.');
      if (newPassword.value.length < 6) return fail(newPassword, 'Password baru minimal 6 karakter.');
    }

    auth.save({
      ...user,
      nama: nama.value.trim(),
      email: email.value.trim(),
      password: newPassword.value || user.password,
    });
    toast('Perubahan berhasil disimpan.', 'success');
    setTimeout(() => { location.href = 'dashboard.html'; }, 900);
  });

  form.addEventListener('input', (e) => e.target.classList.remove('invalid'));
})();
