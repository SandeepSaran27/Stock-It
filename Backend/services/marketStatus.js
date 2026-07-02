const axios = require('axios');
async function getMarketStatus(){
    try {
        const response = await axios.get('https://www.nseindia.com/api/marketStatus', {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Accept': '*/*',
                'Referer': 'https://www.nseindia.com'
            }
        });

        const capitalMarket = response.data.marketState.find(m => m.market === "Capital Market");
        //console.log("Market Status:", capitalMarket.marketStatus);
        return capitalMarket.marketStatus;
    } catch (err) {
        console.error("Error fetching market status:", err.message);
        return 'fail';
    }
}

module.exports = {
    getMarketStatus,
};