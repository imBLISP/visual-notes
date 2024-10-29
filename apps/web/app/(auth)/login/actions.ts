"use client"

interface result {
  success: boolean,
  message: string,
  data: {email: string, avatar: string}
}

export const checkAccountExist = async ( email: string ): Promise<result> => {
  let result: result = { success: false, message: '', data: {email: '', avatar: ''} };
  try {
    // Call the login API endpoint
    const data = { email: email}
    const response = await fetch('/api/auth/check-account-exist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Handle the response
    if (!response.ok) {
      console.log('Error while checking account existence');
      result = await response.json();
      throw new Error(result.message || 'Failed to check account existence');
    }

    result = await response.json(); // Fixed missing await
  } catch (error: any) {
    console.error('Error in checkAccountExist function:', error.message || 'An unknown error occurred');
  }finally{
    return result;
  }
};

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

export async function authSignIn(params: Object){
  try {
    // Call the login API endpoint
    const response = await fetch('/api/oauth/authorize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
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
    console.error('Error in auth login:', error.message);
    return { error: error.message };
  }   
}
