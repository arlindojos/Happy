import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as yup from 'yup';

import Orphanage from '../models/Orphanage';
import orphanageViews from '../views/orphanages_views';


export default {
  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);
  
    const orphanages = await orphanagesRepository.find({
      relations: ['images']
    })
    return response.json(orphanageViews.renderMany(orphanages));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const orphanagesRepository = getRepository(Orphanage);
  
    const orphanage = await orphanagesRepository.findOne(id,{
      relations: ['images']
    })
    return response.json(orphanageViews.render(orphanage as Orphanage));
  },

  async create(request: Request, response: Response) {
    const { 
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hour,
    open_on_weekends,
   } = request.body;

   const orphanagesRepository = getRepository(Orphanage);
   const requestImages = request.files as Express.Multer.File[];

   const images = requestImages.map(image => {
    return { path: image.filename }
   })
   const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hour,
      open_on_weekends,
      images,
    }

    const schema = yup.object().shape({
      name: yup.string().required('Nome obrigatório'),
      latitude: yup.number().required('latitude obrigatório'),
      longitude: yup.number().required('longitude obrigatório'),
      about: yup.string().required().max(300),
      instructions: yup.string().required('instruções obrigatório'),
      opening_hour: yup.string().required('hora da abertura obrigatório'),
      open_on_weekends: yup.boolean(),
      images: yup.array(
        yup.object().shape({
          path: yup.string().required()
        })
      )
    })

    await schema.validate(data, {
      abortEarly: false
    })

    const orphanage = orphanagesRepository.create(data)

    await orphanagesRepository.save(orphanage);

    return response.status(201).json(orphanage);
  }
}