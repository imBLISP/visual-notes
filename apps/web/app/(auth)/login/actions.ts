'use client'

export async function login(data: Object) {
  try {
    // Call the login API endpoint
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Handle the response
    if (!response.ok) {
      console.log('login failed');
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const result = response.json();
    return result;

  } catch (error: any) {
    console.error('Error logging in:', error.message);
    return { error: error.message };
  }
}
