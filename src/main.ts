import './scss/styles.scss';

import { apiProducts } from './utils/data';
import { ProductCatalog } from './components/base/Models/ProductCatalog';
import { BasketModel } from './components/base/Models/BasketModel';
import { BuyerModel } from './components/base/Models/BuyerModel';
import { Api } from './components/base/Api';
import { AppApi } from './components/base/AppApi';

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

basket.removeItem(apiProducts.items[1]);

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

const api = new Api('https://larek-api.nomoreparties.co/api/weblarek');

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