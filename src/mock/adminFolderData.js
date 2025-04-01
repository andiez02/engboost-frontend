// Mock data for admin folders
export const mockAdminFolders = [
  {
    _id: '1',
    title: 'Từ vựng cơ bản',
    flashcard_count: 4,
    isPublic: true,
    createdAt: '2024-03-20T10:00:00Z',
    updatedAt: '2024-03-20T10:00:00Z',
  },
  {
    _id: '2',
    title: 'Từ vựng TOEIC',
    flashcard_count: 3,
    isPublic: true,
    createdAt: '2024-03-20T11:00:00Z',
    updatedAt: '2024-03-20T11:00:00Z',
  },
  {
    _id: '3',
    title: 'Từ vựng IELTS',
    flashcard_count: 2,
    isPublic: true,
    createdAt: '2024-03-20T12:00:00Z',
    updatedAt: '2024-03-20T12:00:00Z',
  },
  {
    _id: '4',
    title: 'Từ vựng TOEFL',
    flashcard_count: 2,
    isPublic: true,
    createdAt: '2024-03-20T13:00:00Z',
    updatedAt: '2024-03-20T13:00:00Z',
  },
];

// Mock data for flashcards
export const mockAdminFlashcards = {
  1: [
    {
      _id: '1-1',
      front: 'Apple',
      back: 'Quả táo',
      image_url:
        'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=600&auto=format&fit=crop&q=60',
      folder_id: '1',
      isPublic: true,
      createdAt: '2024-03-20T10:00:00Z',
      updatedAt: '2024-03-20T10:00:00Z',
    },
    {
      _id: '1-2',
      front: 'Book',
      back: 'Sách',
      image_url:
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&auto=format&fit=crop&q=60',
      folder_id: '1',
      isPublic: true,
      createdAt: '2024-03-20T10:01:00Z',
      updatedAt: '2024-03-20T10:01:00Z',
    },
    {
      _id: '1-3',
      front: 'Cat',
      back: 'Con mèo',
      image_url:
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=60',
      folder_id: '1',
      isPublic: true,
      createdAt: '2024-03-20T10:02:00Z',
      updatedAt: '2024-03-20T10:02:00Z',
    },
    {
      _id: '1-4',
      front: 'Dog',
      back: 'Con chó',
      image_url:
        'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=60',
      folder_id: '1',
      isPublic: true,
      createdAt: '2024-03-20T10:03:00Z',
      updatedAt: '2024-03-20T10:03:00Z',
    },
  ],
  2: [
    {
      _id: '2-1',
      front: 'Achieve',
      back: 'Đạt được',
      image_url:
        'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=600&auto=format&fit=crop&q=60',
      folder_id: '2',
      isPublic: true,
      createdAt: '2024-03-20T11:00:00Z',
      updatedAt: '2024-03-20T11:00:00Z',
    },
    {
      _id: '2-2',
      front: 'Benefit',
      back: 'Lợi ích',
      image_url: '',
      folder_id: '2',
      isPublic: true,
      createdAt: '2024-03-20T11:01:00Z',
      updatedAt: '2024-03-20T11:01:00Z',
    },
    {
      _id: '2-3',
      front: 'Consider',
      back: 'Xem xét',
      image_url: '',
      folder_id: '2',
      isPublic: true,
      createdAt: '2024-03-20T11:02:00Z',
      updatedAt: '2024-03-20T11:02:00Z',
    },
  ],
  3: [
    {
      _id: '3-1',
      front: 'Academic',
      back: 'Học thuật',
      image_url:
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=60',
      folder_id: '3',
      isPublic: true,
      createdAt: '2024-03-20T12:00:00Z',
      updatedAt: '2024-03-20T12:00:00Z',
    },
    {
      _id: '3-2',
      front: 'Research',
      back: 'Nghiên cứu',
      image_url: '',
      folder_id: '3',
      isPublic: true,
      createdAt: '2024-03-20T12:01:00Z',
      updatedAt: '2024-03-20T12:01:00Z',
    },
  ],
  4: [
    {
      _id: '4-1',
      front: 'Analyze',
      back: 'Phân tích',
      image_url:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60',
      folder_id: '4',
      isPublic: true,
      createdAt: '2024-03-20T13:00:00Z',
      updatedAt: '2024-03-20T13:00:00Z',
    },
    {
      _id: '4-2',
      front: 'Evaluate',
      back: 'Đánh giá',
      image_url: '',
      folder_id: '4',
      isPublic: true,
      createdAt: '2024-03-20T13:01:00Z',
      updatedAt: '2024-03-20T13:01:00Z',
    },
  ],
};

// Mock API functions
export const mockAdminFolderAPI = {
  getPublicFolders: async () => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockAdminFolders;
  },

  getFlashcardsByFolder: async (folderId) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockAdminFlashcards[folderId] || [];
  },

  createPublicFolder: async (data) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newFolder = {
      _id: String(mockAdminFolders.length + 1),
      title: data.title,
      flashcard_count: 0,
      isPublic: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockAdminFolders.push(newFolder);
    return newFolder;
  },

  updateFolder: async (folderId, data) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    const folderIndex = mockAdminFolders.findIndex((f) => f._id === folderId);
    if (folderIndex !== -1) {
      mockAdminFolders[folderIndex] = {
        ...mockAdminFolders[folderIndex],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      return mockAdminFolders[folderIndex];
    }
    throw new Error('Folder not found');
  },

  deleteFolder: async (folderId) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    const folderIndex = mockAdminFolders.findIndex((f) => f._id === folderId);
    if (folderIndex !== -1) {
      mockAdminFolders.splice(folderIndex, 1);
      delete mockAdminFlashcards[folderId];
      return true;
    }
    throw new Error('Folder not found');
  },

  deleteFlashcard: async (cardId) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    for (const folderId in mockAdminFlashcards) {
      const cardIndex = mockAdminFlashcards[folderId].findIndex(
        (c) => c._id === cardId
      );
      if (cardIndex !== -1) {
        mockAdminFlashcards[folderId].splice(cardIndex, 1);
        // Update folder count
        const folderIndex = mockAdminFolders.findIndex(
          (f) => f._id === folderId
        );
        if (folderIndex !== -1) {
          mockAdminFolders[folderIndex].flashcard_count--;
        }
        return true;
      }
    }
    throw new Error('Flashcard not found');
  },

  createFlashcard: async (folderId, flashcardData) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!mockAdminFlashcards[folderId]) {
      mockAdminFlashcards[folderId] = [];
    }

    const newFlashcard = {
      _id: `${folderId}-${Date.now()}`,
      ...flashcardData,
      folder_id: folderId,
      isPublic: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockAdminFlashcards[folderId].push(newFlashcard);

    // Update folder count
    const folderIndex = mockAdminFolders.findIndex((f) => f._id === folderId);
    if (folderIndex !== -1) {
      mockAdminFolders[folderIndex].flashcard_count++;
    }

    return newFlashcard;
  },
};
