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
<img width="910" height="297" alt="Screenshot 2026-11-16 002942" src="https://github.com/user-attachments/assets/438debe5-6435-4dc6-856c-df92c290b084" />
<img width="345" height="335" alt="Screenshot 2026-11-16 003018" src="https://github.com/user-attachments/assets/6af82f15-1b6b-4981-a7be-98b97c91c42f" />
<img width="591" height="769" alt="Screenshot 2026-11-16 003115" src="https://github.com/user-attachments/assets/d70a9104-8110-4725-a345-a7576afb5c46" />



