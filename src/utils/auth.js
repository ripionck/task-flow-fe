// Function to check if user is authenticated
export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false;

  const token = localStorage.getItem('token');
  return !!token;
};

// Function to log in a user
export const login = async (email, password) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || 'Login failed');
    }

    // Store token and user in localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.data));

    return data;
  } catch (error) {
    throw new Error(error.message || 'Login failed');
  }
};

// Function to register a new user
export const register = async (userData) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || 'Registration failed');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Registration failed');
  }
};

// Function to log out a user
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  // You might want to add a call to a backend logout endpoint if needed
  // For example, to invalidate the token on the server side
};

// Function to get the current user from API
export const fetchCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const response = await fetch('http://localhost:5000/api/auth/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      // If unauthorized, clear stored data
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
      throw new Error(data.error || data.message || 'Failed to fetch user');
    }

    // Update stored user data
    localStorage.setItem('user', JSON.stringify(data.data));

    return data.data;
  } catch (error) {
    console.error('Error fetching current user:', error.message);
    return null;
  }
};

// Function to get the current user from localStorage
export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;

  const userString = localStorage.getItem('user');
  if (!userString) return null;

  try {
    return JSON.parse(userString);
  } catch (error) {
    console.error('Error parsing user data:', error);
    localStorage.removeItem('user'); // Clean up invalid data
    return null;
  }
};

// Helper to get auth headers for API calls
export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};
