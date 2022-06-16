import { AiOutlineDown } from 'react-icons/ai';
import Select from 'react-select';

const DropdownIndicator = () => (
  <div className="pr-2">
    <AiOutlineDown className="text-atlantis-500 text-sm" />
  </div>
);

const CustomDropdown = ({
  dropdownLabel = undefined,
  options,
  placeholder = 'Select',
  preSelectedValue = undefined,
  selectedValue,
  width,
  minWidth = 'auto',
  searchable = false,
  hideSelectedOptions = false,
  useThemev2 = false,
  menuPlacement = 'auto',
}: any) => {
  const customStyles = {
    menu: (state: any) => ({ ...state }),
    menuList: (provided: any) => ({
      ...provided,
      fontSize: '0.8rem',
      borderRadius: '0.5rem',
      backgroundColor: useThemev2 ? '#FFFFFF' : '#10171F',
      color: useThemev2 ? '#949494' : '#FFFFFF',
      maxHeight: '140px',
      overflowY: 'auto',
      // width: `${width}%`,
      // textAlign: 'right',
    }),
    control: (base: any) => ({
      ...base,
      border: 0,

      backgroundColor: useThemev2 ? '#2626D9' : '#10171F',
      boxShadow: 'none',
      borderRadius: '0.5rem',
      paddingTop: '0.6rem',
      paddingBottom: '0.6rem',
      paddingLeft: '0.25rem',
      // paddingRight: '0.25rem',
      paddingRight: '2rem',
      fontSize: '0.9rem',
      width: width ? `${width}%` : 'auto',
      minWidth,
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#ffffff',
    }),
    input: (base: any) => ({
      ...base,
      color: useThemev2 ? '#C5CFF4' : '#ffffff',
    }),
  };

  const themev1 = {
    primary25: '#808080', // color for menu hover
    primary75: '#808080',
    primary: '#808080',
    primary50: '#808080',
    neutral0: '#0D131B',
    neutral50: 'white',
  };
  const themev2 = {
    primary25: '#EAEAEA',
    primary75: '#FFFFFF',
    primary: '#FFFFFF',
    primary50: '#2626D9',
    neutral0: '#949494',
    neutral50: '#FFFFFF',
  };
  return (
    <Select
      // menuIsOpen
      className="flex"
      options={options}
      placeholder={placeholder}
      styles={customStyles}
      isSearchable={searchable}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          ...(useThemev2 ? themev2 : themev1),
        },
      })}
      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator,
      }}
      value={preSelectedValue}
      onChange={(val): any => {
        if (dropdownLabel) {
          selectedValue(dropdownLabel, val);
        } else {
          selectedValue(val);
        }
      }}
      hideSelectedOptions={hideSelectedOptions}
      menuPlacement={menuPlacement}
    />
  );
};

export default CustomDropdown;
