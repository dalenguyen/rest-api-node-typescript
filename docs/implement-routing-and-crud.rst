Implement Routing and CRUD
==========================

In this chapter, we will build the routing for the API.

Step 1: Create TS file for routing
----------------------------------

Remember in part 1 of this project. We save everything in **lib** folder. So I will create **routes folder** with a file named **crmRoutes.ts** that will save all the routes for this project.

.. code-block:: typescript

    // /lib/routes/crmRoutes.ts

    import {Request, Response} from "express";

    export class Routes {       
        public routes(app): void {          
            app.route('/')
            .get((req: Request, res: Response) => {            
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                })
            })               
        }
    }

After creating our first route, we need to import it to the **lib/app.ts**.

.. code-block:: typescript

    // /lib/app.ts

    import * as express from "express";
    import * as bodyParser from "body-parser";
    import { Routes } from "./routes/crmRoutes";

    class App {

        public app: express.Application;
        public routePrv: Routes = new Routes();
        
        constructor() {
            this.app = express();
            this.config();        
            this.routePrv.routes(this.app);     
        }

        private config(): void{
            this.app.use(bodyParser.json());
            this.app.use(bodyParser.urlencoded({ extended: false }));
        }
    }

Now, you can send GET request to your application (http://localhost:3000) directly or by using `Postman <https://www.getpostman.com/apps>`_ .

Step 2: Building CRUD for the Web APIs
--------------------------------------

I assume that you have a basic understanding of HTTP request (GET, POST, PUT and DELETE). If you don’t, it is very simple:

+ GET: for retrieving data
+ POST: for creating new data
+ PUT: for updating data
+ DELETE: for deleting data

Now we will build the routing for building a contact CRM that saves, retrieves, updates and deletes contact info.

.. code-block:: typescript

    // /lib/routes/crmRoutes.ts

    import {Request, Response} from "express";

    export class Routes {    
        
        public routes(app): void {   
            
            app.route('/')
            .get((req: Request, res: Response) => {            
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                })
            })
            
            // Contact 
            app.route('/contact') 
            // GET endpoint 
            .get((req: Request, res: Response) => {
            // Get all contacts            
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                })
            })        
            // POST endpoint
            .post((req: Request, res: Response) => {   
            // Create new contact         
                res.status(200).send({
                    message: 'POST request successfulll!!!!'
                })
            })

            // Contact detail
            app.route('/contact/:contactId')
            // get specific contact
            .get((req: Request, res: Response) => {
            // Get a single contact detail            
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                })
            })
            .put((req: Request, res: Response) => {
            // Update a contact           
                res.status(200).send({
                    message: 'PUT request successfulll!!!!'
                })
            })
            .delete((req: Request, res: Response) => {       
            // Delete a contact     
                res.status(200).send({
                    message: 'DELETE request successfulll!!!!'
                })
            })
        }
    }

Now the routes are ready for getting HTTP request