import React, { ChangeEvent, FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import api from "../services/api";
import { FiPlus } from "react-icons/fi";

import Sidebar from "../components/Sidebar";
import '../styles/pages/create-orphanage.css';
import mapIcon from '../utils/mapIcon';

export default function CreateOrphanage() {
  const history = useHistory();
  const [position, setPosition] = useState({latitude: 0, longitude: 0});
  const [ name, setName ] = useState('');
  const [ about, setAbout ] = useState('');
  const [ instructions, setInstructions ] = useState('');
  const [ opening_hours, setOpening_hours ] = useState('');
  const [ open_on_weekends, setOpen_on_weekends ] = useState(true);
  const [ images, setImages ] = useState<File[]>([]);
  const [ previewImages, setPreviewImages ] = useState<string[]>([]);

  const HandleMapClick = (event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat, 
      longitude: lng
    })
  }

  const HandleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('name', name);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('opening_hour', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach(image => {
      data.append('images', image);
    })

    api.post('/orphanages', data)
    .then(response => {
      console.log('Right here')
      alert('cadastro realizado com sucesso');
      history.push('/app');
    })
    .catch(err => {
      console.log(err);
    });
  }

  const handleSelectedImage = (e: ChangeEvent<HTMLInputElement>) => {
    if(!e.target.files)
    return;

    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    })

    setPreviewImages(selectedImagesPreview);
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={HandleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-25.9293184, 32.5091328]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={HandleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`}
              />
              {
                position.latitude !== 0 && (
                  <Marker 
                    interactive={false} 
                    icon={mapIcon} 
                    position={[position.latitude, position.longitude]} 
                  />
                )
              }
              {/*  */}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name"
                value={name}
                onChange={ e => { setName(e.target.value)}}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="name" 
                maxLength={300} 
                value={about}
                onChange={ e => {setAbout(e.target.value)}}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {
                  previewImages.map(image => (
                    <img key={image} src={image} alt={name} />
                  ))
                }

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input multiple={true} onChange={handleSelectedImage} type="file" id="image[]"/>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions"
                value={instructions}
                onChange={ e => {setInstructions(e.target.value)}}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input 
                id="opening_hours"
                value={opening_hours}
                onChange={ e => { setOpening_hours(e.target.value)}}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button"
                  className={open_on_weekends ? "active" : ""}
                  onClick={ e => {setOpen_on_weekends(true)}}
                >Sim</button>

                <button
                  type="button"
                  className={!open_on_weekends ? "active" : ""}
                  onClick={ e => {setOpen_on_weekends(false)}}
                >Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
