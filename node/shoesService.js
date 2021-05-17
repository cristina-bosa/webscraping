var axios = require('axios');
require('dotenv').config();

url = process.env.URL_API;

function getProductById(id){
    console.log(url + `/${id}`);
    return axios.get(url + `/${id}`)
    .then(res => {
        //console.log(res);
        return res.data
    })
    .catch(err => {
        console.log(err)
    });
}

function updateProduct(shoe){
    delete shoe.favorite;
    return axios.patch(url + `/${shoe.id}`, shoe)
    .then(res => res.data)
    .catch(err => {
        console.log(err)
    });

}

function addProduct(shoe){
    return axios.post(url, shoe)
    .then(res => res.data)
    .catch(err => {
        console.log(err)
    });

}


module.exports = {
    getProductById,
    addProduct,
    updateProduct
};