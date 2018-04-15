import * as mongoose from 'mongoose';
import { ContactSchema } from '../models/crmModel';
import { Request, Response } from 'express';

export class ContactController{

    public addNewContact (req: Request, res: Response) {        
        let Contact = mongoose.model('Contact', ContactSchema);     
        let newContact = new Contact(req.body);
    
        newContact.save((err, contact) => {
            if(err){
                res.send(err);
            }    
            res.json(contact);
        });
    }

    public getContacts (req: Request, res: Response) {   
        let Contact = mongoose.model('Contact', ContactSchema);     
        Contact.find({}, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json(contact);
        });
    }
}