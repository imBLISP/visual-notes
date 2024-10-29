"use client"

import Link from "next/link";

import { Button } from "@repo/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui";
import { Icons } from "@/components/ui/icons"
import { Input } from "@repo/ui";
import { Label } from "@repo/ui";

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { signUp } from './actions';
import { debounce } from "lodash";

export default function SignUpForm() {
  const router = useRouter(); // Initialize the router
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try{
      const signUpData = {
        username: userName,
        email,
        password,
      };

      const result = await signUp(signUpData);
      
      if (result.error) {
        setError(result.error); // Set error if login failed
      } else {
        router.push('/login');
      }
    }catch(err){
      console.error('error', err);
    }finally{
      setIsLoading(false);
    }
  };

  const validatePassword = useCallback(
    debounce((e: React.FormEvent<HTMLInputElement>) => {
      const input = e.target as HTMLInputElement;
      if(input.value != password){
        setError('Passwords do not match');
      }else{
        setError('');
      }
    }, 500), [password]
  );

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">User Name</Label>
            <Input
              id="username"
              type="input"
              placeholder="John Doe"
              required
              onChange={(e) => setUsername(e.target.value)} // Update email state
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) => setEmail(e.target.value)} // Update email state
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              required 
              onChange={(e) => setPassword(e.target.value)} // Update password state
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm_password">Confirm Password</Label>
            <Input
              id="confirm_password"
              type="password"
              required
              onChange={(e) => validatePassword(e)}
            />
          </div>
          {/* Display error message if exists */}
          {error && <div className="text-red-500 text-sm">{error}</div>}

          <Button type="button" className="items-center justify-center w-full" onClick={handleSubmit}> {/* Changed to type="button" and added onClick */}
            Sign Up
          </Button>
          <Button className="items-center justify-center w-full" variant="outline" type="button" disabled={isLoading}>
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.gitHub className="mr-2 h-4 w-4" />
            )}{" "}
            GitHub
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}