"use client"

import * as React from "react"

import { cn } from "@repo/utils"
import { Icons } from "@/components/ui/icons"
import { Button } from "@repo/ui/"
import { Input } from "@repo/ui"
import { Label } from "@repo/ui"
import { checkAccountExist, login, authSignIn }  from "./actions";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loginForm, showLoginForm] = useState(false);
  const [accountExist, setAccountExist] = useState(false);
  const [userName, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [password, setPassword] = useState('');
  
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setError('');
    setIsLoading(true)
    try {
      const response: {
        success: boolean, 
        message: string,
        data: {email: string, avatar: string}
      } = await checkAccountExist(email);
      console.log('response of account exist', response);
      setAccountExist(response.success);
      const message = response.message;

      // Set error messages based on account existence and login state
      if (response.success) {
        showLoginForm(true)
        const data = response?.data;
        setUsername(data?.email);
        // Extract initials from username (assuming email format)
        const getInitials = (email : string) => {
          if (!email) return 'default';
          const nameParts = email.split('@')[0]?.split('.') ?? [];
          const initials = nameParts.map(part => part[0]?.toUpperCase()).join('');
          return initials || 'default';
        };

        const initials = getInitials(data?.email);
        
        // Use initials in the avatar URL
        const avatar = data?.avatar 
          ? data?.avatar 
          : `https://api.dicebear.com/7.x/initials/svg?backgroundType=gradientLinear&fontFamily=Helvetica&fontSize=40&seed=${initials}`;

        setAvatar(avatar);
      } else {
        setError(message);
        
        console.log('error message',error);
      }} catch (error) {
        console.error('Error checking account existence:', error);
        setError('An error occurred while checking account existence.');
      } finally {
        setIsLoading(false);
      }
    }

  async function handleLogin(event: React.SyntheticEvent){
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try{
      const loginData = {
        email: email,
        password: password
      }
      const result = await login(loginData);
      
      if (result.error) {
        setError(result.error); // Set error if login failed
      } else {
        router.push('/dashboard');
      }
    }catch(error){
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  };

  async function signInWithGithub(){
    setIsLoading(true);
    try{
      const params = { provider: 'github'}
      console.log('params', params);
      const response = await authSignIn(params);
      if(response.redirectUrl){
        router.push(response.redirectUrl);
      }else{
        console.log('Error while authorizing the redirectUrl');
      }
    }catch(err: any){
      console.log(err);
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("grid gap-6 p-4 md:p-6 lg:p-8", className)} {...props}>
      { !accountExist && 
      <form onSubmit={onSubmit} className="w-full max-w-sm mx-auto">
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>
       
          <Button className="items-center justify-center w-full" 
          disabled={isLoading}
          aria-busy={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Continue with Email
          </Button>
          {/* Display error message if exists */}
          {error && <div className="text-center text-red-500 text-sm">{error}</div>}
          {(!accountExist && error) ? (
            <p className="text-center text-sm text-red-500">
              No such account.{" "}
              <Link href="/register" className="font-semibold text-red-600">
                Sign up
              </Link>{" "}
              instead?
            </p>
          ) : (
            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-gray-500 transition-colors hover:text-black"
              >
                Sign up
              </Link>
            </p>
          )}
        </div>
      </form>}
      {/* show user_avatar, email, password input if accountExist
          also handles login submit. */}
      {loginForm && 
      <form onSubmit={handleLogin} className="w-full max-w-sm mx-auto">
        <div className="grid gap-2">
          <div className="grid gap-1">
            <div className="flex justify-center mb-4">
              <img 
                src={avatar} 
                alt="User Avatar" 
                className="circle-avatar w-12 h-12 rounded-full" 
              />
            </div>
            <div className="text-center justify-center mb-4">
              <p className="text-lg font-semibold">{userName}</p>
            </div>
            <Input 
            id="password"
            placeholder="Password"
            type="password"
            disabled={isLoading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
            />
          </div>
          <Button className="items-center justify-center w-full" 
          disabled={isLoading}
          aria-busy={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
          {error && <div className="text-center text-red-500 text-sm">{error}</div>}
          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-gray-500 transition-colors hover:text-black"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
      }
      {/* sso login will all be here */}
     <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button className="items-center justify-center w-full" variant="outline" type="button" disabled={isLoading} onClick={() => signInWithGithub()}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
    </div>
  )
}
