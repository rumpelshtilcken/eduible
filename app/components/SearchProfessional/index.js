import { Component } from 'react';
import PropTypes from 'prop-types';

import {
  InputRange,
  Loader
} from 'components';
import SearchTextInputContainer from 'containers/SearchTextInputContainer';
import SelectDropDownContainer from 'containers/SelectDropDownContainer';
import ProfessionalCard from './ProfessionalCard';
import stylesheet from './index.css';

class ProfessionalSearch extends Component {
  static propTypes = {
    handleRangeChange: PropTypes.func,
    jobTitles: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    onProfessionalChoose: PropTypes.func.isRequired,
    onRequestButtonClick: PropTypes.func.isRequired,
    professionals: PropTypes.array.isRequired,
    universities: PropTypes.array.isRequired
  };

  orderBy = [
    { key: 'LOWEST PRICE', label: 'LOWEST PRICE', value: 'price_ASC' },
    { key: 'HIGHEST PRICE', label: 'HIGHEST PRICE', value: 'price_DESC' }
  ];

  prepareDataToSelectDropdown = data => data.map(item => ({
    key: item.id,
    label: item.name || item.title,
    value: item.id
  }));

  handleRangeChange = ({ minCost, maxCost }) =>
    this.props.handleRangeChange({ min: minCost, max: maxCost });

  renderProfessional = (professional) => {
    const handleRequestCallClick = (e) => {
      e.stopPropagation();
      this.props.onRequestButtonClick({
        professionalId: professional.id
      });
    };

    const handleProfessionalChoose = () =>
      this.props.onProfessionalChoose({
        userId: professional.user.id
      });

    return (
      <ProfessionalCard
        key={professional.id}
        professional={professional}
        onRequestButtonClick={handleRequestCallClick}
        onProfessionalChoose={handleProfessionalChoose}
      />
    );
  };

  renderLeftFilters = () => {
    const universities = this.props.universities &&
      [
        { key: 'Default Value', label: 'University', value: '' },
        ...this.prepareDataToSelectDropdown(this.props.universities)
      ];
    const jobTitles = this.props.jobTitles &&
      [
        { key: 'Default Value', label: 'Profession', value: '' },
        ...this.prepareDataToSelectDropdown(this.props.jobTitles)
      ];

    return (
      <div className="selects">
        <div className="hidden labels">FILTERS</div>
        {universities &&
        <SelectDropDownContainer
          reduxStoreName="universityId"
          options={universities}
        />}
        {jobTitles &&
        <SelectDropDownContainer
          options={jobTitles}
          reduxStoreName="jobTitleId"
        />}
        <div className="hidden">
          <p className="hidden labels">PRICE RANGE</p>
          <InputRange onChange={this.handleRangeChange} />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="con">
        <p className="title">Browse through more than 1000+ professionals in the US </p>
        <SearchTextInputContainer placeholder="search by name, profession, degree..." />
        <hr />
        <div className="step">
          {this.renderLeftFilters()}
          <div className="profs">
            <SelectDropDownContainer
              options={this.orderBy}
              reduxStoreName="orderBy"
              transparent
            />
            { this.props.loading
              ? <Loader />
              : (this.props.professionals && this.props.professionals.map(
                this.renderProfessional))
            }
          </div>
        </div>

        <style jsx global> {stylesheet} </style>
      </div>
    );
  }
}

export default ProfessionalSearch;
