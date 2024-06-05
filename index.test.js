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

describe('Inventory App Item model and router', () => {
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

    test("GET status should be 200", async () => {
        const foundItems = await request(app).get("/api/items");

        expect(foundItems.status).toBe(200);
    });

    test("GET should return a list of 20 items", async () => {
        const foundItems = await request(app).get("/api/items");

        expect(foundItems.body.length).toBe(20);
    });

    test("GET request information should match seed", async () => {
        const foundItems = await request(app).get("/api/items");

        expect(foundItems.body[0]).toMatchObject({
            name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
        });
    });

    test("GET /:id should return an individual item when id is found", async () => {
        const foundItem = await request(app).get("/api/items/1");
    
        expect(foundItem.status).toBe(200);
        expect(foundItem.body.name).toBe("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops");
        expect(foundItem.body.price).toBe(109.95);
        expect(foundItem.body.description).toBe("Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday");
        expect(foundItem.body.category).toBe("men's clothing");
        expect(foundItem.body.image).toBe("https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg");
    });

    test("GET /:id should return an error when id is not found", async () => {
        const foundItem = await request(app).get("/api/items/30");
    
        expect(foundItem.status).toBe(404);
        expect(foundItem.body).toMatchObject({ error: "Item not found" });
    });

    test("POST should add a new item when all inputs are valid", async () => {
        const newItem = {
            name: "New Item",
            price: 100,
            description: "New Description",
            category: "New Category",
            image: "NewImage.jpg"
        };

        const addedItem = await request(app)
            .post("/api/items")
            .send(newItem);

        expect(addedItem.body.name).toBe("New Item");
        expect(addedItem.body.price).toBe(100);
        expect(addedItem.body.description).toBe("New Description");
        expect(addedItem.body.category).toBe("New Category");
        expect(addedItem.body.image).toBe("NewImage.jpg");
    });

    test("POST should create error if name input is empty", async () => {
        const newItem = {
            name: "",
            price: 100,
            description: "New Description",
            category: "New Category",
            image: "NewImage.jpg"
        };

        const addedItem = await request(app)
            .post("/api/items")
            .send(newItem);

        expect(addedItem.status).toBe(400);
        expect(addedItem.body).toEqual({ 
            errors: [{ 
                location: "body",
                msg: "Invalid value",
                path: "name",
                type: "field",
                value: "",
            }] 
        });
    });

    test("POST should create error if name input is empty with only whitespace", async () => {
        const newItem = {
            name: " ",
            price: 100,
            description: "New Description",
            category: "New Category",
            image: "NewImage.jpg"
        };

        const addedItem = await request(app)
            .post("/api/items")
            .send(newItem);

        expect(addedItem.status).toBe(400);
        expect(addedItem.body).toEqual({ 
            errors: [{ 
                location: "body",
                msg: "Invalid value",
                path: "name",
                type: "field",
                value: " ",
            }] 
        });
    });

    test("POST should create error if description input is empty", async () => {
        const newItem = {
            name: "New Item",
            price: 100,
            description: "",
            category: "New Category",
            image: "NewImage.jpg"
        };

        const addedItem = await request(app)
            .post("/api/items")
            .send(newItem);

        expect(addedItem.status).toBe(400);
        expect(addedItem.body).toEqual({ 
            errors: [{ 
                location: "body",
                msg: "Invalid value",
                path: "description",
                type: "field",
                value: "",
            }] 
        });
    });

    test("POST should create error if description input is empty with only whitespace", async () => {
        const newItem = {
            name: "New Item",
            price: 100,
            description: " ",
            category: "New Category",
            image: "NewImage.jpg"
        };

        const addedItem = await request(app)
            .post("/api/items")
            .send(newItem);

        expect(addedItem.status).toBe(400);
        expect(addedItem.body).toEqual({ 
            errors: [{ 
                location: "body",
                msg: "Invalid value",
                path: "description",
                type: "field",
                value: " ",
            }] 
        });
    });

    test("POST should create error if category input is empty", async () => {
        const newItem = {
            name: "New Item",
            price: 100,
            description: "New Description",
            category: "",
            image: "NewImage.jpg"
        };

        const addedItem = await request(app)
            .post("/api/items")
            .send(newItem);

        expect(addedItem.status).toBe(400);
        expect(addedItem.body).toEqual({ 
            errors: [{ 
                location: "body",
                msg: "Invalid value",
                path: "category",
                type: "field",
                value: "",
            }] 
        });
    });

    test("POST should create error if category input is empty with only whitespace", async () => {
        const newItem = {
            name: "New Item",
            price: 100,
            description: "New Description",
            category: " ",
            image: "NewImage.jpg"
        };

        const addedItem = await request(app)
            .post("/api/items")
            .send(newItem);

        expect(addedItem.status).toBe(400);
        expect(addedItem.body).toEqual({ 
            errors: [{ 
                location: "body",
                msg: "Invalid value",
                path: "category",
                type: "field",
                value: " ",
            }] 
        });
    });

    test("POST should create error if price input is empty", async () => {
        const newItem = {
            name: "New Item",
            price: "",
            description: "New Description",
            category: "New Category",
            image: "NewImage.jpg"
        };

        const addedItem = await request(app)
            .post("/api/items")
            .send(newItem);

        expect(addedItem.status).toBe(400);
        expect(addedItem.body).toEqual({ 
            errors: [{ 
                location: "body",
                msg: "Invalid value",
                path: "price",
                type: "field",
                value: "",
            }] 
        });
    });

    test("POST should create error if price input is not integer", async () => {
        const newItem = {
            name: "New Item",
            price: "string",
            description: "New Description",
            category: "New Category",
            image: "NewImage.jpg"
        };

        const addedItem = await request(app)
            .post("/api/items")
            .send(newItem);

        expect(addedItem.status).toBe(400);
        expect(addedItem.body).toEqual({ 
            errors: [{ 
                location: "body",
                msg: "Invalid value",
                path: "price",
                type: "field",
                value: "string",
            }] 
        });
    });

    test("POST should create error if image input does not end in .jpg, .jpeg., .png, .svg, .gif", async () => {
        const newItem = {
            name: "New Item",
            price: 100,
            description: "New Description",
            category: "New Category",
            image: "NewImage"
        };

        const addedItem = await request(app)
            .post("/api/items")
            .send(newItem);

        expect(addedItem.status).toBe(400);
        expect(addedItem.body).toEqual({ 
            errors: [{ 
                location: "body",
                msg: "Invalid image format",
                path: "image",
                type: "field",
                value: "NewImage",
            }] 
        });
    });

    test("PUT should update an item", async () => {
        const updatedItem = {
            name: "Updated Item",
            price: 100,
            description: "Updated Description",
            category: "Updated Category",
            image: "UpdatedImage.jpg"
        };
        const response = await request(app).put("/api/items/5").send(updatedItem);
        expect(response.body).toMatchObject(updatedItem);
    });

    test("PUT should create error if name input is empty", async () => {
        const updatedItem = {
            name: "",
            price: 100,
            description: "Updated Description",
            category: "Updated Category",
            image: "UpdatedImage.jpg"
        };
        const response = await request(app).put("/api/items/5").send(updatedItem);
        expect(response.body).toMatchObject({ 
            errors: [{ 
                location: "body",
                msg: "Invalid value",
                path: "name",
                type: "field",
                value: "",
            }] 
        });
    });

    test("PUT should create error if name input is empty with whitespace only", async () => {
        const updatedItem = {
            name: " ",
            price: 100,
            description: "Updated Description",
            category: "Updated Category",
            image: "UpdatedImage.jpg"
        };
        const response = await request(app).put("/api/items/5").send(updatedItem);
        expect(response.body).toMatchObject({ 
            errors: [{ 
                location: "body",
                msg: "Invalid value",
                path: "name",
                type: "field",
                value: " ",
            }] 
        });
    });

    test("PUT should create error if description input is empty", async () => {
        const updatedItem = {
            name: "Updated Item",
            price: 100,
            description: "",
            category: "Updated Category",
            image: "UpdatedImage.jpg"
        };
        const response = await request(app).put("/api/items/5").send(updatedItem);
        expect(response.body).toMatchObject({ 
            errors: [{ 
                location: "body",
                msg: "Invalid value",
                path: "description",
                type: "field",
                value: "",
            }] 
        });
    });

    test("PUT should create error if description input is empty with whitespace only", async () => {
        const updatedItem = {
            name: "Updated Item",
            price: 100,
            description: " ",
            category: "Updated Category",
            image: "UpdatedImage.jpg"
        };
        const response = await request(app).put("/api/items/5").send(updatedItem);
        expect(response.body).toMatchObject({ 
            errors: [{ 
                location: "body",
                msg: "Invalid value",
                path: "description",
                type: "field",
                value: " ",
            }] 
        });
    });

    test("PUT should create error if category input is empty", async () => {
        const updatedItem = {
            name: "Updated Item",
            price: 100,
            description: "Updated Description",
            category: "",
            image: "UpdatedImage.jpg"
        };
        const response = await request(app).put("/api/items/5").send(updatedItem);
        expect(response.body).toMatchObject({ 
            errors: [{ 
                location: "body",
                msg: "Invalid value",
                path: "category",
                type: "field",
                value: "",
            }] 
        });
    });

    test("PUT should create error if category input is empty with whitespace only", async () => {
        const updatedItem = {
            name: "Updated Item",
            price: 100,
            description: "Updated Description",
            category: " ",
            image: "UpdatedImage.jpg"
        };
        const response = await request(app).put("/api/items/5").send(updatedItem);
        expect(response.body).toMatchObject({ 
            errors: [{ 
                location: "body",
                msg: "Invalid value",
                path: "category",
                type: "field",
                value: " ",
            }] 
        });
    });

    test("PUT should create error if price input is empty", async () => {
        const updatedItem = {
            name: "Updated Item",
            price: "",
            description: "Updated Description",
            category: "Updated Category",
            image: "UpdatedImage.jpg"
        };
        const response = await request(app).put("/api/items/5").send(updatedItem);
        expect(response.body).toMatchObject({ 
            errors: [{ 
                location: "body",
                msg: "Invalid value",
                path: "price",
                type: "field",
                value: "",
            }] 
        });
    });

    test("PUT should create error if price input is not integer", async () => {
        const updatedItem = {
            name: "Updated Item",
            price: "string",
            description: "Updated Description",
            category: "Updated Category",
            image: "UpdatedImage.jpg"
        };
        const response = await request(app).put("/api/items/5").send(updatedItem);
        expect(response.body).toMatchObject({ 
            errors: [{ 
                location: "body",
                msg: "Invalid value",
                path: "price",
                type: "field",
                value: "string",
            }] 
        });
    });

    test("PUT should create error if image input does not end in .jpg, .jpeg., .png, .svg, .gif", async () => {
        const updatedItem = {
            name: "Updated Item",
            price: 100,
            description: "Updated Description",
            category: "Updated Category",
            image: "UpdatedImage"
        };
        const response = await request(app).put("/api/items/5").send(updatedItem);
        expect(response.body).toMatchObject({ 
            errors: [{ 
                location: "body",
                msg: "Invalid image format",
                path: "image",
                type: "field",
                value: "UpdatedImage",
            }] 
        });
    });

    test("DELETE should remove an item", async () => {
        const response = await request(app).delete("/api/items/10");
        expect(response.body).toMatchObject({
            name:"SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
            price:109,
            description:"Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
            category:"electronics",
            image:"https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg"
         });
    });

});
