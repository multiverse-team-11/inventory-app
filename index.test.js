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

    test("GET should return a list of 20 items", async () => {
        const foundItems = await request(app).get("/api/items");

        expect(foundItems.body.length).toBe(20);
        expect(foundItems.body[0]).toMatchObject({
            name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
        });
    });

    // test("GET /:id should return an individual item", async () => {
    //     const foundItem = await request(app).get("/api/items/1");
    //     expect(foundItem.body.name).toBe("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops");
    //     expect(foundItem.body.price).toBe(109.95);
    //     expect(foundItem.body.description).toBe("Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday");
    //     expect(foundItem.body.category).toBe("men's clothing");
    //     expect(foundItem.body.image).toBe("https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg");
    // });

});
