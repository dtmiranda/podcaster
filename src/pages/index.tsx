
//SPA
//SSR
//SSG

import { GetStaticProps } from 'next';
import { type } from 'os';
import { api } from '../services/api';

type Episode = {
  id: string;
  title: string;
  members: string;
  published_at: string;
  thumbnail: string;
  description: string;
  /*
        "file": {
          "url": "https://storage.googleapis.com/golden-wind/nextlevelweek/05-podcastr/audios/opensource.m4a",
          "type": "audio/x-m4a",
          "duration": 3981
        }
        */
}

type HomeProps = {
  episodes: Array<Episode>
}

export default function Home(props) {
  return (
    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  )
}

export const getStaticProps = async() =>{
  const { data } = await api.get('episodes', {
    params:{
      _limit:12,
      _sort:'published_at',
      _order:'desc'
    }
  })
 

  return{

    props:{
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  }

} 

