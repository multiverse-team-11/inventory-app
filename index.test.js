const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const {sequelize} = require('./server/db')
const {Sauce, Item} = require('./server/models/index')
const {
    sauces,
    items,
  } = require('./server/seedData');
  
const request = require('supertest');
const app = require('./server/app');

describe('Sequelize models', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
        await Sauce.bulkCreate(sauces);
        await Item.bulkCreate(items);
    });
  
    afterAll(async () => {
        await sequelize.close();
    });

    test("status is 200", async () => {
        const mainPage = await request(app).get("/");
        expect(mainPage.status).toBe(200);
    });
  
    test('Item model works', async () => {
        const allItems = await Item.findAll();
        expect(allItems.length).toEqual(items.length);
    });

    // test("GET should return a list of items", async () => {
    //     const items = await request(app).get("/items");
    //     expect(items.body).toMatchObject([
    //         {
    //             name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    //             price: 109.95,
    //             description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    //             category: "men's clothing",
    //             image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
    //          },
    //          {
    //             name: "Mens Casual Premium Slim Fit T-Shirts ",
    //             price: 22.3,
    //             description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    //             category: "men's clothing",
    //             image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
    //          },
    //     ]);
    // });
  }
);
