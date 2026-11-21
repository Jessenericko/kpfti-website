/* Kerangka bersama: ikon, header/sidebar/footer, sesi, toast, dan komponen form. */
(() => {
  const ICONS = {
    folder: '<path d="M3 6.5A2.5 2.5 0 0 1 5.5 4h3.6l2 2h7.4A2.5 2.5 0 0 1 21 8.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z"/>',
    briefcase: '<path fill-rule="evenodd" d="M9 3.5h6A2 2 0 0 1 17 5.5V7h3a2 2 0 0 1 2 2v3H2V9a2 2 0 0 1 2-2h3V5.5a2 2 0 0 1 2-2zm0 3.5h6V5.5H9zM2 13.5h20V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"/>',
    docs: '<rect x="8" y="3" width="13" height="16" rx="2"/><path d="M5 7v12a2 2 0 0 0 2 2h9M11.5 8h6M11.5 11.5h6M11.5 15h3.5"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 12.5 9 5 9-5M3 16.5l9 5 9-5"/>',
    logout: '<path d="M14 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M3 12h11M10 8l4 4-4 4"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/>',
    eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    'eye-off': '<path d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.1A9.6 9.6 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 3.9M6.6 6.6C3.8 8.4 2 12 2 12s3.6 7 10 7a9.4 9.4 0 0 0 5.4-1.6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    trash: '<path d="M4 7h16M9 7V4.5h6V7M6 7l1 13h10l1-13M10 11v5M14 11v5"/>',
    file: '<path d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>',
    close: '<path d="M5 5l14 14M19 5 5 19"/>',
    'chevron-left': '<path d="m15 18-6-6 6-6"/>',
    'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  };
  const SOLID = ['folder', 'briefcase', 'file'];

  const icon = (name) =>
    `<svg class="icon${SOLID.includes(name) ? ' solid' : ''}" aria-hidden="true"><use href="#i-${name}"></use></svg>`;

  const NAV = [
    ['data-kp.html', 'Data KP', 'folder'],
    ['tempat-kp.html', 'Tempat KP', 'briefcase'],
    ['pengumuman.html', 'Pengumuman', 'docs'],
    ['alur-kp.html', 'Alur dan File KP', 'layers'],
  ];

  /* ---------- Penyimpanan ---------- */
  // shortcut: data (termasuk password) hanya disimpan di localStorage browser karena tidak ada backend; pindahkan ke server bila ada backend.
  const store = {
    get(key, fallback) {
      try { return JSON.parse(localStorage.getItem(`kpfti.${key}`)) ?? fallback; } catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(`kpfti.${key}`, JSON.stringify(value)); } catch { toast('Browser menolak penyimpanan data.', 'error'); }
    },
    remove(key) {
      try { localStorage.removeItem(`kpfti.${key}`); } catch { /* tidak ada yang perlu dihapus */ }
    },
  };

  const auth = {
    users: () => store.get('users', {}),
    current() {
      const nim = store.get('session');
      return nim ? auth.users()[nim] : null;
    },
    save(user) {
      store.set('users', { ...auth.users(), [user.nim]: user });
    },
    login(nim) { store.set('session', nim); },
    logout() {
      store.remove('session');
      location.href = 'index.html';
    },
  };

  /* ---------- Umpan balik ---------- */
  function toast(message, type = '') {
    document.querySelector('.toast')?.remove();
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.setAttribute('role', 'status');
    el.textContent = message;
    document.body.append(el);
    setTimeout(() => el.remove(), 3200);
  }

  function openModal(id) {
    const modal = document.getElementById(id);
    modal.hidden = false;
    modal.querySelector('button')?.focus();
  }

  const formatSize = (bytes) =>
    bytes >= 1 << 20 ? `${(bytes / (1 << 20)).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;

  /* ---------- Layout ---------- */
  function renderLayout(user) {
    const shell = document.body.dataset.shell;
    const home = user ? 'dashboard.html' : 'index.html';

    let actions = '';
    if (user) {
      actions = `<div class="header-actions">
        <button class="icon-btn" type="button" data-logout aria-label="Keluar" title="Keluar">${icon('logout')}</button>
        <a class="icon-btn" href="profile.html" aria-label="Profil" title="Profil">${icon('user')}</a>
      </div>`;
    } else if (shell === 'home') {
      actions = `<div class="header-actions wide">
        <a class="link-register" href="register.html">REGISTER</a>
        <a class="btn-pill" href="login.html">LOGIN</a>
      </div>`;
    }

    const header = `<header class="site-header">
      <a class="brand" href="${home}">
        <img src="assets/logo-untar-fti.png" alt="UNTAR Fakultas Teknologi Informasi" width="130" height="50">
        <span class="brand-title">SISTEM INFORMASI KERJA<br>PRAKTIK FTI UNTAR</span>
      </a>${actions}
    </header>`;

    const footer = `<footer class="site-footer">
      <p>Fakultas Teknologi Informasi Universitas Tarumanagara<br>
      Jl. Let. Jend. S. Parman No.1, Blok R Lantai XI, Jakarta 11440<br>
      Telp :021-.5676260 - 5677949, Fax : 56941924</p>
      <p>webiste: <a href="http://fti.untar.ac.id/" target="_blank" rel="noopener">http://fti.untar.ac.id/</a></p>
    </footer>`;

    const sprite = `<svg width="0" height="0" style="position:absolute" aria-hidden="true">${Object.entries(ICONS)
      .map(([name, body]) => `<symbol id="i-${name}" viewBox="0 0 24 24">${body}</symbol>`)
      .join('')}</svg>`;

    const main = document.querySelector('main');
    main.insertAdjacentHTML('beforebegin', sprite + header);
    main.insertAdjacentHTML('afterend', footer);

    if (shell === 'app-nav') {
      const page = location.pathname.split('/').pop();
      const links = NAV.map(([href, label, name]) =>
        `<a href="${href}"${href === page ? ' aria-current="page"' : ''}>${icon(name)}<span>${label}</span></a>`).join('');
      const app = document.createElement('div');
      app.className = 'app';
      main.before(app);
      app.innerHTML = `<nav class="sidebar" aria-label="Menu utama">${links}</nav>`;
      app.append(main);
    }
  }

  /* ---------- Komponen ---------- */
  function initPasswordToggles() {
    document.querySelectorAll('.toggle-pass').forEach((btn) => {
      const input = btn.previousElementSibling;
      btn.innerHTML = icon('eye-off');
      btn.setAttribute('aria-label', 'Tampilkan password');
      btn.addEventListener('click', () => {
        const show = input.type === 'password';
        input.type = show ? 'text' : 'password';
        btn.innerHTML = icon(show ? 'eye' : 'eye-off');
        btn.setAttribute('aria-label', show ? 'Sembunyikan password' : 'Tampilkan password');
      });
    });
  }

  function initTabs() {
    document.querySelectorAll('[role="tablist"]').forEach((list) => {
      const tabs = [...list.querySelectorAll('[role="tab"]')];
      const select = (tab) => tabs.forEach((t) => {
        const active = t === tab;
        t.setAttribute('aria-selected', active);
        t.tabIndex = active ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !active;
      });
      tabs.forEach((tab, i) => {
        tab.addEventListener('click', () => select(tab));
        tab.addEventListener('keydown', (e) => {
          const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
          if (!step) return;
          const next = tabs[(i + step + tabs.length) % tabs.length];
          select(next);
          next.focus();
        });
      });
      select(tabs.find((t) => `#${t.getAttribute('aria-controls')}` === location.hash) ?? tabs[0]);
    });
  }

  /** Pemilih file bergaya desain. Nilai tersimpan di `box.meta` ({name, size}) atau null. */
  function initFilePickers() {
    document.querySelectorAll('.file').forEach((box) => {
      const input = box.querySelector('input');
      const pick = box.querySelector('.file-btn');
      const [title, sub] = box.querySelectorAll('.file-info > *');
      const hint = sub.textContent;
      const maxBytes = Number(box.dataset.maxMb) * (1 << 20);
      const exts = box.dataset.ext.split(',');

      box.set = (meta) => {
        box.meta = meta;
        box.classList.toggle('has-file', !!meta);
        title.textContent = meta ? meta.name : 'Tidak ada file terpilih';
        sub.textContent = meta ? formatSize(meta.size) : hint;
        pick.textContent = meta ? 'Reupload' : 'Pilih File';
        box.dispatchEvent(new Event('filechange', { bubbles: true }));
      };

      pick.addEventListener('click', () => input.click());
      box.querySelector('.file-del').addEventListener('click', () => {
        input.value = '';
        box.set(null);
      });
      input.addEventListener('change', () => {
        const file = input.files[0];
        if (!file) return;
        const ext = file.name.split('.').pop().toLowerCase();
        if (!exts.includes(ext)) {
          input.value = '';
          return toast(`Format file harus ${exts.join('/').toUpperCase()}.`, 'error');
        }
        if (file.size > maxBytes) {
          input.value = '';
          return toast(`Ukuran file melebihi ${box.dataset.maxMb === '1024' ? '1 GB' : `${box.dataset.maxMb} MB`}.`, 'error');
        }
        box.set({ name: file.name, size: file.size });
      });
    });
  }

  /* ---------- Mulai ---------- */
  const user = auth.current();
  const shell = document.body.dataset.shell;
  if (shell.startsWith('app') && !user) return location.replace('login.html');
  if (shell === 'auth' && user) return location.replace('dashboard.html');

  renderLayout(user);
  document.querySelectorAll('[data-user]').forEach((el) => { el.textContent = user?.[el.dataset.user] || '-'; });
  document.querySelector('[data-logout]')?.addEventListener('click', auth.logout);
  document.querySelectorAll('[data-soon]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    toast('Dokumen ini belum tersedia di versi prototipe.');
  }));
  document.addEventListener('click', (e) => {
    const close = e.target.closest('[data-close]') || (e.target.classList.contains('modal') && e.target);
    if (close) close.closest('.modal').hidden = true;
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.querySelectorAll('.modal').forEach((m) => { m.hidden = true; });
  });
  initPasswordToggles();
  initTabs();
  initFilePickers();

  window.KP = { store, auth, user, toast, openModal, icon };
})();
