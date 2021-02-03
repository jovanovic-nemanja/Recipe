<?php

namespace App\Http\Controllers;

use App\Models\User;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\Client as OClient; 

class UserController extends Controller
{
    public $successStatus = 200;

    public function login() { 
        if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
            return $this->getTokenAndRefreshToken(request('email'), request('password'));
        } 
        else { 
            return response()->json(['error'=>'Unauthorised'], 401); 
        } 
    }

    public function refreshToken(Request $request) {
        $input = $request->validate([
            'refreshToken' => 'required'
        ]);
        $oClient = OClient::where('password_client', 1)->first();
        return $this->getTokenFromRefreshToken($input['refreshToken']);
    }

    public function register(Request $request) { 
        $input = $request->validate([ 
            'name' => 'required', 
            'email' => 'required|email|unique:users', 
            'password' => 'required'
        ]);

        $password = $request->password;
        $input['password'] = bcrypt($input['password']); 
        $user = User::create($input); 
        return $this->getTokenAndRefreshToken($user->email, $password);
    }

    public function getTokenAndRefreshToken($email, $password) { 
        $oClient = OClient::where('password_client', 1)->first();
        $http = new Client;
        $response = $http->request('POST', 'http://localhost/recipelyBackend/public/oauth/token', [
            'form_params' => [
                'grant_type' => 'password',
                'client_id' => $oClient->id,
                'client_secret' => $oClient->secret,
                'username' => $email,
                'password' => $password,
                'scope' => '*',
            ],
        ]);

        $result = json_decode((string) $response->getBody(), true);
        return response()->json($result, $this->successStatus);
    }

    public function getTokenFromRefreshToken($refreshToken) { 
        $oClient = OClient::where('password_client', 1)->first();
        $http = new Client;
        $response = $http->request('POST', 'http://localhost/recipelyBackend/public/oauth/token', [
            'form_params' => [
                'grant_type' => 'refresh_token',
                'client_id' => $oClient->id,
                'client_secret' => $oClient->secret,
                'refresh_token' => $refreshToken,
                'scope' => '*',
            ],
        ]);

        $result = json_decode((string) $response->getBody(), true);
        return response()->json($result, $this->successStatus);
    }
}
