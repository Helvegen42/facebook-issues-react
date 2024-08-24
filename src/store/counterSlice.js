import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchIssues = createAsyncThunk("issues/fetchIssues", async () => {
  const response = await fetch(
    "https://api.github.com/repos/facebook/react/issues"
  );
  const data = await response.json();
  return data;
});
export const fetchIssue = createAsyncThunk(
  "issues/fetchIssue",
  async ({ number }) => {
    const response = await fetch(
      `https://api.github.com/repos/facebook/react/issues/${number}`
    );
    const data = await response.json();
    return data;
  }
);
export const fetchTimeline = createAsyncThunk(
  "issues/fetchTimeline",
  async ({ number }) => {
    const response = await fetch(
      `https://api.github.com/repos/facebook/react/issues/${number}/timeline`
    );
    const data = await response.json();
    return data;
  }
);

const initialState = {
  issues: [],
  issue: {},
  timeline: [],
  status: "idle",
};

export const counterSlice = createSlice({
  name: "fetch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.issues = action.payload;
      })
      .addCase(fetchIssue.fulfilled, (state, action) => {
        state.issue = action.payload;
      })
      .addCase(fetchTimeline.fulfilled, (state, action) => {
        state.timeline = action.payload;
      });
  },
});

export default counterSlice.reducer;
