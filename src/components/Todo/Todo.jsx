import React, { Component } from 'react';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../shared/components/Button';
import Checkbox from '../../shared/components/Checkbox';
import Dialog from '../../shared/components/Dialog';
import Table from '../../shared/components/Table';

import './styles.scss';

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddDialog: false,
      rows: [
        { id: 'Hi', description: 'To do #1', status: 'NEW' },
        { id: 'Hello', description: 'To do #2', status: 'DONE' },
        { id: 'something', description: 'To do #3', status: 'DONE' },
        { id: '3', description: 'To do #4', status: 'NEW' },
        { id: '4', description: 'To do #5', status: 'NEW' },
        { id: '5', description: 'To do #6', status: 'NEW' },
        { id: '6', description: 'To do #7', status: 'NEW' },
      ],
    };
  }

  componentWillUnmount() {
    clearTimeout(this.cancelTask);
    this.cancelTask = null;
  }

  toggleTodo = (e) => {
    const {
      rows,
    } = this.state;

    const findRowIndex = rows.findIndex(row => row.id === e.target.getAttribute('refkey'));
    if (findRowIndex !== -1) {
      const findRow = {
        ...rows[findRowIndex],
        status: rows[findRowIndex].status === 'NEW' ? 'DONE' : 'NEW',
      };
      this.setState({
        rows: [
          ...rows.slice(0, findRowIndex),
          findRow,
          ...rows.slice(findRowIndex + 1),
        ],
      }, () => {
        if (findRow.status === 'DONE') {
          this.cancelTask = setTimeout(() => {
            this.setState({
              rows: [
                ...rows.slice(0, findRowIndex),
                ...rows.slice(findRowIndex + 1),
              ],
            });
          }, 1000);
        }
      });
    }
  };

  newTodo = () => {
    this.setState({
      showAddDialog: true,
    });
  };

  dismissAddTodo = () => {
    this.setState({
      showAddDialog: false,
    });
  };

  addTodo = (todoText) => {
    const {
      rows,
    } = this.state;

    this.setState({
      showAddDialog: false,
      rows: [
        { id: `${rows.length}`, description: todoText, status: 'NEW' },
        ...rows,
      ],
    });
  };

  render() {
    const showColumns = ['description', 'status'];
    const cellRenderer = {
      status: (val, row) => {
        return (<Checkbox
          refkey={row.id}
          checked={val === 'DONE'}
          onCheck={this.toggleTodo}
          inverseColour />)
      },
    };
    const columnDefinition = [
      { id: 'status', align: 'right' },
    ];
    const {
      rows,
      showAddDialog,
    } = this.state;

    return (
      <div style={{ height: 'inherit', paddingTop: '30px' }}>
        <div className="widgetName">Todo</div>
        <div className="widgetSettings">
          <Button type="icon-clear" rounded onClick={this.newTodo}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
        <Table
          tableClass="widgetTable"
          rowData={rows}
          showColumns={showColumns}
          showColumnNames
          cellRenderer={cellRenderer}
          columnDefinition={columnDefinition}
        />
        <Dialog
          mode="prompt"
          title="Add Todo"
          text="What do you want to do?"
          defaultPrompt="I want to..."
          show={showAddDialog}
          onConfirm={this.addTodo}
          onDismiss={this.dismissAddTodo}
        />
      </div>
    );
  }
}

export default Todo;
