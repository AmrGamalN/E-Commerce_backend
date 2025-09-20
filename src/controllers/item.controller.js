import { ItemService } from "../services/item.service.js";

export class ItemController {
    constructor(){
        this.itemService = ItemService.getInstance();
    }

    createItem = async (req, res, next) => {
        try{
            console.log("Reached createItem")
            const result = await this.itemService.createItem(req.body);
            res.status(result.statusCode).json(result);
        } catch(err){ next(err); }
    }

    getAllItems = async (req, res, next) => {
        try{
            const result = await this.itemService.getAllItems(req.query);
            res.status(result.statusCode).json(result);
        } catch(err){ next(err); }
    }

    getItemById = async (req, res, next) => {
        try{
            const result = await this.itemService.getItemById(req.params.id);
            res.status(result.statusCode).json(result);
        } catch(err){ next(err); }
    }

    updateItem = async (req, res, next) => {
        try{
            const result = await this.itemService.updateItem(req.params.id, req.body);
            res.status(result.statusCode).json(result);
        } catch(err){ next(err); }
    }

    deleteItem = async (req, res, next) => {
        try{
            const result = await this.itemService.deleteItem(req.params.id);
            res.status(result.statusCode).json(result);
        } catch(err){ next(err); }
    }
}