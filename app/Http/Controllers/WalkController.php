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

    public function add(Request $request)
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'distance' => 'nullable|numeric',
            'average_speed' => 'nullable|numeric',
            'route' => 'required|array',
            'start_time' => 'required|date',
            'end_time' => 'required|date',
        ]);
        $validated['distance'] = $validated['distance'] ?? 0;
        $validated['average_speed'] = $validated['average_speed'] ?? 0;

        auth()->user()->walks()->create($validated);

        return redirect()->route('walks.index');
    }
}
