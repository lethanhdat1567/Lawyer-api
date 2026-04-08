# LawerAI API - Pre-push Checklist (BE)

Muc tieu: dam bao VPS clone code ve co the build, migrate va chay on dinh.

## 1) Chay bo kiem tra bat buoc

```bash
npm ci
npm run verify:deploy
```

`verify:deploy` gom:
- `npm run prisma:generate`
- `npm run prisma:validate`
- `npm run build`

Kiem tra format/lint (khuyen nghi, hien tai khong de trong gate vi repo con nhieu file legacy chua format):

```bash
npm run format:check
```

## 2) Kiem tra worker (thu cong, nhanh)

Chay rieng tung process de dam bao khong crash ngay khi startup:

```bash
npm run queue
npm run schedule
```

Neu can test theo mode production (sau build):

```bash
npm run start
npm run start:queue
npm run start:schedule
```

## 3) Prisma gate truoc deploy

- Neu `prisma/schema.prisma` co thay doi, phai co migration moi trong `prisma/migrations`.
- Kiem tra trang thai migration theo DB hien tai (tham khao):

```bash
npm run prisma:status
```

- Tren VPS, dung `prisma migrate deploy` (khong dung `migrate dev`).

## 4) Tieu chi pass truoc khi push

- `npm run verify:deploy` pass.
- Queue va schedule khoi dong khong throw loi startup.
- Khong co thay doi schema chua co migration.

## 5) PM2 run production (api + queue + schedule)

Project da co file `ecosystem.config.cjs` cho 3 process:
- `lawerai-api`
- `lawerai-queue`
- `lawerai-schedule`

Lenh de chay tren VPS sau khi clone + build:

```bash
npm ci
npm run verify:deploy
npx prisma migrate deploy
pm2 start ecosystem.config.cjs
pm2 save
```

Lenh reload sau moi lan deploy:

```bash
pm2 reload ecosystem.config.cjs
pm2 status
pm2 logs --lines 100
```
