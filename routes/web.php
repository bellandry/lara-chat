<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [HomeController::class, 'home'])->name('dashboard');
    Route::get('/test', [HomeController::class, 'home'])->name('dash');


    Route::get('/user/{user}', function () {
    })->name('chat.user');
    Route::post('/user/{user}', function () {
    })->name('chat.group');

    Route::post('/message', [MessageController::class, 'store'])->name('message.store');
    Route::get('/message/older/{message}', [MessageController::class, 'loadOlderMessages'])->name('message.loadOlder');
    Route::delete('/message/{message}', [MessageController::class, 'destroy'])->name('message.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
