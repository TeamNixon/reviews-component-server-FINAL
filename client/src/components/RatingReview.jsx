import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import StarRatings from 'react-star-ratings';
import styled from 'styled-components';
import moment from 'moment';
import 'moment-timezone';

/*
  <FontAwesomeIcon icon={faHeart}/>
  <FontAwesomeIcon icon={faFlag}/>
*/

class RatingReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    //bind functions here

  }

  componentDidMount() {
  }

  render() {
    console.log('Rendering review', this.props.review);
    return (
      <Container className="reviewBar">
        <Row style={{width: '100%'}}>
          <Col sm={3}>
            <div className="reviewUserInfo">
              <div className="userRating">
                <StarRatings
                  rating={this.props.review.rating || 0}
                  starDimension="24px"
                  starSpacing="4px"
                />
              </div>
              <div className="date">{moment(this.props.review.date, 'YYYY-MM-DDTHH:mm:ss.SSS').format('MMM Do, YYYY')}</div>
              <div className="userName">{this.props.review.name}</div>
            </div>
          </Col>
          <Col sm={6}>
            <div className="reviewTitle">{this.props.review.title}</div>
            <div className="reviewBody">{this.props.review.body}</div>
          </Col>
          <Col sm={3}>
            <div className="styleChoice">  </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default RatingReview;
