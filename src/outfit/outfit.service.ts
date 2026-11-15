import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOutfitDto, ItemOutfitDto } from './dto/create-outfit.dto';
import { UpdateOutfitDto } from './dto/update-outfit.dto';
import { ItemOutfit, Outfit } from './entities/outfit.entity';

@Injectable()
export class OutfitService {
  // Penyimpanan sementara di memori (hilang saat server dimatikan)
  private outfits: Outfit[] = [
    {
      id: 1,
      nama: 'Urban Monochrome',
      vibe: 'Streetwear',
      kategori: 'Atasan & Bawahan',
      cutting: 'Oversized',
      tier: 'Casual',
      gambar: '/img/img 1.jpg',
      targetBeli: '2026-12-15',
      dibuatPada: new Date().toISOString(),
      items: [
        { id: '1-a', nama: 'Hoodie oversized hitam', platform: 'Tokopedia', dimiliki: true },
        { id: '1-b', nama: 'Celana cargo abu-abu', platform: 'Shopee', dimiliki: true },
        { id: '1-c', nama: 'Sneakers putih', platform: 'TikTokShop', dimiliki: false },
        { id: '1-d', nama: 'Tas selempang hitam', platform: 'Shopee', dimiliki: false },
      ],
    },
    {
      id: 2,
      nama: 'Weekend Minimalist',
      vibe: 'Kasual',
      kategori: 'Dress',
      cutting: 'Regular',
      tier: 'Higher',
      gambar: '/img/img 2.jpg',
      dibuatPada: new Date().toISOString(),
      items: [
        { id: '2-a', nama: 'Dress linen putih', platform: 'Uniqlo', dimiliki: false },
        { id: '2-b', nama: 'Flat shoes krem', platform: 'Zara', dimiliki: false },
        { id: '2-c', nama: 'Tote bag kanvas', platform: 'Zara', dimiliki: false },
      ],
    },
    {
      id: 3,
      nama: 'Boardroom Classic',
      vibe: 'Formal',
      kategori: 'Outer & Bawahan',
      cutting: 'Slim Fit',
      tier: 'Higher',
      gambar: '/img/img 3.jpg',
      dibuatPada: new Date().toISOString(),
      items: [
        { id: '3-a', nama: 'Blazer hitam slim fit', platform: 'Zara', dimiliki: true },
        { id: '3-b', nama: 'Celana chino navy', platform: 'Levi\'s', dimiliki: true },
        { id: '3-c', nama: 'Kemeja putih', platform: 'Uniqlo', dimiliki: true },
      ],
    },
  ];
  private idBerikutnya = 4;

  create(dto: CreateOutfitDto): Outfit {
    this.pastikanNamaUnik(dto.nama);

    const id = this.idBerikutnya++;
    const baru: Outfit = {
      id,
      nama: dto.nama.trim(),
      vibe: dto.vibe,
      kategori: dto.kategori,
      cutting: dto.cutting,
      tier: dto.tier,
      gambar: dto.gambar ?? '',
      targetBeli: dto.targetBeli,
      items: this.siapkanItem(dto.items, id),
      dibuatPada: new Date().toISOString(),
    };
    this.outfits.unshift(baru); // outfit terbaru tampil paling atas
    return baru;
  }

  findAll(): Outfit[] {
    return this.outfits;
  }

  findOne(id: number): Outfit {
    const outfit = this.outfits.find((o) => o.id === id);
    if (!outfit) {
      throw new NotFoundException(`Outfit dengan id ${id} tidak ditemukan`);
    }
    return outfit;
  }

  update(id: number, dto: UpdateOutfitDto): Outfit {
    const outfit = this.findOne(id); // otomatis 404 jika tidak ada

    if (dto.nama !== undefined) {
      this.pastikanNamaUnik(dto.nama, id);
    }

    const { items, nama, ...sisa } = dto;
    Object.assign(outfit, sisa);
    if (nama !== undefined) outfit.nama = nama.trim();
    if (items !== undefined) outfit.items = this.siapkanItem(items, id);
    return outfit;
  }

  remove(id: number): { message: string } {
    const outfit = this.findOne(id); // otomatis 404 jika tidak ada
    this.outfits = this.outfits.filter((o) => o.id !== id);
    return { message: `Outfit "${outfit.nama}" berhasil dihapus` };
  }

  // --- fungsi bantu ---

  // Skenario error 1: 409 Conflict jika nama outfit sudah dipakai
  private pastikanNamaUnik(nama: string, abaikanId?: number): void {
    const kembar = this.outfits.some(
      (o) =>
        o.id !== abaikanId &&
        o.nama.toLowerCase() === nama.trim().toLowerCase(),
    );
    if (kembar) {
      throw new ConflictException(`Outfit dengan nama "${nama}" sudah ada`);
    }
  }

  // Memberi id pada item baru dan mengisi nilai default
  private siapkanItem(items: ItemOutfitDto[], outfitId: number): ItemOutfit[] {
    return items.map((item) => ({
      id: item.id ?? `${outfitId}-${Math.random().toString(36).slice(2, 8)}`,
      nama: item.nama.trim(),
      platform: item.platform,
      dimiliki: item.dimiliki ?? false,
    }));
  }
}
