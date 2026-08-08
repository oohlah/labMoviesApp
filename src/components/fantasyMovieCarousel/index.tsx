import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Button from "@mui/material/Button";
import FantasyMovieList from "../fantasyMovieCard";
import type {FantasyMovie} from "../../types/interfaces";

const styles = {
  embla: {},

  emblaViewport: {
    overflow: "hidden",
  },

  emblaContainer: {
    display: "flex",
    touchAction: "pan-y pinch-zoom",
  },

  emblaSlide: {
  flex: "0 0 20%", //number of slides - show 6
  minWidth: 0,
  padding: "0, 8px"
},

  buttonContainer: {
    marginTop: "16px",
    display: "flex",
    gap: "8px",
  },
};

interface FantasyMovieCarouselProps {
movies: FantasyMovie[]; 
}

const FantasyMovieCarousel: React.FC <FantasyMovieCarouselProps>= ({movies}) => {
  
   const [emblaRef, emblaApi] = useEmblaCarousel({
  loop: false,
  slidesToScroll: "auto",
});



   const scrollPrev = () => emblaApi?.scrollPrev();
   const scrollNext = () => emblaApi?.scrollNext();

  return (
    <>
    <div style={styles.embla}>
        <div style={styles.emblaViewport} ref={emblaRef}>
          <div style={styles.emblaContainer}>
            {movies.map((movie) => (
              <div key={movie.id} style={styles.emblaSlide}>
                {/* // temp no action */}
                <FantasyMovieList movie={movie}/>
              </div>
            ))}
          </div>
        </div>
      </div>
        
     <div style={styles.buttonContainer}>
        <Button onClick={scrollPrev}>Previous</Button>
            <Button onClick={scrollNext}>Next</Button>
      </div>
   </>
  )
};



export default FantasyMovieCarousel;