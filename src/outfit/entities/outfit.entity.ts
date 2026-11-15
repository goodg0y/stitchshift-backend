// Satu item belanja di dalam sebuah outfit
export class ItemOutfit {
  id: string;
  nama: string;
  platform: string;
  dimiliki: boolean;
}

// Entity utama: Outfit (10 field dengan tipe beragam)
export class Outfit {
  id: number; // number
  nama: string; // string
  vibe: string; // string (pilihan terbatas)
  kategori: string;
  cutting: string;
  tier: string;
  gambar: string; // jalur gambar (boleh kosong)
  targetBeli?: string; // tanggal ISO (opsional)
  items: ItemOutfit[]; // array of object (berisi boolean dimiliki)
  dibuatPada: string; // tanggal ISO, diisi otomatis oleh server
}
