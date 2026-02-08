<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\WalkController;
use App\Http\Controllers\ProfileViewController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/walks', [WalkController::class, 'index'])->name('walks.index');

    Route::get('/walks/create', [WalkController::class, 'create'])->name('walks.create');
    Route::post('/walks', [WalkController::class, 'add'])->name('walks.add');

    Route::get('/profile', [ProfileViewController::class, 'index'])->name('profile.index');

});

require __DIR__.'/settings.php';
