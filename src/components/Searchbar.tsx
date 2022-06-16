import { Form, Formik } from 'formik';
// import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import CustomDropdown from './CustomDropdown';

/**
 * @description common Search-Bar
 * @param showCoinDropdown boolean flag enables display of custom dropdown for Coin Search (Note: coin list is fetched from redux)
 * @param showStrategyDropdown boolean flag enables display of custom dropdown for Strategies Search
 * @param strategies accepts array of object for strategy custom dropdown Array<{label, value}>
 * @param showMinAmount boolean flag enables display of input filed for amount
 * @param showMaxAmount boolean flag enables display of input filed for amount
 * @param showResetButton boolean flag enables display of Reset button
 * @emits showError returns string message
 * @emits onFilterChange returns filter object { coin:<string>, strategyName:<string>, totalBudget: { $gte:<number>, $lte:<number> }}
 * @returns React element
 */
const SearchBar = ({
  onFilterChange,
  showError,
  showCoinDropdown = false,
  showStrategyDropdown = false,
  strategies,
  showMinAmount = false,
  showMaxAmount = false,
  showResetButton = false,
}: any) => {
  // const { coinsList } = useSelector((state: any) => state);
  const location = useLocation();
  const param = useParams();
  const onFormSubmit = (values: any) => {
    let filtr = {};

    // FOR amount
    if (values.maxAmount === undefined && values.minAmount === undefined) {
      onFilterChange(filtr);
      return;
    }
    if (values.selectedCoin !== null && values.selectedCoin.trim() !== '') {
      filtr = { coin: values.selectedCoin.trim() };
    }
    if (values.selectedStrategy !== null && values.selectedStrategy.trim() !== '') {
      filtr = {
        ...filtr,
        strategyName: values.selectedStrategy,
      };
    }
    if (values.maxAmount > 0 && values.maxAmount < values.minAmount) {
      showError('Maximum amount cannot be small than minimum amount');
      return;
    }
    if (values.minAmount > 0) {
      if (values.maxAmount >= values.minAmount) {
        filtr = {
          ...filtr,
          totalBudget: {
            $gte: values.minAmount,
            $lte: values.maxAmount,
          },
        };
      } else if (values.maxAmount === undefined || values.maxAmount === 0) {
        filtr = {
          ...filtr,
          totalBudget: {
            $gte: values.minAmount,
          },
        };
      }
    } else if (values.maxAmount > 0) {
      filtr = {
        ...filtr,
        totalBudget: {
          $lte: values.maxAmount,
        },
      };
    }

    onFilterChange(filtr);
  };

  return (
    <div>
      <Formik
        initialValues={{
          selectedCoin: null,
          minAmount: 0,
          maxAmount: 0,
          selectedStrategy: null,
        }}
        enableReinitialize
        onSubmit={(values) => onFormSubmit(values)}
      >
        {({ values, handleChange, setFieldValue, handleReset }) => (
          <Form noValidate autoComplete="off">
            <div className="flex p-2 gap-2">
              <span className="p-3 text-theme-v2-black1">Search By</span>

              {location.pathname === `/admin/activecoin/${param.coinName}`
                ? ''
                : showCoinDropdown && (
                    <CustomDropdown
                      placeholder={values.selectedCoin || 'Select coin'}
                      preSelectedValue={values.selectedCoin || 'Select coin'}
                      // options={coinsList}
                      searchable="true"
                      useThemev2="true"
                      selectedValue={(e: any) => {
                        setFieldValue('selectedCoin', e.label);
                        onFormSubmit({ ...values, ...{ selectedCoin: e.label } });
                      }}
                      minWidth="200px"
                    />
                  )}
              {showMinAmount && (
                <input
                  type="number"
                  className="py-3 p-3 rounded-lg text-gray-700 bg-theme-v2-white2"
                  name="minAmount"
                  value={values.minAmount > 0 ? values.minAmount : ''}
                  placeholder="Minimum Budget"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              )}
              {showMaxAmount && (
                <input
                  type="number"
                  className="py-3 p-3 rounded-lg text-gray-700 bg-theme-v2-white2"
                  name="maxAmount"
                  value={values.maxAmount > 0 ? values.maxAmount : ''}
                  placeholder="Maximum Budget"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              )}
              {showStrategyDropdown && (
                <CustomDropdown
                  placeholder={values.selectedStrategy || 'Select strategy'}
                  preSelectedValue={values.selectedStrategy || 'Select strategy'}
                  options={strategies}
                  searchable="true"
                  useThemev2="true"
                  selectedValue={(e: any) => {
                    setFieldValue('selectedStrategy', e.label);
                    onFormSubmit({ ...values, ...{ selectedStrategy: e.label } });
                  }}
                  minWidth="200px"
                />
              )}
              {showResetButton && (
                <button
                  type="button"
                  className="mr-3 text-theme-v2-white1 bg-theme-v2-blue2 button btn rounded-lg px-5 py-2"
                  onClick={() => {
                    handleReset();
                    setFieldValue('selectedCoin', null);
                    onFilterChange({});
                  }}
                >
                  Reset
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default SearchBar;
