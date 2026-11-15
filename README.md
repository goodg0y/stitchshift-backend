# StitchShift Backend

Backend NestJS untuk aplikasi **StitchShift**, asisten mix and match pakaian dan pelacak target belanja fashion.
Data utama yang dikelola: **Outfit** (set pakaian berisi beberapa item belanja).

## Struktur MVC
- **Entity (Model)**: `src/outfit/entities/outfit.entity.ts`
- **Controller**: `src/outfit/outfit.controller.ts` (GET, POST, PATCH, DELETE)
- **Service**: `src/outfit/outfit.service.ts` (CRUD di array memori)
- **DTO + validasi**: `src/outfit/dto/`

## Endpoint
| Method | URL | Fungsi |
|---|---|---|
| POST | `/outfit` | Tambah outfit |
| GET | `/outfit` | Ambil semua outfit |
| GET | `/outfit/:id` | Ambil satu outfit |
| PATCH | `/outfit/:id` | Ubah sebagian data outfit |
| DELETE | `/outfit/:id` | Hapus outfit |

Error yang ditangani: `404 NotFoundException` (id tidak ada), `409 ConflictException` (nama outfit kembar), dan `400` dari ValidationPipe.

## Menjalankan
```bash
npm install
npm run start:dev
```
Server berjalan di http://localhost:3000. Pengujian: buka `api.http` dengan ekstensi REST Client.

## Screenshot
Tempel di `docs/screenshots/`.
