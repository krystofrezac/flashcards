import { DropdownProps } from './Dropdown.types';

const Dropdown: React.FC<DropdownProps> = props => (
  <div className="dropdown dropdown-end">
    <button tabIndex={0}>{props.trigger}</button>
    <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
      {props.options.map(option => (
        <li key={option.key}>{option}</li>
      ))}
    </ul>
  </div>
);

export default Dropdown;
