import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Button from "@mui/material/Button";
import { CastMember, CrewMember} from "../../types/interfaces";
import PersonCard from "../personCard";

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

interface ImageCarouselProps {
people: (CastMember | CrewMember)[]; 
}

const ImageCarousel: React.FC <ImageCarouselProps>= ({people}) => {
  
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
            {people.map((person) => (
              <div key={person.id} style={styles.emblaSlide}>
                <PersonCard person={person} />
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



export default ImageCarousel;