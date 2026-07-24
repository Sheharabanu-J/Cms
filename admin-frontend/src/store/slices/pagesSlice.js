import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Setup axios instance with credentials (cookies)
const apiClient = axios.create({
  baseURL: `${API_URL}/api/v1/pages`,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchPages = createAsyncThunk('pages/fetchPages', async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get('/');
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || error.response?.data?.message || 'Failed to fetch pages');
  }
});

export const fetchPageById = createAsyncThunk('pages/fetchPageById', async (id, { rejectWithValue }) => {
  try {
    const response = await apiClient.get(`/${id}`);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || error.response?.data?.message || 'Failed to fetch page');
  }
});

export const createPage = createAsyncThunk('pages/createPage', async (pageData, { rejectWithValue }) => {
  try {
    const response = await apiClient.post('/', pageData);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || error.response?.data?.message || 'Failed to create page');
  }
});

export const updatePage = createAsyncThunk('pages/updatePage', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await apiClient.put(`/${id}`, data);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || error.response?.data?.message || 'Failed to update page');
  }
});

export const deletePage = createAsyncThunk('pages/deletePage', async (id, { rejectWithValue }) => {
  try {
    await apiClient.delete(`/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || error.response?.data?.message || 'Failed to delete page');
  }
});

const initialState = {
  pages: [],
  currentPage: null,
  loading: false,
  error: null,
};

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Pages
      .addCase(fetchPages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPages.fulfilled, (state, action) => {
        state.loading = false;
        state.pages = action.payload;
      })
      .addCase(fetchPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Single Page
      .addCase(fetchPageById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPageById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPage = action.payload;
      })
      .addCase(fetchPageById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Page
      .addCase(createPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPage.fulfilled, (state, action) => {
        state.loading = false;
        state.pages.unshift(action.payload);
      })
      .addCase(createPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Page
      .addCase(updatePage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePage.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.pages.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.pages[index] = action.payload;
        }
        if (state.currentPage && state.currentPage._id === action.payload._id) {
          state.currentPage = action.payload;
        }
      })
      .addCase(updatePage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Page
      .addCase(deletePage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePage.fulfilled, (state, action) => {
        state.loading = false;
        state.pages = state.pages.filter(p => p._id !== action.payload);
      })
      .addCase(deletePage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setCurrentPage, clearError } = pagesSlice.actions;
export default pagesSlice.reducer;
