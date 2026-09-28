const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// طباعة كل الطلبات لمعرفة أين يصل المشغل
app.use((req, res, next) => {
    console.log(`[REQUEST] ${req.method} -> ${req.url}`);
    next();
});

// 1. مسار إعدادات التطبيق لتجاوز خطأ "Trust check failed"
app.get('/v2/settings/application/PCDesktopClient', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json({
        "applicationSettings": {
            "FFlagDebugDisableUpdatedClientCheck": "True",
            "FFlagDisableAutoUpdate": "True",
            "DFIntClientSoothsayerFeatureRollout": "100"
        }
    });
});

// مسار فرعي إضافي قد يطلبه المشغل للإعدادات
app.get('/v1/settings/application', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json({});
});

// 2. فحص أمان الإصدارات
app.get('/GetAllowedSecurityVersions', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(["0.0.0.1", "version-2022"]);
});

app.get('/v1.0/ClientPresence/*', (req, res) => {
    res.json({ status: "Success" });
});

// 3. مسار الانضمام (Join Script)
app.get('/game/join.ashx', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send(`-- Join Script\nprint("Successfully bypass trust check!")`);
});

// الصفحة الرئيسية
app.get('/', (req, res) => {
    res.send('Roblox Private Server Active');
});

// التجاوب مع باقي المسارات بـ 200 OK لمنع أي أخطاء إضافية
app.use((req, res) => {
    res.status(200).send('{}');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
