"use client"
import React, { useState } from 'react';
import { Input, Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect on successful login
        router.push('/');
      } else {
        // Display error message
        setError(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An unexpected error occurred');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-1">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>
        <div className="flex flex-col gap-4">
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            labelPlacement="outside"
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            labelPlacement="outside"
            className="w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-center">{error}</p>}
          <Button 
            className="bg-blue-700 text-white hover:bg-blue-800 mt-4"
            onClick={handleLogin}
          >
            Login
          </Button>
          <div>
        <p>Email- admin</p>
        <p>Password- password</p>
      </div>
        </div>
      </div>
      
    </div>
  );
};

export default LoginPage;
