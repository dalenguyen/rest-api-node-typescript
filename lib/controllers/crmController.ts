import * as mongoose from 'mongoose';
import { ContactSchema } from '../models/crmModel';
import { Request, Response } from 'express';

export class ContactController{

    public Contact: any;

    constructor(){
        this.Contact = mongoose.model('Contact', ContactSchema);                
    }    

    public addNewContact (req: Request, res: Response) {
        
        let newContact = new this.Contact(req.body);
    
        newContact.save((err, contact) => {
            if(err){
                res.send(err);
            }
    
            res.json(contact);
        });
    }
}