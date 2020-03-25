const connection = require('../database/connection');

module.exports = {
    async index(req, res){
        const { id } = req.params;

        const data = await connection('incidents')
            .where('id', id)
            .select('*');

        return res.json(data);
    }
}