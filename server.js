const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// طباعة كل الطلبات لمعرفة ما يطلبه المشغل بالضبط
app.use((req, res, next) => {
    console.log(`[REQUEST] ${req.method} -> ${req.url}`);
    next();
});

// الصفحة الرئيسية
app.get('/', (req, res) => {
    res.send('Roblox Private Server Active');
});

// 1. تجاوز فحص إصدارات الأمان للمشغل
app.get('/GetAllowedSecurityVersions', (req, res) => {
    res.json(["0.0.0.1", "version-2022"]);
});

app.get('/v1.0/ClientPresence/*', (req, res) => {
    res.json({ status: "Success" });
});

// 2. مسار الانضمام (Join Script)
app.get('/game/join.ashx', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    // إرجاع سكربت وهمي لتجاوز التحديث والبدء
    res.send(`
        -- Join Script
        print("Connected to custom server!")
    `);
});

// 3. التجاوب مع باقي الطلبات لمنع إعادة التوجيه
app.use((req, res) => {
    res.status(200).send('OK');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
