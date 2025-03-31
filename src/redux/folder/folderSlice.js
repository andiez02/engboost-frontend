import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFoldersAPI, createFolderAPI, deleteFolderAPI } from "../../apis";

// Async thunks
export const fetchFolders = createAsyncThunk(
  "folders/fetchFolders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFoldersAPI();
      return response.folders;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch folders");
    }
  }
);

export const createFolder = createAsyncThunk(
  "folders/createFolder",
  async (folderData, { rejectWithValue }) => {
    try {
      const response = await createFolderAPI(folderData);
      return response.folder;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create folder");
    }
  }
);

export const deleteFolder = createAsyncThunk(
  "folders/deleteFolder",
  async (folderId, { rejectWithValue }) => {
    try {
      await deleteFolderAPI(folderId);
      return folderId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete folder");
    }
  }
);

const initialState = {
  folders: [],
  isLoading: false,
  error: null,
  selectedFolder: null,
};

const folderSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    clearFolders: (state) => {
      state.folders = [];
      state.error = null;
      state.selectedFolder = null;
    },
    setSelectedFolder: (state, action) => {
      state.selectedFolder = action.payload;
    },
    updateFolder: (state, action) => {
      const index = state.folders.findIndex(
        (f) => f._id === action.payload._id
      );
      if (index !== -1) {
        state.folders[index] = action.payload;
      }
    },
    addFolder: (state, action) => {
      state.folders.push(action.payload);
    },
    removeFolder: (state, action) => {
      state.folders = state.folders.filter((f) => f._id !== action.payload);
    },
    updateFlashcardCount: (state, action) => {
      const { folderId, count } = action.payload;
      const folder = state.folders.find((f) => f._id === folderId);
      if (folder) {
        folder.flashcard_count = count;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Folders
      .addCase(fetchFolders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFolders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.folders = action.payload;
      })
      .addCase(fetchFolders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create Folder
      .addCase(createFolder.pending, (state) => {
        state.error = null;
      })
      .addCase(createFolder.fulfilled, (state, action) => {
        state.folders.unshift(action.payload);
      })
      .addCase(createFolder.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Delete Folder
      .addCase(deleteFolder.pending, (state) => {
        // state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteFolder.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.folders = state.folders.filter((f) => f._id !== action.payload);
        if (state.selectedFolder === action.payload) {
          state.selectedFolder = null;
        }
      })
      .addCase(deleteFolder.rejected, (state, action) => {
        // state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearFolders,
  setSelectedFolder,
  updateFolder,
  addFolder,
  removeFolder,
  updateFlashcardCount,
} = folderSlice.actions;

export default folderSlice.reducer;
