# CineAI — AI Filmmaking Studio

Website marketing + CMS cho nền tảng **CineAI**.

## Chạy local

```bash
npm install
npm run dev
```

- Trang chủ: [http://localhost:3000](http://localhost:3000)
- CMS Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

## Đa ngôn ngữ

Hỗ trợ: **VI / EN / LO / KM / MY**

- `/vi` Tiếng Việt (mặc định)
- `/en` English
- `/lo` ພາສາລາວ
- `/km` ភាសាខ្មែរ
- `/my` မြန်မာ

Nội dung từng ngôn ngữ: `content/{locale}.json`  
CMS có thanh chọn ngôn ngữ để sửa từng bản.

## CMS

- Mật khẩu mặc định: `cineai2026`
- Đổi bằng biến môi trường `CMS_ADMIN_PASSWORD`
- Sửa Hero, sản phẩm, showcase, bảng giá, partners theo từng locale

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- File-based CMS (JSON)
