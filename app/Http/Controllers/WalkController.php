<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Walk;
use Illuminate\Http\Request;
use Carbon\Carbon;

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
        $validated['distance'] = round($this->calculateDistance($validated['route']), 2);
        $validated['average_speed'] = $validated['average_speed'] ?? 0;
        $validated['duration'] = $this->calculateDuration($validated['end_time'], $validated['start_time']);

        auth()->user()->walks()->create($validated);

        return redirect()->route('walks.index');
    }

    private function calculateDistance(array $route)
    {
        $distance = 0;

        for ( $index = 0; $index < count($route) - 1; $index++ ) {
            if ( isset($route[$index]['lat']) && isset($route[$index]['lng']) && isset($route[$index+1]['lat']) && isset($route[$index+1]['lng']) ) {
                $distance += $this->calculateHaversineDistance( $route[$index], $route[$index+1] );
            }
        }

        return $distance;
    }

    private function calculateHaversineDistance( array $first_pair, array $second_pair, $unit = 'km' ) {

        $radius = ( $unit === 'mi' ) ? 3958.8 : 6371.0;

        $lat1 = deg2rad( $first_pair['lat'] );
        $lon1 = deg2rad( $first_pair['lng'] );
        $lat2 = deg2rad( $second_pair['lat'] );
        $lon2 = deg2rad( $second_pair['lng'] );

        $dLat = $lat2 - $lat1;
        $dLon = $lon2 - $lon1;

        $a = sin( $dLat / 2 ) ** 2 +
             cos( $lat1 ) * cos( $lat2 ) *
             sin( $dLon / 2 ) ** 2;

        $c = 2 * atan2( sqrt( $a ), sqrt( 1 - $a ) );

        return $radius * $c;
    }

    private function calculateDuration( string $start_time, string $end_time ) {
        return Carbon::parse($end_time)->diffInMinutes(Carbon::parse($start_time));
    }

}
