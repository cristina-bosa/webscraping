const shoeModel = require('./shoes.model');

module.exports = {
    getAll,
    getByBrand,
    getAllFavs,
    getById,
    create,
    modifyProductById,
    modifyFavById
};

function getAll(req, res){
    console.log("Pidiendo Todos los Calzados");
    shoeModel.find().then( response => {
        if (response.length === 0) {
            res.status(404).send("No hay Calzados");
        }
        res.json(response);
    }).catch( err => {
        res.status(500).send(err);
    });
}

function getByBrand(req, res){
    console.log(`Pidiendo Todos los Calzados de la marca ${req.params.brand}`);
    shoeModel.find({brand: req.params.brand}).then( response => {
        if (response.length === 0) {
            res.status(404).send(`No hay Calzados de la marca ${req.params.brand}`);
        }
        res.json(response);
    }).catch( err => {
        res.status(500).send(err);
    });
}
function getAllFavs(req, res){
    console.log(`Pidiendo Todos los Calzados en favorito`);
    shoeModel.find({favorite: true}).then( response => {
        if (response.length === 0) {
            res.status(404).send(`No tienes gusto! :(`);
        }
        res.json(response);
    }).catch( err => {
        res.status(500).send(err);
    });
}

function getById(req, res){
    console.log(`Pidiendo Calzado por id: ${req.params.id}`);
    shoeModel.findOne({id: req.params.id}).then( response => {
        res.json(response);
    }).catch (err =>{
        res.status(500).send(err);
    }); 
}

function create(req, res){
    console.log("Introduciendo Calzado");
    shoeModel.create(req.body).then( response => {
        if (response.length === 0) {
            res.status(404).send(`No hay Calzados de la marca ${req.params.brand}`);
        }
        res.json(response);
    }).catch (err =>{
        res.status(500).send(err);
    }); 
}

function modifyProductById(req, res){
    console.log(`actualizando producto con id: ${req.params.id}`);
    shoeModel.updateOne({id: req.params.id}, req.body).then( response => {
        res.json(response);
    }).catch (err =>{
        res.status(500).send(err);
    }); 
}

function modifyFavById(req, res){
    console.log(`modificando favorito con id: ${req.params.id}`);
    shoeModel.updateOne({id: req.params.id}, {favorite: req.body.favorite}).then( response => {
        //modificar para devolver el conjunto entero de calzados.
        res.json(response);
    }).catch (err =>{
        res.status(500).send(err);
    }); 
}




