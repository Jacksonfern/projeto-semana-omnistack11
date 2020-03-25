const connection = require('../database/connection');

module.exports = {
    async login(req, res){
        const { id } = req.body;

        const ong = await connection('ongs')
            .where('id', id)
            .select('name') 
            .first();

        if(!ong)
            return res.sendStatus(400);
        return res.json({name: ong.name});
    }
}