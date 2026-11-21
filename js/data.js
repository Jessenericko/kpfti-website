/* Data contoh perusahaan (dummy untuk prototipe, mengikuti isi desain). */
const PLACEHOLDER = {
  alamat: 'Jl. Perumahan taman grisenda blok D4 No 22-23 Kapuk Muara, Penjaringan, Jakarta Utara',
  kontak: '+62 812-8812-9967\nAndri Gunawan',
};

window.COMPANIES = [
  {
    nama: 'PT Bank Central Asia Tbk',
    alamat: 'Jl. MH Thamrin No. 1, Grand Indonesia, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10310',
    kontak: '0819801215 -\nBoris Tjandra Djaja (Mentor)',
  },
  ...[
    'PT Enseval Putera Megatrading Tbk.',
    'AB Cargo',
    'Australian School Sacred Heart',
    'BCA Finance',
    'BCA Wisma 77 Slipi',
    'PT Telkom Indonesia',
    'PT Bank Mandiri (Persero) Tbk',
    'PT Astra International Tbk',
    'PT Indosat Ooredoo Hutchison',
    'PT Tokopedia',
    'PT Global Digital Niaga (Blibli)',
    'PT Traveloka Indonesia',
    'PT Bukalapak.com',
    'PT Sinar Mas Land',
  ].map((nama) => ({ nama, ...PLACEHOLDER })),
];

// Kosong sesuai desain ("Tidak ada lowongan kerja praktek"); isi array ini bila ada lowongan.
window.VACANCIES = [];
