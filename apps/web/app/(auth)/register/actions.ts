'use client'

export async function signUp(data: Object) {
  try {
    // Call the login API endpoint
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Handle the response
    if (!response.ok) {
      console.log('signUp failed');
      const error = await response.json();
      throw new Error(error.message || 'signUp failed');
    }

    const result = response.json();
    return result;

  } catch (error: any) {
    console.error('Error Signing Up:', error.message);
    return { error: error.message };
  }
}
