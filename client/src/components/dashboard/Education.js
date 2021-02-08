import React, { Fragment } from 'react';
import Moment from 'react-moment'; 
import moment from 'moment';
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux'; 
import { deleteEducation } from '../../actions/profile';

const Education = ({ education, deleteEducation }) => {
  console.log('Education: '); 
  console.log(education); 
  if(!education) { 
    return null; 
  }

  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
      <Moment format="YYYY/MM/DD">{moment.utc(edu.from)}</Moment> -{' '}
        {edu.to === null ? (
          ' Now'
        ) : (
          <Moment format="YYYY/MM/DD">{moment.utc(edu.to)}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => { deleteEducation(edu._id) }}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  )); 
  return (
    <Fragment>
      <h2 className="my-2">Education</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{ educations }</tbody>
      </table>
    </Fragment>
  );
}

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);