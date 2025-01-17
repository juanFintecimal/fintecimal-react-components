import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import LongPlaceHolder from '../../LongPlaceHolder';
import LongError from '../../LongError';
import { isTextLong, defaultPlaceHolder } from '../../commons/utils';
import useStyles from './style';
import '../../styles/BaseInput.css';

const STATUS = {
  'Rechazado': '#C25B5B',
  'Cargado': '#5BC2C2',
  'Pendiente': '#C1C1C1',
};

const SearchInput = ({
  label,
  value,
  handleChange,
  searchConfig,
  searchApi,
  required,
  error,
  errorMessage,
  disabled,
  type,
  clear,
  onBlur,
  maxLength,
  statusOnly,
  status,
  autoComplete,
}) => {
  const classes = useStyles();
  const [labelWidth, setLabelWidth] = useState(0);
  const [results, setResults] = useState([]);
  const labelRef = React.useRef(null);
  const [mValue, setValue] = useState(value);

  const onClear = () => {
    setValue('');
    handleChange('');
  };

  useEffect(() => {
    setLabelWidth(labelRef.current.offsetWidth);
  }, [label, errorMessage]);

  const selectLabel = () => {
    if (error) {
      if (isTextLong(errorMessage)) {
        if (isTextLong(label)) return defaultPlaceHolder;
        return label;
      }
      return errorMessage;
    } else {
      if (isTextLong(label)) return defaultPlaceHolder;
      return label;
    }
  };

  const selectAdorment = () => {
    if (clear && value && !disabled) {
      return (
        <InputAdornment position="end">
          <IconButton aria-label="clear input" onClick={onClear} tabIndex="-1">
            <Clear /*className={classes.icon}*/ />
          </IconButton>
        </InputAdornment>
      );
    } else if (disabled && statusOnly) {
      return (
        <InputAdornment position="end">
          <h3 style={{ color: STATUS[status] }} className={classes.status}>{status}</h3>
        </InputAdornment>
      );
    }
  };

  const searchValue = async (val) => {
    const valuesFounded = await searchApi(val, searchConfig);
    setResults(valuesFounded);
  };

  const handleSelectItem = (item) => {
    const { _id, value: itemValue, phone } = item;
    setValue(`${_id} - ${itemValue} - ${phone}`);
    handleChange(`${_id} - ${itemValue} - ${phone}`);
    setResults([]);
  };

  const searchingFound = () => {
    return results.find(({ _id, value: val, phone }) => `${_id} - ${val} - ${phone}` === value);
  };

  const handleInputChange = (event) => {
    const { value: valueTarget } = event.target;
    setValue(valueTarget);
    if (!valueTarget) setResults([]);
    else if (valueTarget && searchingFound()) setResults([]);
    else if (valueTarget) searchValue(valueTarget)
  };


  const fixValue = (val) => {
    if (!val.includes('-')) return val;
    const newValue = val.split(' - ');
    newValue.shift();
    return newValue.join(' - ');
  }

  return (
    <div className={classes.root}>
      {isTextLong(label) && (
        <div>
          <LongPlaceHolder text={label} />
        </div>
      )}
      <FormControl className={classes.form} required={required} error={error} variant="outlined">
        <InputLabel
          ref={labelRef}
          className={classes.label}
          htmlFor="component-outlined"
          variant="outlined"
          classes={{
            asterisk: classes.asterisk,
          }}
        >
          {selectLabel()}
        </InputLabel>
        <OutlinedInput
          autoComplete={autoComplete}
          id="component-outlined"
          value={fixValue(mValue)}
          onChange={handleInputChange}
          labelWidth={labelWidth}
          className={classes.input}
          inputProps={{
            ...(maxLength ? { maxLength } : {}),
          }}
          endAdornment={selectAdorment()}
          classes={{
            notchedOutline: classes.notchedOutline,
            focused: classes.focusNotchedOutline,
          }}
          type={type}
          disabled={disabled}
        />
      </FormControl>
      {error && isTextLong(errorMessage) && <LongError text={errorMessage}></LongError>}
      
      {results.length > 0 && (
        <List className={classes.resultsList}>
          {results.map(result => (
            <ListItem 
              button 
              key={result._id} 
              onClick={() => handleSelectItem(result)} 
              className={classes.listItem}
            >
              <ListItemText primary={`${result.value} - ${result.phone}`} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

SearchInput.defaultProps = {
  value: '',
  required: false,
  error: false,
  type: 'text',
  clear: true,
  errorMessage: '',
  disabled: false,
  statusOnly: false,
  status: '',
  autoComplete: 'off',
  searchConfig: {},
  searchApi: () => {},
};

SearchInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  searchConfig: PropTypes.object,
  searchApi: PropTypes.func,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  type: PropTypes.string,
  clear: PropTypes.bool,
  errorMessage: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  statusOnly: PropTypes.bool,
  status: PropTypes.string,
  autoComplete: PropTypes.string,
  onClear: PropTypes.func,
  maxLength: PropTypes.number,
};

export default SearchInput;
