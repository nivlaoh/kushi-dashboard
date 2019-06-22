import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isFunction } from 'lodash';

import { capitaliseFirstLetter } from '../../../utils/stringUtil';

import './styles.scss';

const RenderedCell = ({ columnKey, value, row, cellRenderer }) => {
  return cellRenderer[columnKey](value, row);
}

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnNames: props.rowData.length > 0 ? Object.keys(props.rowData[0]) : [],
    };
  }

  computeCellClass = (key) => {
    const {
      columnDefinition,
    } = this.props;

    let cellClass = 'tableCell';
    const definition = columnDefinition.find(col => col.id === key);
    if (!isEmpty(definition) && !isEmpty(definition.align)) {
      cellClass += ` ${definition.align}`;
    }
    return cellClass;
  };

  displayColumnName = (columnName) => {
    const {
      columnDefinition,
    } = this.props;

    const colDefinition = columnDefinition.find(col => col.id === columnName);
    if (!isEmpty(colDefinition) && !isEmpty(colDefinition.name)) {
      return colDefinition.name;
    }
    return capitaliseFirstLetter(columnName);
  };

  render() {
    const {
      rowData,
      noRowText,
      showColumns,
      showColumnNames,
      tableClass,
      hasHeader,
      hasFooter,
      cellRenderer,
    } = this.props;
    const {
      columnNames,
    } = this.state;

    

    return (
      <div className={`table ${tableClass}`}>
        { showColumnNames && hasHeader &&
          <div className="row tableHeader">
            { columnNames.map(columnName => showColumns.length === 0 || showColumns.includes(columnName) ? (
            <div key={columnName} className={this.computeCellClass(columnName)}>
              { this.displayColumnName(columnName) }
            </div>
          ) : null)}
          </div>
        }
        <div className="tableBody">
          { rowData.map(row => (
            <div key={row.id} className="row tableRow">
              { Object.keys(row).map(key => showColumns.length === 0 || showColumns.includes(key) ? (
                <div key={row[key]} xs={key} className={this.computeCellClass(key)}>
                  { isEmpty(cellRenderer) || !isFunction(cellRenderer[key]) ?
                    row[key] :
                    <RenderedCell
                      cellRenderer={cellRenderer}
                      columnKey={key}
                      value={row[key]}
                      row={row}
                    />
                  }
                </div>
              ) : null)}
            </div>
          ))}
          { rowData.length === 0 &&
            <div className="row tableRow center">
              { noRowText }
            </div>
          }
        </div>
        { hasFooter &&
          <div className="row tableFooter">Footer</div>
        }
      </div>
    );
  }
}

Table.propTypes = {
  rowData: PropTypes.arrayOf(PropTypes.shape({})),
  noRowText: PropTypes.string,
  showColumns: PropTypes.arrayOf(PropTypes.string),
  showColumnNames: PropTypes.bool,
  columnDefinition: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    align: PropTypes.string,
  })),
  tableClass: PropTypes.string,
  hasHeader: PropTypes.bool,
  hasFooter: PropTypes.bool,
  cellRenderer: PropTypes.shape({}),
};

Table.defaultProps = {
  rowData: [],
  noRowText: 'No records',
  showColumns: [],
  showColumnNames: true,
  columnDefinition: [],
  tableClass: '',
  hasHeader: true,
  hasFooter: false,
  cellRenderer: null,
};

export default Table;
