import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userDetails: undefined,
  data: 0,
  strategy: {},
  functionsData: [[]],
  rulesData: [[]],
  percentageData: {
    Buy: [
      {
        parameter1: { label: '', value: '' },
        operator2: { label: '', value: '' },
        parameter3: { label: '', value: '' },
      },
    ],
    Sell: [
      {
        parameter1: { label: '', value: '' },
        operator2: { label: '', value: '' },
        parameter3: { label: '', value: '' },
      },
    ],
    stoploss: '',
  },
  selectedFuncComp: -1,
  selectedRuleComp: -1,
  stepsWizardPage: 1,
  olhcvData: [{}],
  coinsList: [],
  showModalFor: {
    label: '',
    componentIndex: -1,
    functionIndex: -1,
  },
  loader: false,
};

const userReducer = createSlice({
  name: 'lexer',
  initialState,
  reducers: {
    updateUserDetails: (state, action) => {
      const tempState = state;
      tempState.userDetails = action.payload;
      return tempState;
    },
    updatedata: (state, action) => {
      const tempState = state;
      tempState.data = action.payload;
      return tempState;
    },
    updateStrategy: (state, action) => {
      const tempState = state;
      tempState.strategy = action.payload;
      return tempState;
    },
    updateFunctionsData: (state, action) => {
      const tempState = state;
      tempState.functionsData = action.payload;
      return tempState;
    },
    updateRulesData: (state, action) => {
      const tempState = state;
      tempState.rulesData = action.payload;
      return tempState;
    },
    updatePercentageData: (state, action) => {
      const tempState = state;
      tempState.percentageData = action.payload;
      return tempState;
    },
    updateSelectedFuncComp: (state, action) => {
      const tempState = state;
      tempState.selectedFuncComp = action.payload;
      return tempState;
    },
    updateSelectedRuleComp: (state, action) => {
      const tempState = state;
      tempState.selectedRuleComp = action.payload;
      return tempState;
    },
    updateStepsWizardPage: (state, action) => {
      const tempState = state;
      tempState.stepsWizardPage = action.payload;
      return tempState;
    },
    updateolhcvData: (state, action) => {
      const tempState = state;
      tempState.olhcvData = action.payload;
      return tempState;
    },
    updateCoinsList: (state, action) => {
      const tempState = state;
      tempState.coinsList = action.payload;
      return tempState;
    },
    updateShowModalFor: (state, action) => {
      const tempState = state;
      tempState.showModalFor = action.payload;
      return tempState;
    },
    updateLoader: (state, action) => {
      const tempState = state;
      tempState.loader = action.payload;
      return tempState;
    },
  },
});

export const {
  updateUserDetails,
  updatedata,
  updateStrategy,
  updateFunctionsData,
  updatePercentageData,
  updateSelectedFuncComp,
  updateSelectedRuleComp,
  updateStepsWizardPage,
  updateRulesData,
  updateolhcvData,
  updateCoinsList,
  updateShowModalFor,
  updateLoader,
} = userReducer.actions;
export default userReducer.reducer;
