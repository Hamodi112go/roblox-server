const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// طباعة كل الطلبات التي تصل من المشغل
app.use((req, res, next) => {
    console.log(`[REQUEST] ${req.method} -> ${req.url}`);
    next();
});

// الصفحة الرئيسية
app.get('/', (req, res) => {
    res.send('Roblox Private Server is Active!');
});

// مسار الانضمام (Join Script)
app.get('/game/join.ashx', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send('-- Join Script Response');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
