<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Walk;

class WalkController extends Controller
{
    public function index()
    {
        $walks = auth()->user()->walks()->latest()->get();
        return Inertia::render('walks/index', compact('walks'));
    }

    public function create()
    {
        return Inertia::render('walks/create');
    }
}
