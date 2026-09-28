const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// تسجيل الطلبات لمعرفة الاستدعاءات
app.use((req, res, next) => {
    console.log(`[REQUEST] ${req.method} -> ${req.url}`);
    next();
});

// مسار الإعدادات مع إلغاء التوقيع والتجاوب بـ JSON فارغ متوافق
app.get('/v2/settings/application/PCDesktopClient', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send({
        "applicationSettings": {}
    });
});

app.get('/v1/settings/application', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send({});
});

// مسار فحص أمان النسخ
app.get('/GetAllowedSecurityVersions', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(["0.0.0.1"]);
});

// مسار الانضمام
app.get('/game/join.ashx', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send('-- Join Script');
});

// الاستجابة لأي مسار آخر
app.use((req, res) => {
    res.status(200).send({});
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
