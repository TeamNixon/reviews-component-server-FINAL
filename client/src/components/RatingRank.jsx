import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import StarRatings from 'react-star-ratings';
import { Container, Row, Col } from 'react-grid-system';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons'; //solid heart, solid star
//import { fasHeart } from '@fortawesome/free-regular-core-icons';
//open heart
//open flag
import { faFlag } from '@fortawesome/free-solid-svg-icons';//solid flag
import WriteReview from './WriteReview.jsx';

/*
  <FontAwesomeIcon icon={faHeart}/>
  <FontAwesomeIcon icon={faFlag}/>
*/

const RectangleBackground = styled.div`
    display: inline-block;
    width: calc(100% - 100px);
    height: 24px;
    background-color: #999999;
    margin-bottom: 4px;

    span {
        display: inline-block;
        height: 100%;
        background-color: #000000;
    }
`;

ReactModal.setAppElement('#app');

class RatingRank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showReviewModal: false
    };

    this.reviewModalStyles = {
      content: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 'auto'
      }
    };

    //bind functions here
    this.showReviewModal = this.showReviewModal.bind(this);
    this.closeReviewModal = this.closeReviewModal.bind(this);
    this.onSubmitReview = this.onSubmitReview.bind(this);
  }

  formatRating(val) {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(val);
  }

  formatPct(val) {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1
    }).format(val);
  }

  componentDidMount() {

  }

  showReviewModal () {
    this.setState({ showReviewModal: true });
  }

  async onSubmitReview(review) {
    try {
      await this.props.onSubmitReview(review);
      this.setState({ showReviewModal: false });
    } catch (e) {
      console.log('Error submitting review!', e);
    }
  }

  closeReviewModal () {
    this.setState({ showReviewModal: false });
  }

  render() {
    console.log('In RatingRank render', this.props);
    return (
      <Row style={{width: '100%'}}>
        <Col sm={4}>
          <div style={{'textAlign': 'left'}}>
            <div className="ratingBar">
              <div className="overallRating" style={{'textAlign': 'center', 'width': '100%'}}>
                <div style={{'fontSize': '24px', 'fontWeight': 'bold'}}>{this.formatRating(this.props.rankings.overallRating)}</div>
                <div style={{'textAlign': 'center'}}>
                  <StarRatings
                    rating={this.props.rankings.overallRating || 0}
                    starRatedColor="black"
                    starDimension="40px"
                    starSpacing="15px"
                  />
                </div>
                <div>{this.props.rankings.total} Ratings</div>
                <br />
                <div>
                  <button
                    className="writeAReview"
                    type='button'
                    onClick={() => this.showReviewModal()}
                  >
                            WRITE A REVIEW
                  </button>
                </div>
              </div>
              <ReactModal
                isOpen={this.state.showReviewModal}
                contentLabel="Minimal Modal Example"
                style={this.reviewModalStyles}
              >
                <WriteReview product={this.props.product}
                  onSubmitReview={this.onSubmitReview}
                  onCloseModal={() => this.closeReviewModal()}></WriteReview>
              </ReactModal>
            </div>
          </div>
        </Col>
        <Col sm={4}>
          <div style={{'textAlign': 'center', 'marginBottom': '12px', 'fontSize': '16px', 'fontWeight': 'bold'}}>
            <div>{this.props.rankings.total} Ratings</div>
          </div>
          <div style={{'textAlign': 'left'}}>
            {this.props.rankings.breakdowns.map(breakdown => {
              return (
                <div key={breakdown.level}>
                  <FontAwesomeIcon icon={faStar} />
                  <div style={{width: '20px', 'display': 'inline-block', 'textAlign': 'center'}}>{breakdown.level}</div>
                  <RectangleBackground>
                    <span style={{width: String(breakdown.pct) + '%'}}>&nbsp;</span>
                  </RectangleBackground>
                  <div style={{width: '56px', 'display': 'inline-block', 'paddingLeft': '4px'}}> {this.formatPct(breakdown.pct)}%</div>
                </div>
              );
            })}
          </div>
        </Col>
      </Row>
    );
  }
}

export default RatingRank;
