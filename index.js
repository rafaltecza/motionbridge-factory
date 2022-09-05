const express = require('express')
const renderLottie = require('puppeteer-lottie')
const cors = require("cors");
const bodyParser = require('body-parser')

const app = express();
const port = 3001;

app.use(cors());
const jsonParser = bodyParser.json()

app.get('/', (req, res) => {
    res.send('Motion Bridge - Factory API')
});

app.post('/render', jsonParser, async (req, res) => {
    console.log(req.body);
    const {lottieAnimation, animationConfiguration} = req.body;
    const {fileName, extension} = animationConfiguration;

    return await renderLottie({
        animationData: lottieAnimation,
        output: `renders/${fileName}.${extension}`,
    }).then(buffer => res.send(buffer))
        .catch(err => res.send(err))
})

app.listen(port, async () => {
    console.log(`Motion Bridge API Listening to ${port}!`)
});

var cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    removeHeaders: ['cookie', 'cookie2']
}).listen(8080, '0.0.0.0', function() {
    console.log('Running CORS Anywhere on ' + '0.0.0.0' + ':' + 8080);
});
