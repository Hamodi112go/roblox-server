const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// طباعة كافة الطلبات لتتبع الاتصال
app.use((req, res, next) => {
    console.log(`[REQUEST] ${req.method} -> ${req.url}`);
    next();
});

// 1. تجاوز خطأ Trust check لتسجيل الإعدادات
app.all('/v2/settings/application/PCDesktopClient', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Roblox-Edge', 'roblox-edge');
    res.status(200).send(JSON.stringify({
        "applicationSettings": {
            "FFlagDebugDisableUpdatedClientCheck": "True",
            "FFlagDisableAutoUpdate": "True"
        }
    }));
});

// 2. معالجة طلبات الإعدادات الفرعية
app.all('/v1/settings/application', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send("{}");
});

// 3. تجاوز فحص الإصدار المسموح
app.all('/GetAllowedSecurityVersions', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send('["0.0.0.1"]');
});

// 4. مسار تشغيل السكربت ودخول اللعبة (Join Script)
app.all('/game/join.ashx', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send('-- Join Script Response\nprint("Connected!")');
});

// التجاوب مع أي مسار أمان آخر لمنع الـ Redirect
app.use((req, res) => {
    res.status(200).send('{}');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
