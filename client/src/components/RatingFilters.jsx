import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import Select from 'react-select';

class RatingFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.starOptions = [
      { value: '5', label: '5 stars' },
      { value: '4', label: '4 Stars' },
      { value: '3', label: '3 Stars' },
      { value: '2', label: '2 Stars' },
      { value: '1', label: '1 Star' }
    ];

    //bind functions here
    this.chooseStarFilter = this.chooseStarFilter.bind(this);
  }

  chooseStarFilter(options, action) {
    let levels = [];
    (options || []).forEach(option => {
      levels.push(parseInt(option.value));
    });
    this.props.onFilter({
      ...this.props.filters,
      levels: levels
    });
  }

  render() {
    console.log('In RatingFilters render', this.props);
    return (
      <div className="filtersBar">
        <Row style={{'width': '100%'}}>
          <Col sm={3}>
                    Filter by Stars
          </Col>
        </Row>
        <Row style={{'width': '100%'}}>
          <Col sm={3}>
            <Select options={this.starOptions}
              closeMenuOnSelect={false}
              onChange={this.chooseStarFilter}
              isMulti></Select>
          </Col>
        </Row>
      </div>
    );
  }
}

export default RatingFilters;
