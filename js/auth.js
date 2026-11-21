/* Login dan registrasi. */
(() => {
  if (!window.KP) return;
  const { auth, toast, openModal } = KP;

  // Tombol aktif (ungu) hanya saat semua isian valid, seperti tombol abu-abu di desain.
  const bindSubmitState = (form) => {
    const btn = form.querySelector('[type="submit"]');
    const sync = () => { btn.disabled = !form.checkValidity(); };
    form.addEventListener('input', sync);
    form.addEventListener('change', sync);
    sync();
  };

  const login = document.getElementById('login-form');
  if (login) {
    const nim = new URLSearchParams(location.search).get('nim');
    if (nim) login.nim.value = nim;
    bindSubmitState(login);

    login.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = login.nim.value.trim();
      const user = auth.users()[id];
      if (user && user.password !== login.password.value) {
        login.password.classList.add('invalid');
        return toast('Username atau password salah.', 'error');
      }
      // Akun belum terdaftar tetap boleh masuk sebagai akun demo agar responden bisa langsung mencoba.
      if (!user) auth.save({ nim: id, nama: id, email: '', jurusan: 'Teknik Informatika', password: login.password.value });
      auth.login(id);
      location.href = 'dashboard.html';
    });
    login.password.addEventListener('input', () => login.password.classList.remove('invalid'));
  }

  const register = document.getElementById('register-form');
  if (register) {
    bindSubmitState(register);

    register.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!register.checkValidity()) return register.reportValidity();
      const data = Object.fromEntries(new FormData(register));
      data.nim = data.nim.trim();
      data.nama = data.nama.trim();
      if (auth.users()[data.nim]) return openModal('register-failed');
      auth.save(data);
      toast('Akun berhasil dibuat. Silakan login.', 'success');
      setTimeout(() => { location.href = `login.html?nim=${encodeURIComponent(data.nim)}`; }, 900);
    });
  }
})();
