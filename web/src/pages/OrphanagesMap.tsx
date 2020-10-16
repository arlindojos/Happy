import React from 'react';
import { Link } from 'react-router-dom';
import mapMarkerImg from '../images/map-marker.svg';
import { FiPlus } from 'react-icons/fi';
import { Map, TileLayer } from 'react-leaflet';

import '../styles/pages/orphanages-map.css';
import 'leaflet/dist/leaflet.css'

const OrphanagesMap: React.FC = () => {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="happy"/>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>
        <footer>
          <strong>
            Matola
          </strong>
          <span>
            Cidade da matola
          </span>
        </footer>
      </aside>

      <Map 
        center={[-25.952641, 32.459461]}
        zoom={10}
        style={{width: "100%", height: "100%"}}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`} />
      </Map>

      <Link to="" className="create-orphanage">
        <FiPlus size={32} color="#fff"/>
      </Link>
    </div>
  )
}

export default OrphanagesMap;