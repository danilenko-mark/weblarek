import './scss/styles.scss';

import { apiProducts } from './utils/data';
import { API_URL } from './utils/constants';
import { Api } from './components/base/Api';
import { AppApi } from './components/base/AppApi';

import { ProductCatalog } from './components/Models/ProductCatalog';
import { BasketModel } from './components/Models/BasketModel';
import { BuyerModel } from './components/Models/BuyerModel';

// ProductCatalog

const catalog = new ProductCatalog();

catalog.setProducts(apiProducts.items);

console.log('Все товары каталога:', catalog.getProducts());

const firstProduct = apiProducts.items[0];

catalog.setPreview(firstProduct);

console.log('Preview товара:', catalog.getPreview());

console.log('Товар по id:', catalog.getProduct(firstProduct.id));

// BasketModel

const basket = new BasketModel();

basket.addItem(apiProducts.items[0]);
basket.addItem(apiProducts.items[1]);
basket.addItem(apiProducts.items[2]);

console.log('Корзина:', basket.getItems());

console.log('Количество:', basket.getCount());

console.log('Сумма:', basket.getTotal());

console.log('Есть ли товар:', basket.hasItem(apiProducts.items[1].id));

basket.removeItem(apiProducts.items[1].id);

console.log('После удаления:', basket.getItems());

basket.clear();

console.log('После очистки:', basket.getItems());

// BuyerModel

const buyer = new BuyerModel();

buyer.setData({
    email: 'test@mail.com',
    phone: '+79999999999',
    address: 'Москва',
    payment: 'card',
});

console.log('Покупатель:', buyer.getData());

console.log('Ошибки:', buyer.validate());

buyer.clear();

console.log('После очистки:', buyer.getData());

console.log('Ошибки при пустых данных:', buyer.validate());

const api = new Api(API_URL);

const appApi = new AppApi(api);

appApi
    .getProducts()
    .then((data) => {
        catalog.setProducts(data.items);
        console.log('Каталог товаров с сервера:', catalog.getProducts());
    })
    .catch((error) => {
        console.error('Ошибка загрузки товаров:', error);
    });