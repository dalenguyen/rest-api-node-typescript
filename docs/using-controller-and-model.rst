Using Controller and Model
==========================

In this chapter, we will show you how to use Controller and Model for creating, saving, editing and deleting data. Remember to read the previous parts before you move forward.

Create Model for your data
----------------------------------

All the model files will be saved in **/lib/models** folder. We will define the structure of the Contact by using `Schema from Mongoose <http://mongoosejs.com/docs/guide.html>`_ .

.. code-block:: typescript

    //   /lib/models/crmModel.ts

    import * as mongoose from 'mongoose';

    const Schema = mongoose.Schema;

    export const ContactSchema = new Schema({
        firstName: {
            type: String,
            required: 'Enter a first name'
        },
        lastName: {
            type: String,
            required: 'Enter a last name'
        },
        email: {
            type: String            
        },
        company: {
            type: String            
        },
        phone: {
            type: Number            
        },
        created_date: {
            type: Date,
            default: Date.now
        }
    });

This model will be used inside the controller where we will create the data.

Create your first Controller
------------------------------------

Remember in previous chapter, We created CRUD place holder for communicating with the server. Now we will apply the real logic to the route and controller.

1. Create a new contact (POST request)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

All the logic will be saved in the **/lib/controllers/crmController.ts**

.. code-block:: typescript

    //   /lib/controllers/crmController.ts

    import * as mongoose from 'mongoose';
    import { ContactSchema } from '../models/crmModel';
    import { Request, Response } from 'express';

    const Contact = mongoose.model('Contact', ContactSchema);
    export class ContactController{
    ...
    public addNewContact (req: Request, res: Response) {                
        let newContact = new Contact(req.body);
    
        newContact.save((err, contact) => {
            if(err){
                res.send(err);
            }    
            res.json(contact);
        });
    }

In the route, we don’t have to pass anything.

.. code-block:: typescript

    // /lib/routes/crmRoutes.ts

    import { ContactController } from "../controllers/crmController";

    public contactController: ContactController = new ContactController();

    // Create a new contact
    app.route('/contact')
    .post(this.contactController.addNewContact);

2. Get all contacts (GET request)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

All the logic will be saved in the **/lib/controllers/crmController.ts**

.. code-block:: typescript

    //   /lib/controllers/crmController.ts

    public getContacts (req: Request, res: Response) {           
            Contact.find({}, (err, contact) => {
                if(err){
                    res.send(err);
                }
                res.json(contact);
            });
        }
    }

After that, we will import **ContactController** and apply **getContacts** method.

.. code-block:: typescript

    // /lib/routes/crmRoutes.ts

    // Get all contacts
    app.route('/contact')
    .get(this.contactController.getContacts)

3. View a single contact (GET method)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

We need the ID of the contact in order to view the contact info.

.. code-block:: typescript

    //   /lib/controllers/crmController.ts

    public getContactWithID (req: Request, res: Response) {           
        Contact.findById(req.params.contactId, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json(contact);
        });
    }

In the routes, we simply pass the **‘/contact/:contactId’**

.. code-block:: typescript

    // /lib/routes/crmRoutes.ts

    // get a specific contact
    app.route('/contact/:contactId')
    .get(this.contactController.getContactWithID)

4. Update a single contact (PUT method)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Remember that, without **{new: true}**, the updated document will not be returned.

.. code-block:: typescript

    //   /lib/controllers/crmController.ts

    public updateContact (req: Request, res: Response) {           
        Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json(contact);
        });
    }

In the routes,

.. code-block:: typescript

    // /lib/routes/crmRoutes.ts

    // update a specific contact
    app.route('/contact/:contactId')
        .put(this.contactController.updateContact)

5. Delete a single contact (DELETE method)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: typescript

    //   /lib/controllers/crmController.ts

    public deleteContact (req: Request, res: Response) {           
        Contact.remove({ _id: req.params.contactId }, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted contact!'});
        });
    }

In the routes,

.. code-block:: typescript

    // /lib/routes/crmRoutes.ts

    // delete a specific contact
    app.route('/contact/:contactId')
        .delete(this.contactController.deleteContact)

.. important:: Remember that you don’t have to call **app.route(‘/contact/:contactId’)** every single time for GET, PUT or DELETE a single contact. You can combine them.

.. code-block:: typescript

    // /lib/routes/crmRoutes.ts

    app.route('/contact/:contactId')
        // edit specific contact
        .get(this.contactController.getContactWithID)
        .put(this.contactController.updateContact)
        .delete(this.contactController.deleteContact)

From now, your model and controller are ready. We will hook to the MongoDB and test the Web APIs.