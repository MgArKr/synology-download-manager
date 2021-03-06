import * as React from 'react';

import {
  VisibleTaskSettings,
  TaskSortType,
  ORDERED_TASK_SORT_TYPE_NAMES,
  ORDERED_VISIBLE_TASK_TYPE_NAMES
} from '../state';

import { SettingsList } from './SettingsList';
import { SettingsListCheckbox } from './SettingsListCheckbox';

export interface Props {
  visibleTasks: VisibleTaskSettings;
  taskSortType: TaskSortType;
  updateTaskTypeVisibility: (taskType: keyof VisibleTaskSettings, visibility: boolean) => void;
  updateTaskSortType: (taskSortType: TaskSortType) => void;
}

export class TaskFilterSettingsForm extends React.PureComponent<Props> {
  render() {
    return (
      <div className='task-filter-settings-form'>
        <SettingsList>
          {Object.keys(ORDERED_VISIBLE_TASK_TYPE_NAMES).map((type: keyof VisibleTaskSettings) => (
            <SettingsListCheckbox
              key={type}
              checked={this.props.visibleTasks[type]}
              onChange={() => {
                this.props.updateTaskTypeVisibility(type, !this.props.visibleTasks[type]);
              }}
              label={ORDERED_VISIBLE_TASK_TYPE_NAMES[type]}
            />
          ))}
        </SettingsList>
        <div className='task-sort-type'>
          <span className='label'>
            {browser.i18n.getMessage('Order_tasks_by')}
          </span>
          <select
            value={this.props.taskSortType}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              this.props.updateTaskSortType(e.currentTarget.value as TaskSortType);
            }}
          >
            {Object.keys(ORDERED_TASK_SORT_TYPE_NAMES).map((type: TaskSortType) => (
              <option key={type} value={type}>
                {ORDERED_TASK_SORT_TYPE_NAMES[type]}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}
