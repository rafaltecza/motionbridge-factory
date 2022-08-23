const express = require('express')
const renderLottie = require('puppeteer-lottie')
const cors = require("cors");
const bodyParser = require('body-parser')

const app = express();
const port = 3001;

app.use(cors());
const jsonParser = bodyParser.json()

app.get('/', (req, res) => {
    res.send('Motion API')
});

app.post('/render', jsonParser, async (req, res) => {
    console.log(req.body);
    const { lottieAnimation, animationConfiguration } = req.body;
    const { fileName, extension } = animationConfiguration;

    return await renderLottie({
        animationData: lottieAnimation,
        output: `renders/${fileName}.${extension}`,
    }).then(buffer => res.send(buffer))
        .catch(err => res.send(err))
})

app.listen(port, async () => {
    console.log(`Example app listening on port ${port}!`)
});


