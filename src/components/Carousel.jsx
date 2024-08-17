import { Component } from "react";
import { IMAGES_URL } from "../helpers/constants";

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: [`${IMAGES_URL}/pets/none.jpg`],
  };

  handleIndexClick = (e) => {
    this.setState({ ...this.state, active: Number(e.target.dataset.index) });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="carousel">
        <img src={images[active]} alt="animal hero" />
        <div className="carousel-smaller">
          {images.map((img, index) => (
            // eslint-disable-next-line
            <img
              key={img}
              src={img}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
              onClick={this.handleIndexClick}
              data-index={index}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
