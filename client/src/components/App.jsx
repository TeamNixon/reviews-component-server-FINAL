import 'regenerator-runtime/runtime';
import React from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import RatingRank from './RatingRank.jsx';
import RatingFilters from './RatingFilters.jsx';
import RatingReview from './RatingReview.jsx';
import RatingActions from './RatingActions.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.productid = 0;
    this.currentPage = 0;
    this.state = {
      hasMoreReviews: false,
      reviewsPages: {},
      totalReviews: 0,
      product: null,
      rankings: {
        total: 0,
        overallRating: 0,
        breakdowns: []
      }
    };

    //bind functions here
    this.filterBy = this.filterBy.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.submitReview = this.submitReview.bind(this);
  }

  async componentDidMount() {
    // Get the product data for the product we're reviewing,
    // ideally this ID will come from the current route,
    // e.g. if your route is /review/:id
    // Then you get the parameter like this:  this.props.match.params.id
    this.productid = '5ec0521f6aaf68556ff6d0f5'; //change productid based on any id built from the newly seeded data
    await this.getProduct();
    await this.getRankings();
    await this.nextPage(0);
  }

  async getProduct() {
    return axios.get('http://localhost:1738/api/product/' + String(this.productid))
      .then(response => {
        this.setState({
          product: response.data.product
        });
      })
      .catch(err => {
        console.log('Error loading product', err);
      });
  }

  async getRankings() {
    return axios.get('http://localhost:1738/api/rankings/' + String(this.productid))
      .then(response => {
        console.log('Got rankings', response.data);
        this.setState({
          totalReviews: response.data.rankings.total,
          rankings: response.data.rankings
        });
      })
      .catch(err => {
        console.log('Error loading product', err);
      });
  }

  async toggleLike(review) {
    if (!review.myLike) {
      review.myLike = 1;
      review.likes++;
      let pages = Object.keys(this.state.reviewsPages);
      for (let page of pages) {
        let reviews = this.state.reviewsPages[page];
        console.log('Existing reviews', reviews);
        let pos = reviews.findIndex(r => {
          return r._id === review._id;
        });
        if (-1 !== pos) {
          reviews.splice(pos, 1, review);
          console.log('Subbed review', reviews);
          this.setState({
            reviewsPages: {
              ...this.state.reviewsPages,
              [page]: reviews
            }
          });
          break;
        }
      }
      await axios.post('http://localhost:1738/api/reviewlike/' + String(review._id));
    }
  }

  async toggleDislike(review) {
    if (!review.myLike) {
      review.myLike = -1;
      review.dislikes++;
      let pages = Object.keys(this.state.reviewsPages);
      for (let page of pages) {
        let reviews = this.state.reviewsPages[page];
        let pos = reviews.findIndex(r => {
          return r._id === review._id;
        });
        if (-1 !== pos) {
          reviews.splice(pos, 1, review);
          this.setState({
            reviewsPages: {
              ...this.state.reviewsPages,
              [page]: reviews
            }
          });
          break;
        }
      }
      await axios.post('http://localhost:1738/api/reviewdislike/' + String(review._id));
    }
  }

  async flagReview(review) {
    review.flagged = true;
    let pages = Object.keys(this.state.reviewsPages);
    for (let page of pages) {
      let reviews = this.state.reviewsPages[page];
      let pos = reviews.findIndex(r => {
        return r._id === review._id;
      });
      if (-1 !== pos) {
        reviews.splice(pos, 1, review);
        this.setState({
          reviewsPages: {
            ...this.state.reviewsPages,
            [page]: reviews
          }
        });
        break;
      }
    }
    // TODO:  Save
  }

  async filterBy(newFilters) {
    this.setState({
      filters: {
        ...newFilters
      },
      reviewsPages: {}
    }, async () => {
      await this.nextPage(0);
    });
  }

  async nextPage(page) {
    console.log('Getting page', page);
    this.currentPage = page + 1;
    let params = {
      page: page
    };
    if (this.state.filters && this.state.filters.levels && (this.state.filters.levels.length > 0)) {
      params.levels = this.state.filters.levels.join(',');
    }
    return axios.get('http://localhost:1738/api/reviews/' + String(this.productid), {
      params: params
    })
      .then(response => {
        let currentCount = Object.keys(this.state.reviewsPages).reduce((total, pageNum) => {
          return this.state.reviewsPages[pageNum].length;
        }, 0);
        currentCount += response.data.reviews.length;
        this.setState({
          reviewsPages: {
            ...this.state.reviewsPages,
            [String(page)]: response.data.reviews,
          },
          totalReviews: response.data.total,
          hasMoreReviews: (response.data.reviews.length > 0) && (response.data.total > currentCount)
        });
      })
      .catch(err => {
        console.log('Error getting reviews', err);
      });
  }

  async submitReview(review) {
    console.log('Submitting review', review);
    return axios.post('http://localhost:1738/api/reviews/' + String(this.productid), review)
      .then(response => {
        console.log(response);
        let reviews = [response.data.review].concat(this.state.reviewsPages['0']);
        console.log('Setting reviews', reviews);
        this.setState({
          reviewsPages: {
            ...this.state.reviewsPages,
            ['0']: reviews
          }
        });
      });
  }

  render() {
    console.log('In render');
    return (
      <div>
        <h1 className="header">Reviews</h1>
        <hr className="blackLine"></hr>
        <RatingRank product={this.state.product}
          rankings={this.state.rankings}
          onSubmitReview={this.submitReview}></RatingRank>
        <br></br>
        <RatingFilters filters="this.state.filters" onFilter={this.filterBy}></RatingFilters>
        <br />
        <InfiniteScroll
          pageStart={0}
          loadMore={this.nextPage}
          hasMore={this.state.hasMoreReviews}
          loader={<div className="loader" key={this.currentPage}>Loading ...</div>}
        >
          {Object.keys(this.state.reviewsPages).map(pageNum => {
            return (
              this.state.reviewsPages[pageNum].map(review => {
                return (
                  <div key={review._id}>
                    <RatingReview review={review}></RatingReview>
                    <br/>
                    <RatingActions review={review}
                      toggleLike={() => this.toggleLike(review)}
                      toggleDislike={() => this.toggleDislike(review)}
                      flagReview={() => this.flagReview(review)}
                    ></RatingActions>
                  </div>
                );
              })
            );
          })}
        </InfiniteScroll>
      </div>
    );
  }
}

export default App;
