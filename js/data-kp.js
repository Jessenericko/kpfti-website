/* Data KP: pendaftaran, unggah dokumen, laporan akhir, abstrak, dan program. */
(() => {
  if (!window.KP) return;
  const { store, user, toast } = KP;
  const key = `kp.${user.nim}`;
  const kp = store.get(key, { daftar: {}, files: {}, laporan: {}, abstrak: '' });
  const save = (message) => {
    store.set(key, kp);
    toast(message, 'success');
  };

  const fail = (input, message) => {
    input?.classList.add('invalid');
    input?.focus();
    toast(message, 'error');
  };
  document.addEventListener('input', (e) => e.target.classList?.remove('invalid'));

  /* ---------- File: pulihkan yang pernah diunggah ---------- */
  const boxes = Object.fromEntries([...document.querySelectorAll('.file')].map((b) => [b.dataset.key, b]));
  Object.entries(kp.files).forEach(([k, meta]) => boxes[k]?.set(meta));
  const saveFiles = (form, message) => {
    const picked = [...form.querySelectorAll('.file')].filter((b) => b.meta);
    if (!picked.length) return fail(null, 'Pilih minimal satu file terlebih dahulu.');
    picked.forEach((b) => { kp.files[b.dataset.key] = b.meta; });
    save(message);
  };
  // File yang dihapus pengguna ikut dihapus dari data tersimpan.
  document.addEventListener('filechange', (e) => {
    if (!e.target.meta && kp.files[e.target.dataset.key]) {
      delete kp.files[e.target.dataset.key];
      store.set(key, kp);
    }
  });

  /* ---------- Pendaftaran KP ---------- */
  const daftar = document.getElementById('kp-form');
  document.getElementById('company-list').append(...COMPANIES.map((c) => new Option(c.nama)));
  ['judul', 'tempat', 'alamat', 'kontak'].forEach((n) => { daftar[n].value = kp.daftar[n] ?? ''; });

  daftar.tempat.addEventListener('input', () => {
    const company = COMPANIES.find((c) => c.nama === daftar.tempat.value);
    if (!company) return;
    daftar.alamat.value = company.alamat;
    daftar.kontak.value = company.kontak.replace('\n', ' ');
  });

  daftar.addEventListener('submit', (e) => {
    e.preventDefault();
    const empty = [...daftar.elements].find((el) => el.required && !el.value.trim());
    if (empty) return fail(empty, `${daftar.querySelector(`label[for="${empty.id}"]`).textContent} wajib diisi.`);
    kp.daftar = Object.fromEntries(new FormData(daftar));
    save('Data KP berhasil disimpan.');
  });

  document.getElementById('dokumen-form').addEventListener('submit', (e) => {
    e.preventDefault();
    saveFiles(e.target, 'Dokumen berhasil diunggah.');
  });

  /* ---------- Laporan akhir ---------- */
  const laporan = document.getElementById('laporan-form');
  if (!kp.laporan.password) {
    // Kata sandi acak 12 karakter, dibuat sekali lalu disimpan.
    const chars = 'abcdefghjkmnpqrstuvwxyz23456789';
    kp.laporan.password = Array.from(crypto.getRandomValues(new Uint8Array(12)), (n) => chars[n % chars.length]).join('');
    store.set(key, kp);
  }
  laporan.password.value = kp.laporan.password;
  laporan.halaman.value = kp.laporan.halaman ?? '';
  laporan.lampiran.value = kp.laporan.lampiran ?? '';

  laporan.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!boxes.laporan.meta) return fail(null, 'Pilih file laporan akhir (PDF).');
    if (!laporan.halaman.checkValidity() || !laporan.halaman.value) return fail(laporan.halaman, 'Isi jumlah halaman dengan benar.');
    if (!laporan.lampiran.checkValidity() || !laporan.lampiran.value) return fail(laporan.lampiran, 'Isi jumlah lampiran dengan benar.');
    kp.files.laporan = boxes.laporan.meta;
    Object.assign(kp.laporan, { halaman: laporan.halaman.value, lampiran: laporan.lampiran.value });
    save('Laporan akhir berhasil diunggah.');
  });

  /* ---------- Abstrak ---------- */
  const abstrak = document.getElementById('abstrak-form');
  const count = document.getElementById('abstrak-count');
  const words = () => abstrak.abstrak.value.trim().split(/\s+/).filter(Boolean).length;
  const updateCount = () => {
    const n = words();
    count.textContent = `${n}/200`;
    count.classList.toggle('ok', n >= 100 && n <= 200);
  };
  abstrak.abstrak.value = kp.abstrak;
  updateCount();
  abstrak.addEventListener('input', updateCount);
  abstrak.addEventListener('reset', () => setTimeout(updateCount));
  abstrak.addEventListener('submit', (e) => {
    e.preventDefault();
    const n = words();
    if (n < 100 || n > 200) return fail(abstrak.abstrak, `Abstrak harus 100-200 kata (sekarang ${n} kata).`);
    kp.abstrak = abstrak.abstrak.value.trim();
    save('Abstrak berhasil diunggah.');
  });

  /* ---------- Program KP ---------- */
  document.getElementById('program-form').addEventListener('submit', (e) => {
    e.preventDefault();
    saveFiles(e.target, 'File program berhasil diunggah.');
  });
})();
