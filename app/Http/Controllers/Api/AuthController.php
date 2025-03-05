<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignUpRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function signup(SignUpRequest $request)
    {
        $data = $request->validated();
        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function login(LoginRequest $request)
    {
        Log::info('Login request received', ['request' => $request->all()]);

        $credentials = $request->validated();
        Log::info('Login request validated', ['credentials' => $credentials]);

        if (!Auth::attempt($credentials)) {
            Log::warning('Login attempt failed', ['credentials' => $credentials]);
            return response([
                'message' => 'Provided email or password is incorrect'
            ], 422);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();
        Log::info('User authenticated', ['user' => $user]);

        $token = $user->createToken('main')->plainTextToken;
        Log::info('Token created', ['token' => $token]);

        return response(compact('user', 'token'));
    }

    public function logout(Request $request)
    {
        Log::info('Logout request received', ['user' => $request->user()]);

        /** @var \App\Models\User $user */
        $user = $request->user();
        if ($user) {
            $user->currentAccessToken()->delete();
            Log::info('User logged out', ['user' => $user]);
        } else {
            Log::warning('No authenticated user found for logout');
        }

        return response('', 204);
    }
}