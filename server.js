const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// طباعة كل الطلبات
app.use((req, res, next) => {
    console.log(`[REQUEST] ${req.method} -> ${req.url}`);
    next();
});

// إرجاع إعدادات موثوقة مع تعيين الهيدرز الخاصة بروبلوكس
app.get('/v2/settings/application/PCDesktopClient', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Roblox-Edge', 'roblox-edge');
    res.setHeader('Cache-Control', 'no-cache');
    
    res.status(200).send(JSON.stringify({
        "applicationSettings": {
            "FFlagDebugDisableUpdatedClientCheck": "True",
            "FFlagDisableAutoUpdate": "True",
            "DFIntClientSoothsayerFeatureRollout": "100"
        }
    }));
});

// باقي المسارات الأساسية
app.get('/GetAllowedSecurityVersions', (req, res) => {
    res.json(["0.0.0.1", "version-2022"]);
});

app.get('/game/join.ashx', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send('-- Join Script Response');
});

app.use((req, res) => {
    res.status(200).send('{}');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
