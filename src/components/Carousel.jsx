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
      <div className="flex w-full gap-4">
        <img
          className="h-96 w-96 object-cover"
          src={images[active]}
          alt="animal hero"
        />
        <div className="flex w-full gap-4">
          {images.map((img, index) => (
            // eslint-disable-next-line
            <img
              className={`h-20 rounded-full ${
                index === active
                  ? "outline outline-4 outline-offset-1 outline-red-500"
                  : ""
              }`}
              key={img}
              src={img}
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
