import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Button from "@mui/material/Button";

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
  flex: "0 0 15%", //number of slides - show 6
  minWidth: 0,
  padding: "0, 8px"
},

  buttonContainer: {
    marginTop: "16px",
    display: "flex",
    gap: "8px",
  },
};

const ImageCarousel: React.FC = () => {
  
   const [emblaRef, emblaApi] = useEmblaCarousel({
  loop: false,
  slidesToScroll: "auto",
});

   const scrollPrev = () => emblaApi?.scrollPrev();
   const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div style={styles.embla}>
      <div style={styles.emblaViewport} ref={emblaRef}>
        <div style={styles.emblaContainer}>
          <div style={styles.emblaSlide}>Slide 1</div>
          <div style={styles.emblaSlide}>Slide 2</div>
          <div style={styles.emblaSlide}>Slide 3</div>
          <div style={styles.emblaSlide}>Slide 4</div>
          <div style={styles.emblaSlide}>Slide 5</div>
          <div style={styles.emblaSlide}>Slide 6</div>
        </div>
      </div>

     <div style={styles.buttonContainer}>
        <Button onClick={scrollPrev}>Previous</Button>
            <Button onClick={scrollNext}>Next</Button>
      </div>
    </div>
  )
};



export default ImageCarousel;