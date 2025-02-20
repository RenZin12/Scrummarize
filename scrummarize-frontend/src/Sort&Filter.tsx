import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faFilter } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import './Sort&Filter.css';

export function SortButton(props: { sort: (option: string) => Promise<void> }) {
  const [showOptions, setShowOptions] = useState(false);

  function action(option: string) {
    props.sort(option);
    setShowOptions(false);
  }

  return (
    <div className="sort-filter__container">
      <button
        className="sort-filter__button"
        onClick={() => setShowOptions((prev) => !prev)}
      >
        <FontAwesomeIcon icon={faSort} className="sort-filter__icon" />
      </button>
      {showOptions && (
        <div className="sort-filter__options">
          <p onClick={() => action('lowtohigh')}>Low to High Priority</p>
          <p onClick={() => action('hightolow')}>High to Low Priority</p>
          <p onClick={() => action('oldtorecent')}>Old to Recently Created</p>
          <p onClick={() => action('recenttoold')}>Recently to old Created</p>
        </div>
      )}
    </div>
  );
}

export function FilterButton(props: {
  filter: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  options: string[];
}) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="sort-filter__container">
      <button
        className="sort-filter__button"
        onClick={() => setShowOptions((prev) => !prev)}
      >
        <FontAwesomeIcon icon={faFilter} className="sort-filter__icon" />
      </button>
      {showOptions && (
        <div className="sort-filter__options">
          <div className="filter__option">
            <label htmlFor="frontend">Frontend</label>
            <input
              id="frontend"
              type="checkbox"
              value="Frontend"
              onChange={props.filter}
              checked={props.options.includes('Frontend')}
            />
          </div>
          <div className="filter__option">
            <label htmlFor="backend">Backend</label>
            <input
              id="backend"
              type="checkbox"
              value="Backend"
              onChange={props.filter}
              checked={props.options.includes('Backend')}
            />
          </div>
        </div>
      )}
    </div>
  );
}
