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

    test("404 handler", async () => {
        const notFound = await request(app).get("/api/nowhere");
        expect(notFound.body).toEqual({ error: "404 - Not Found", message: "No route found for the requested URL" });
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

    test("GET /:id should return an individual item", async () => {
        const foundItem = await request(app).get("/api/items/1");
        expect(foundItem.body.name).toBe("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops");
        expect(foundItem.body.price).toBe(109.95);
        expect(foundItem.body.description).toBe("Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday");
        expect(foundItem.body.category).toBe("men's clothing");
        expect(foundItem.body.image).toBe("https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg");
    });

    test("POST should add a new item", async () => {
        const newItem = {
            name: "New Item",
            price: 100,
            description: "New Description",
            category: "New Category",
            image: "New Image"
        };

        const addedItem = await request(app)
            .post("/api/items")
            .send(newItem);

        expect(addedItem.body.name).toBe("New Item");
        expect(addedItem.body.price).toBe(100);
        expect(addedItem.body.description).toBe("New Description");
        expect(addedItem.body.category).toBe("New Category");
        expect(addedItem.body.image).toBe("New Image");
    });

});
