/* Tabel perusahaan (cari + halaman) dan tabel lowongan. */
(() => {
  if (!window.KP) return;
  const PER_PAGE = 6;
  const rows = document.getElementById('company-rows');
  const empty = document.getElementById('company-empty');
  const info = document.getElementById('pager-info');
  const btns = document.getElementById('pager-btns');
  const search = document.getElementById('company-search');
  let page = 1;

  const cell = (text) => {
    const td = document.createElement('td');
    td.textContent = text;
    return td;
  };
  const matches = (list, query, fields) => {
    const q = query.trim().toLowerCase();
    return list.filter((item) => fields.some((f) => item[f].toLowerCase().includes(q)));
  };

  function pageButton(label, target, { current = false, disabled = false, aria } = {}) {
    const b = document.createElement('button');
    b.type = 'button';
    b.innerHTML = label;
    b.disabled = disabled;
    if (aria) b.setAttribute('aria-label', aria);
    if (current) b.setAttribute('aria-current', 'page');
    b.addEventListener('click', () => { page = target; render(); });
    return b;
  }

  function render() {
    const list = matches(COMPANIES, search.value, ['nama', 'alamat', 'kontak']);
    const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
    page = Math.min(page, pages);
    const start = (page - 1) * PER_PAGE;

    rows.replaceChildren(...list.slice(start, start + PER_PAGE).map((c, i) => {
      const tr = document.createElement('tr');
      tr.append(cell(`${start + i + 1}.`), cell(c.nama), cell(c.alamat), cell(c.kontak));
      return tr;
    }));
    empty.hidden = list.length > 0;
    info.textContent = list.length
      ? `Showing data ${start + 1} to ${Math.min(start + PER_PAGE, list.length)} of ${list.length}`
      : 'Showing data 0 of 0';

    btns.replaceChildren(
      pageButton(KP.icon('chevron-left'), page - 1, { disabled: page === 1, aria: 'Halaman sebelumnya' }),
      ...Array.from({ length: pages }, (_, i) => pageButton(i + 1, i + 1, { current: i + 1 === page })),
      pageButton(KP.icon('chevron-right'), page + 1, { disabled: page === pages, aria: 'Halaman berikutnya' }),
    );
  }

  search.addEventListener('input', () => { page = 1; render(); });
  render();

  /* Lowongan */
  const vacancySearch = document.getElementById('vacancy-search');
  const renderVacancies = () => {
    const list = matches(VACANCIES, vacancySearch.value, ['tempat', 'bidang', 'kontak']);
    document.getElementById('vacancy-rows').replaceChildren(...list.map((v, i) => {
      const tr = document.createElement('tr');
      tr.append(cell(`${i + 1}.`), cell(v.tempat), cell(v.bidang), cell(v.kontak));
      return tr;
    }));
    document.getElementById('vacancy-empty').hidden = list.length > 0;
  };
  vacancySearch.addEventListener('input', renderVacancies);
  renderVacancies();
})();
