const { updateDataFunction } = require("../services/updateData");
function updateDataInDB(req, res){
    updateDataFunction(req, res);
}
module.exports = {
    updateDataInDB,
}