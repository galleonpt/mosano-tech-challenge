import type { Request, Response } from 'express';
import { CountriesService } from './countries.service.js';

export class CountriesController {
    private countriesService: CountriesService;

    constructor() {
        this.countriesService = new CountriesService();
    }

    public create = async (request: Request, response: Response) => {
        const payload = request.body;

        const createdCountry = await this.countriesService.create(payload);
        response.status(201).json(createdCountry);
    };

    public listAll = async (_request: Request, response: Response) => {
        const countries = await this.countriesService.listAll();
        response.status(200).json(countries);
    };

    public update = async (request: Request, response: Response) => {
        const countryId = request.params.country_id as string;
        const payload = request.body;

        const updatedCountry = await this.countriesService.update(countryId, payload);
        response.status(200).json(updatedCountry);
    };

    public delete = async (request: Request, response: Response) => {
        const countryId = request.params.country_id as string;

        await this.countriesService.delete(countryId);
        response.status(204).send();
    };
}

export default new CountriesController();
