import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INVESTMENT_STATUS, InvestmentCard } from "./constants";

const initialState: InvestmentCard[] = [
  {
    name: "CARD1",
    date: "a",
    status: INVESTMENT_STATUS.ACTIVE,
    type: "gold",
    value: "124",
    id: "a6sd",
  },
  {
    name: "CARD2",
    date: "a",
    status: INVESTMENT_STATUS.ACTIVE,
    type: "gold",
    value: "166",
    id: "5asd",
  },
  {
    name: "CARD3",
    date: "a",
    status: INVESTMENT_STATUS.CLOSED,
    type: "gold",
    value: "178",
    id: "as4d",
  },
  {
    name: "CARD4",
    date: "a",
    status: INVESTMENT_STATUS.ACTIVE,
    type: "gold",
    value: "22",
    id: "asd2",
  },
  {
    name: "CARD5",
    date: "a",
    status: INVESTMENT_STATUS.ACTIVE,
    type: "gold",
    value: "444",
    id: "asd",
  },
  {
    name: "CARD6",
    date: "a",
    status: INVESTMENT_STATUS.ACTIVE,
    type: "gold",
    value: "666",
    id: "asd1",
  },
];

export const addInvestmentAsync = createAsyncThunk(
  "investmentCards/addInvestment",
  async (investmentData: InvestmentCard, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/investments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(investmentData),
      });
      if (!response.ok) {
        throw new Error("Failed to add investment");
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeInvestmentAsync = createAsyncThunk(
  "investmentCards/removeInvestment",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/investments/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to remove investment");
      }
      const data = await response.json();
      return data.id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const investmentCardsSlice = createSlice({
  name: "investmentCards",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(
      addInvestmentAsync.fulfilled,
      (state, action: PayloadAction<InvestmentCard>) => {
        state.push(action.payload);
      }
    );

    builder.addCase(
      removeInvestmentAsync.fulfilled,
      (state, action: PayloadAction<string>) => {
        return state.filter((card) => card.id !== action.payload);
      }
    );
  },
  reducers: {},
});

export default investmentCardsSlice.reducer;
