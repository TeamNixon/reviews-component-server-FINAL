import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'; //close icon, info

class WriteReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      review: {
        rank: 0
      }
    };

    //bind functions here
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeRating = this.handleChangeRating.bind(this);
  }

  componentDidMount() {
  }

  closeModal() {
    this.props.onCloseModal();
  }

  handleChange(event, field) {
    this.setState({
      ...this.state,
      review: {
        ...this.state.review,
        [field]: event.target.value
      }
    });
  }

  handleChangeRating(newRating, field) {
    this.setState({
      ...this.state,
      review: {
        ...this.state.review,
        [field]: newRating
      }
    });
  }

  handleUploadImage(event) {
    event.preventDefault();
    // TODO
  }

  handleUploadVideo(event) {
    event.preventDefault();
    // TODO
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmitReview(this.state.review);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Container>
          <Row>
            <Col sm={12} style={{'textAlign': 'right'}}>
              <FontAwesomeIcon icon={faTimes} style={{'cursor': 'pointer'}} onClick={() => this.closeModal()} />
            </Col>
          </Row>
          <Row>
            <Col sm={9}>
              <div style={{'fontSize': '20px'}}>Please share your experience</div>
              <div style={{'fontSize': '12px', 'color': '#333333'}}>{this.props.product.title}</div>
              <div style={{'fontSize': '16px', 'marginTop': '12px'}}>Your feedback will help other shoppers make good choices, and we'll use it to improve our products.</div>
              <div style={{'fontSize': '14px', 'marginTop': '12px'}}>Review guidelines</div>
            </Col>
            {this.props.product.images && this.props.product.images[0] && (<Col sm={3}>
              <img src={this.props.product.images[0]} />
            </Col>)}
            {(!this.props.product.images || !this.props.product.images[0]) && (<Col sm={3}>&nbsp;</Col>)}
          </Row>
          <Row style={{'marginTop': '48px'}}>
            <Col sm={12}>
                    Overall Rating <span className="required">*</span>
            </Col>
          </Row>
          <Row style={{'marginTop': '8px'}}>
            <Col sm={12}>
              <StarRatings
                rating={this.state.review.rating}
                starRatedColor="black"
                changeRating={this.handleChangeRating}
                numberOfStars={5}
                name='rating'
              />
            </Col>
          </Row>
          <Row style={{'marginTop': '16px'}}>
            <Col sm={12}>
                    Review <span className="required">*</span>
            </Col>
          </Row>
          <Row style={{'marginTop': '8px'}}>
            <Col sm={12}>
              <textarea rows="5" style={{'width': '100%'}} onChange={(e) => this.handleChange(e, 'body')}>
                {this.state.review.body}
              </textarea>
              <span class="infotext"><FontAwesomeIcon icon={faInfoCircle} /> Make your review great: Describe what you liked, what you didn't like, and other key things shoppers should know (minimum 5 characters)</span>
            </Col>
          </Row>
          <Row style={{'marginTop': '16px'}}>
            <Col sm={12}>
                    Review Title
            </Col>
          </Row>
          <Row style={{'marginTop': '8px'}}>
            <Col sm={12}>
              <input type="text" style={{'width': '100%'}} onChange={(e) => this.handleChange(e, 'title')} />
              <span class="infotext"><FontAwesomeIcon icon={faInfoCircle} /> Your overall impression (150 characters or less)</span>
            </Col>
          </Row>
          <Row style={{'marginTop': '16px'}}>
            <Col sm={12}>
                    Photos or Videos
            </Col>
          </Row>
          <Row style={{'marginTop': '8px'}}>
            <Col sm={12}>
              <div>
                <button type="button" className="outlineButton" onClick={this.handleUploadImage}>
                            Add Photo
                </button>
                <button type="button" className="outlineButton" onClick={this.handleUploadVideo}>
                            Add Video
                </button>
              </div>
              <span class="infotext"><FontAwesomeIcon icon={faInfoCircle} /> You may add up to five photos or videos</span>
            </Col>
          </Row>
          <Row style={{'marginTop': '16px'}}>
            <Col sm={12}>
              <button class="writeAReview" type="submit">Submit</button>
            </Col>
          </Row>
        </Container>
      </form>
    );
  }
}

export default WriteReview;
