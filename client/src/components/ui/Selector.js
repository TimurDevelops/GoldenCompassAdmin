import React, {useState} from "react";
import PropTypes from "prop-types";

import './Selector.scss';

const Selector = ({items, onChange, label, valueField}) => {
  const [open, setOpen] = useState(false)


  return (
    <div className={'selector-wrapper'}>
      <div className={'items-wrapper'}>
        <div className={'placeholder'} onClick={() => items.length && setOpen(true)}>
          {items.length ? label : 'Значения отсутствуют...'}
        </div>

        {open && <div className={'selector-bg'} onClick={() => setOpen(false)}/>}


        {open && <div className={'items'}>
          {
            items.map(i => <div key={i[valueField]} className={'s-item-wrapper'} onClick={() => {
              setOpen(false);
              onChange(i[valueField]);
            }}>{i.html}</div>)
          }
        </div>
        }
      </div>
    </div>
  )
}


Selector.propTypes = {
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  valueField: PropTypes.string.isRequired,
};

export default Selector;