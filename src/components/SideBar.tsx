import { useEffect, useState } from "react"

import { api } from '../services/api';
import { Button } from '../components/Button';
import '../styles/sidebar.scss';



interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}
interface SideBarProps {
  selectedGenre: GenreResponseProps,
  onSetGenre: (genre: GenreResponseProps) => void,
}


export function SideBar({ onSetGenre, ...rest }: SideBarProps) {

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${rest.selectedGenre.id || 1}`).then(response => {
      handleGenreChange(response.data);
    })
  }, [rest.selectedGenre.id]);


  function handleGenreChange(data: GenreResponseProps) {
    setSelectedGenre(data);
    onSetGenre(data)
  }
  // Complete aqui
  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => onSetGenre(genre)}
            selected={rest.selectedGenre.id === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}